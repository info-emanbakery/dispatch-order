import { can, requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

import { Products } from "./_components/products";
import type { ProductRow } from "./_components/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await requirePermission("products", "view");
  const supabase = await createClient();

  const today = new Date().toISOString().slice(0, 10);

  const [productsResult, salesmenResult, pricesResult] = await Promise.all([
    supabase
      .from("products")
      .select("id, sku, barcode, name, unit, active, created_at")
      .order("name", { ascending: true }),
    supabase.from("salesmen").select("id, name, code").eq("active", true).order("name"),
    // Active prices only
    supabase
      .from("salesman_prices")
      .select("salesman_id, product_id, price")
      .lte("valid_from", today)
      .or(`valid_to.is.null,valid_to.gte.${today}`),
  ]);

  if (productsResult.error) throw new Error(productsResult.error.message);

  const rows: ProductRow[] = (productsResult.data ?? []).map((p) => ({
    id: p.id as string,
    sku: p.sku as string | null,
    barcode: p.barcode as string | null,
    name: p.name as string,
    unit: p.unit as string,
    active: p.active as boolean,
    createdAt: p.created_at as string,
  }));

  const salesmen = salesmenResult.data ?? [];
  const activePrices = pricesResult.data ?? [];

  // Build a map: productId -> salesmanId -> price
  const priceMap = new Map<string, number>();
  for (const p of activePrices) {
    priceMap.set(`${p.product_id as string}:${p.salesman_id as string}`, Number(p.price));
  }

  // For each product × salesman, emit one entry (null price if not set)
  const salesmanPrices = rows.flatMap((product) =>
    salesmen.map((sm) => ({
      productId: product.id,
      salesmanId: sm.id as string,
      salesmanName: sm.name as string,
      salesmanCode: sm.code as string | null,
      currentPrice: priceMap.get(`${product.id}:${sm.id as string}`) ?? null,
    })),
  );

  return (
    <Products
      products={rows}
      salesmanPrices={salesmanPrices}
      canCreate={can(session, "products", "create")}
      canEdit={can(session, "products", "edit")}
    />
  );
}
