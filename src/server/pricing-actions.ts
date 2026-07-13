"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { can, getSessionProfile } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type ActionResult = { success: true } | { success: false; error: string };
export type BulkResult = { success: true; created: number; skipped: number } | { success: false; error: string };

function today() {
  return new Date().toISOString().slice(0, 10);
}

// ─── Adjust one salesman's price for one product (audit-safe) ─────────────────
// Always creates a NEW row. Expires the previous active row for same salesman+product.

const adjustSchema = z.object({
  salesmanId: z.uuid(),
  productId: z.uuid(),
  price: z.number().positive("Price must be greater than 0."),
});

export async function adjustSalesmanPriceAction(input: z.infer<typeof adjustSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "pricing", "create")) {
    return { success: false, error: "You don't have permission to adjust prices." };
  }
  const parsed = adjustSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const { salesmanId, productId, price } = parsed.data;
  const admin = createAdminClient();
  const todayStr = today();

  // Expire any currently-active row for this salesman+product
  await admin
    .from("salesman_prices")
    .update({ valid_to: todayStr })
    .eq("salesman_id", salesmanId)
    .eq("product_id", productId)
    .is("valid_to", null)
    .lte("valid_from", todayStr);

  // Insert new row
  const { error } = await admin.from("salesman_prices").insert({
    salesman_id: salesmanId,
    product_id: productId,
    price,
    valid_from: todayStr,
    valid_to: null,
    created_by: session.userId,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/pricing");
  revalidatePath("/dashboard/salesmen");
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/dispatch");
  return { success: true };
}

// ─── Set a default price for ONE product across ALL salesmen ──────────────────
// For each salesman that does NOT yet have an active price for this product,
// creates a new row at the default price.
// For salesmen that already have a different active price, skips them (preserves overrides).
// Pass overwriteExisting=true to also update those who already have a price.

const setDefaultSchema = z.object({
  productId: z.uuid(),
  price: z.number().positive("Price must be greater than 0."),
  overwriteExisting: z.boolean().default(false),
});

export async function setDefaultPriceForAllAction(input: z.infer<typeof setDefaultSchema>): Promise<BulkResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "pricing", "create")) {
    return { success: false, error: "You don't have permission to set prices." };
  }
  const parsed = setDefaultSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const { productId, price, overwriteExisting } = parsed.data;
  const admin = createAdminClient();
  const todayStr = today();

  // Get all active salesmen
  const { data: salesmen, error: smErr } = await admin
    .from("salesmen")
    .select("id")
    .eq("active", true);

  if (smErr) return { success: false, error: smErr.message };
  if (!salesmen || salesmen.length === 0) return { success: true, created: 0, skipped: 0 };

  // Get existing active prices for this product
  const { data: existing } = await admin
    .from("salesman_prices")
    .select("salesman_id")
    .eq("product_id", productId)
    .is("valid_to", null)
    .lte("valid_from", todayStr);

  const existingSet = new Set((existing ?? []).map((r) => r.salesman_id as string));

  const toInsert: string[] = [];
  const toOverwrite: string[] = [];
  let skipped = 0;

  for (const sm of salesmen) {
    const sid = sm.id as string;
    if (existingSet.has(sid)) {
      if (overwriteExisting) {
        toOverwrite.push(sid);
      } else {
        skipped++;
      }
    } else {
      toInsert.push(sid);
    }
  }

  // Expire existing rows for salesmen being overwritten
  if (toOverwrite.length > 0) {
    await admin
      .from("salesman_prices")
      .update({ valid_to: todayStr })
      .eq("product_id", productId)
      .in("salesman_id", toOverwrite)
      .is("valid_to", null)
      .lte("valid_from", todayStr);
  }

  const allToCreate = [...toInsert, ...toOverwrite];
  if (allToCreate.length === 0) {
    return { success: true, created: 0, skipped };
  }

  const rows = allToCreate.map((sid) => ({
    salesman_id: sid,
    product_id: productId,
    price,
    valid_from: todayStr,
    valid_to: null,
    created_by: session.userId,
  }));

  const { error: insertErr } = await admin.from("salesman_prices").insert(rows);
  if (insertErr) return { success: false, error: insertErr.message };

  revalidatePath("/dashboard/pricing");
  revalidatePath("/dashboard/salesmen");
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/dispatch");
  return { success: true, created: allToCreate.length, skipped };
}

// ─── CSV bulk import (price matrix) ──────────────────────────────────────────
// Expected CSV: salesman_code,product_sku,price
// One row per salesman-product pair. Creates or overwrites active price for each.

const csvRowSchema = z.object({
  salesmanCode: z.string().min(1),
  productSku: z.string().min(1),
  price: z.number().positive(),
});

export type CsvImportResult =
  | { success: true; created: number; errors: string[] }
  | { success: false; error: string };

export async function bulkImportPricesAction(rows: { salesmanCode: string; productSku: string; price: number }[]): Promise<CsvImportResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "pricing", "create")) {
    return { success: false, error: "You don't have permission to import prices." };
  }
  if (rows.length === 0) return { success: false, error: "No rows to import." };
  if (rows.length > 10000) return { success: false, error: "Too many rows (max 10,000)." };

  const admin = createAdminClient();
  const todayStr = today();

  // Load lookup tables
  const [{ data: salesmen }, { data: products }] = await Promise.all([
    admin.from("salesmen").select("id, code"),
    admin.from("products").select("id, sku"),
  ]);

  const salesmanByCode = new Map((salesmen ?? []).map((s) => [
    (s.code as string | null)?.toLowerCase() ?? "",
    s.id as string,
  ]));
  const productBySku = new Map((products ?? []).map((p) => [
    (p.sku as string | null)?.toLowerCase() ?? "",
    p.id as string,
  ]));

  const toInsert: { salesman_id: string; product_id: string; price: number; valid_from: string; valid_to: null; created_by: string }[] = [];
  const toExpirePairs: { salesmanId: string; productId: string }[] = [];
  const errors: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const parsed = csvRowSchema.safeParse({
      salesmanCode: row.salesmanCode,
      productSku: row.productSku,
      price: row.price,
    });
    if (!parsed.success) {
      errors.push(`Row ${i + 2}: ${parsed.error.issues[0]?.message ?? "Invalid."}`);
      continue;
    }
    const salesmanId = salesmanByCode.get(row.salesmanCode.toLowerCase());
    if (!salesmanId) {
      errors.push(`Row ${i + 2}: Salesman code "${row.salesmanCode}" not found.`);
      continue;
    }
    const productId = productBySku.get(row.productSku.toLowerCase());
    if (!productId) {
      errors.push(`Row ${i + 2}: Product SKU "${row.productSku}" not found.`);
      continue;
    }
    toExpirePairs.push({ salesmanId, productId });
    toInsert.push({
      salesman_id: salesmanId,
      product_id: productId,
      price: row.price,
      valid_from: todayStr,
      valid_to: null,
      created_by: session.userId,
    });
  }

  if (toInsert.length === 0) {
    return { success: true, created: 0, errors };
  }

  // Expire existing active rows in batches
  for (const pair of toExpirePairs) {
    await admin
      .from("salesman_prices")
      .update({ valid_to: todayStr })
      .eq("salesman_id", pair.salesmanId)
      .eq("product_id", pair.productId)
      .is("valid_to", null)
      .lte("valid_from", todayStr);
  }

  // Insert new rows in chunks of 500
  let created = 0;
  for (let i = 0; i < toInsert.length; i += 500) {
    const chunk = toInsert.slice(i, i + 500);
    const { error } = await admin.from("salesman_prices").insert(chunk);
    if (error) {
      errors.push(`Batch insert error: ${error.message}`);
    } else {
      created += chunk.length;
    }
  }

  revalidatePath("/dashboard/pricing");
  revalidatePath("/dashboard/salesmen");
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/dispatch");
  return { success: true, created, errors };
}
