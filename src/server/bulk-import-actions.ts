"use server";

import { requirePermission } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/supabase/admin";

type ImportType = "salesmen" | "products";
type ImportResult =
  | { success: true; summary: { inserted: number; skipped: number; errors: string[] } }
  | { success: false; error: string };

export async function bulkImportAction(type: ImportType, rows: Record<string, string>[]): Promise<ImportResult> {
  try {
    await requirePermission("users", "create"); // master admin only
    const supabase = createAdminClient();

    const summary = { inserted: 0, skipped: 0, errors: [] as string[] };
    const capped = rows.slice(0, 200);

    if (type === "salesmen") {
      for (const row of capped) {
        const name = row.name?.trim();
        const code = row.code?.trim() || null;
        if (!name) {
          summary.skipped++;
          continue;
        }

        // Skip duplicates by code
        if (code) {
          const { data: existing } = await supabase.from("salesmen").select("id").eq("code", code).maybeSingle();
          if (existing) {
            summary.skipped++;
            continue;
          }
        }

        const { error } = await supabase.from("salesmen").insert({
          name,
          code,
          phone: row.phone?.trim() || null,
          email: row.email?.trim() || null,
          address: row.address?.trim() || null,
          active: true,
        });

        if (error) {
          summary.errors.push(`${name}: ${error.message}`);
          summary.skipped++;
        } else {
          summary.inserted++;
        }
      }
    } else if (type === "products") {
      for (const row of capped) {
        const name = row.name?.trim();
        const sku = row.sku?.trim() || null;
        if (!name) {
          summary.skipped++;
          continue;
        }

        // Skip duplicates by SKU
        if (sku) {
          const { data: existing } = await supabase.from("products").select("id").eq("sku", sku).maybeSingle();
          if (existing) {
            summary.skipped++;
            continue;
          }
        }

        const basePrice = Number.parseFloat(row.base_price ?? "0");
        const { error } = await supabase.from("products").insert({
          name,
          sku,
          unit: row.unit?.trim() || "piece",
          base_price: Number.isFinite(basePrice) && basePrice >= 0 ? basePrice : 0,
          category: row.category?.trim() || null,
          active: true,
        });

        if (error) {
          summary.errors.push(`${name}: ${error.message}`);
          summary.skipped++;
        } else {
          summary.inserted++;
        }
      }
    }

    return { success: true, summary };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
