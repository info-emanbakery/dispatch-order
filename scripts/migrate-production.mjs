/**
 * Production data migration:
 * 1. Add `code` column to products, iqama_number+vehicle_number to salesmen (if not exists), category to products
 * 2. Upsert 85 salesmen from distributors CSV
 * 3. Upsert 69 products with categories + PRD codes stored as sku
 * 4. Import active price records into salesman_prices
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;
const projectId = "ptenytzvmrwaagztbkyr";

if (!url || !key) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function runSql(query) {
  const resp = await fetch(
    `https://api.supabase.com/v1/projects/${projectId}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );
  const data = await resp.json();
  if (!resp.ok) throw new Error(JSON.stringify(data));
  return data;
}

function parseCsv(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const vals = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] ?? ""; });
    return obj;
  });
}

function getCategory(name) {
  const n = name.toUpperCase();
  if (n.includes("CHAPATHI")) return "Chapathi";
  if (n.includes("SHAMI")) return "Shami";
  if (n.includes("LABANANI")) return "Labanani";
  if (n.includes("SAMOOLI")) return "Samooli";
  if (n.includes("FELAFIL")) return "Felafil";
  if (n.includes("ABU NAVAS")) return "Abu Navas";
  if (n.includes("BURGER")) return "Burger";
  if (n.includes("HUB")) return "Hub";
  return "Other";
}

async function step(label, fn) {
  process.stdout.write(`\n▶ ${label}... `);
  try {
    const result = await fn();
    console.log("✓", result);
    return result;
  } catch (e) {
    console.error("✗", e.message ?? e);
    process.exit(1);
  }
}

async function main() {
  console.log("=== Production Migration ===");

  // ── Step 1: Add code column to products (sku already exists, we add code for PRD-XXX) ──
  await step("Add code column to products table", () =>
    runSql(`ALTER TABLE products ADD COLUMN IF NOT EXISTS code TEXT UNIQUE;`)
  );

  // ── Step 2: Load CSV files ─────────────────────────────────────────────────
  const salesmenRows = parseCsv(
    readFileSync(join(ROOT, "attached_assets/distributors_rows_1783953769928.csv"), "utf8")
  );
  const productRows = parseCsv(
    readFileSync(join(ROOT, "attached_assets/products_rows_1783953769929.csv"), "utf8")
  );
  const priceRows = parseCsv(
    readFileSync(join(ROOT, "attached_assets/custom_prices_rows_1783953769929.csv"), "utf8")
  );

  console.log(`\nLoaded: ${salesmenRows.length} salesmen, ${productRows.length} products, ${priceRows.length} price rows`);

  // ── Step 3: Upsert salesmen ────────────────────────────────────────────────
  const salesmenInsert = salesmenRows.map((s) => ({
    id: s.id,
    code: s.code,           // SLM-080 etc
    name: s.name,
    phone: s.phone || null,
    iqama_number: s.iqama_number || null,
    vehicle_number: s.vehicle_id || null,
    area: null,
    active: s.status === "active",
  }));

  await step(`Upsert ${salesmenInsert.length} salesmen`, async () => {
    const { error } = await supabase
      .from("salesmen")
      .upsert(salesmenInsert, { onConflict: "id" });
    if (error) throw error;
    return `${salesmenInsert.length} rows`;
  });

  // ── Step 4: Upsert products ────────────────────────────────────────────────
  // Map: code → PRD-XXX (stored in code column), sku is left null (old system had no sku)
  const productsInsert = productRows.map((p) => ({
    id: p.id,
    code: p.code,           // PRD-039 etc
    sku: p.code,            // also set sku = code for backwards compatibility
    name: p.name,
    unit: "pcs",
    active: p.is_active === "true",
    category: getCategory(p.name),
  }));

  await step(`Upsert ${productsInsert.length} products`, async () => {
    const { error } = await supabase
      .from("products")
      .upsert(productsInsert, { onConflict: "id" });
    if (error) throw error;
    return `${productsInsert.length} rows`;
  });

  // ── Step 5: Import active prices ───────────────────────────────────────────
  // Active = end_date is empty in old system
  const activePrices = priceRows.filter((p) => !p.end_date || p.end_date === "");
  console.log(`\n  Active prices to import: ${activePrices.length}`);

  const today = new Date().toISOString().slice(0, 10);
  const priceInsert = activePrices.map((p) => ({
    salesman_id: p.distributor_id,
    product_id: p.product_id,
    price: parseFloat(p.price),
    valid_from: p.effective_date || today,
    valid_to: null,
    created_by: null,
  }));

  // Batch in chunks of 500
  let created = 0;
  let errCount = 0;
  const CHUNK = 500;
  process.stdout.write("\n▶ Importing prices");
  for (let i = 0; i < priceInsert.length; i += CHUNK) {
    const chunk = priceInsert.slice(i, i + CHUNK);
    const { error } = await supabase.from("salesman_prices").insert(chunk);
    if (error) {
      console.error(`\n  Chunk ${Math.floor(i / CHUNK) + 1} error: ${error.message}`);
      errCount++;
    } else {
      created += chunk.length;
      process.stdout.write(".");
    }
  }
  console.log(`\n  → ${created} prices imported, ${errCount} chunk errors`);

  // ── Step 6: Set category on any existing products that have no category ─────
  await step("Back-fill categories on existing products", async () => {
    const { data: existing } = await supabase
      .from("products")
      .select("id, name")
      .is("category", null);
    if (!existing || existing.length === 0) return "nothing to update";
    const updates = existing.map((p) => ({ id: p.id, category: getCategory(p.name) }));
    const { error } = await supabase.from("products").upsert(updates, { onConflict: "id" });
    if (error) throw error;
    return `${updates.length} products`;
  });

  // ── Verify ─────────────────────────────────────────────────────────────────
  const { count: smCount } = await supabase.from("salesmen").select("*", { count: "exact", head: true });
  const { count: prCount } = await supabase.from("products").select("*", { count: "exact", head: true });
  const { count: spCount } = await supabase.from("salesman_prices").select("*", { count: "exact", head: true });

  console.log("\n=== Final counts ===");
  console.log(`  Salesmen: ${smCount}`);
  console.log(`  Products: ${prCount}`);
  console.log(`  Salesman prices: ${spCount}`);
  console.log("\n=== Migration complete ===\n");
}

main().catch((e) => { console.error(e); process.exit(1); });
