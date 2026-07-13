import { can, requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

import { Pricing } from "./_components/pricing";
import type { PriceRow, PriceStatus, ProductOption, SalesmanOption } from "./_components/types";

export const dynamic = "force-dynamic";

function computeStatus(validFrom: string, validTo: string | null): PriceStatus {
  const today = new Date().toISOString().slice(0, 10);
  if (validFrom > today) return "scheduled";
  if (validTo !== null && validTo < today) return "expired";
  return "active";
}

export default async function Page() {
  const session = await requirePermission("pricing", "view");
  const supabase = await createClient();

  const [pricesResult, salesmenResult, productsResult] = await Promise.all([
    supabase
      .from("salesman_prices")
      .select("id, salesman_id, product_id, price, valid_from, valid_to, salesmen(name), products(name)")
      .order("valid_from", { ascending: false }),
    supabase.from("salesmen").select("id, name, code").eq("active", true).order("name"),
    supabase.from("products").select("id, name, sku, unit").eq("active", true).order("name"),
  ]);

  if (pricesResult.error ?? salesmenResult.error ?? productsResult.error) {
    throw new Error(
      pricesResult.error?.message ??
        salesmenResult.error?.message ??
        productsResult.error?.message ??
        "Failed to load pricing data.",
    );
  }

  const prices: PriceRow[] = (pricesResult.data ?? []).map((r) => {
    const sm = r.salesmen as unknown as { name?: string } | null | undefined;
    const pr = r.products as unknown as { name?: string } | null | undefined;
    return {
      id: r.id as string,
      salesmanId: r.salesman_id as string,
      // biome-ignore lint/suspicious/noUnnecessaryConditions: supabase join may return null
      salesmanName: sm?.name ?? "Unknown",
      productId: r.product_id as string,
      // biome-ignore lint/suspicious/noUnnecessaryConditions: supabase join may return null
      productName: pr?.name ?? "Unknown",
      price: Number(r.price),
      validFrom: r.valid_from as string,
      validTo: r.valid_to as string | null,
      status: computeStatus(r.valid_from as string, r.valid_to as string | null),
    };
  });

  const salesmen: SalesmanOption[] = (salesmenResult.data ?? []).map((s) => ({
    id: s.id as string,
    name: s.name as string,
    code: s.code as string | null,
  }));

  const products: ProductOption[] = (productsResult.data ?? []).map((p) => ({
    id: p.id as string,
    name: p.name as string,
    sku: p.sku as string | null,
    unit: p.unit as string,
  }));

  return (
    <Pricing
      prices={prices}
      salesmen={salesmen}
      products={products}
      canCreate={can(session, "pricing", "create")}
      canEdit={can(session, "pricing", "edit")}
    />
  );
}
