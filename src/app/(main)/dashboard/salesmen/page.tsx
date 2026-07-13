import { can, requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

import { Salesmen } from "./_components/salesmen";
import type { SalesmanRow } from "./_components/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await requirePermission("salesmen", "view");
  const supabase = await createClient();

  const today = new Date().toISOString().slice(0, 10);

  const [salesmenResult, balResult, productsResult, pricesResult] = await Promise.all([
    supabase
      .from("salesmen")
      .select("id, code, name, phone, area, iqama_number, vehicle_number, active, created_at")
      .order("name", { ascending: true }),
    supabase.from("salesman_balances").select("salesman_id, balance"),
    supabase.from("products").select("id, name, sku, unit").eq("active", true).order("name"),
    supabase
      .from("salesman_prices")
      .select("salesman_id, product_id, price")
      .lte("valid_from", today)
      .or(`valid_to.is.null,valid_to.gte.${today}`),
  ]);

  if (salesmenResult.error) throw new Error(salesmenResult.error.message);

  const balanceMap = new Map(
    (balResult.data ?? []).map((b) => [b.salesman_id as string, Number(b.balance ?? 0)]),
  );

  const rows: SalesmanRow[] = (salesmenResult.data ?? []).map((s) => ({
    id: s.id as string,
    code: s.code as string | null,
    name: s.name as string,
    phone: s.phone as string | null,
    area: s.area as string | null,
    iqamaNumber: (s as Record<string, unknown>).iqama_number as string | null,
    vehicleNumber: (s as Record<string, unknown>).vehicle_number as string | null,
    active: s.active as boolean,
    balance: balanceMap.get(s.id as string) ?? 0,
    createdAt: s.created_at as string,
  }));

  const products = productsResult.data ?? [];
  const activePrices = pricesResult.data ?? [];

  const priceMap = new Map<string, number>();
  for (const p of activePrices) {
    priceMap.set(`${p.salesman_id as string}:${p.product_id as string}`, Number(p.price));
  }

  const productPrices = rows.flatMap((salesman) =>
    products.map((prod) => ({
      salesmanId: salesman.id,
      productId: prod.id as string,
      productName: prod.name as string,
      productUnit: prod.unit as string,
      productSku: prod.sku as string | null,
      currentPrice: priceMap.get(`${salesman.id}:${prod.id as string}`) ?? null,
    })),
  );

  return (
    <Salesmen
      salesmen={rows}
      productPrices={productPrices}
      canCreate={can(session, "salesmen", "create")}
      canEdit={can(session, "salesmen", "edit")}
    />
  );
}
