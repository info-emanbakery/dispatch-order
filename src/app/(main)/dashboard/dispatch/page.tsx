import { can, requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

import { Dispatch } from "./_components/dispatch";
import type {
  DispatchOrderDetail,
  DispatchOrderItem,
  DispatchOrderRow,
  DispatchStatus,
  ProductOption,
  SalesmanOption,
} from "./_components/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await requirePermission("dispatch", "view");
  const supabase = await createClient();

  const [ordersResult, salesmenResult, productsResult] = await Promise.all([
    supabase
      .from("dispatch_orders")
      .select(
        `id, order_number, salesman_id, order_date, status, notes, total, created_at,
         salesmen(name),
         dispatch_items(id, product_id, quantity, unit_price, qty_returned, products(name, unit))`,
      )
      .order("created_at", { ascending: false }),
    supabase.from("salesmen").select("id, name, code").eq("active", true).order("name"),
    supabase.from("products").select("id, name, sku, unit").eq("active", true).order("name"),
  ]);

  if (ordersResult.error ?? salesmenResult.error ?? productsResult.error) {
    throw new Error(
      ordersResult.error?.message ??
        salesmenResult.error?.message ??
        productsResult.error?.message ??
        "Failed to load dispatch data.",
    );
  }

  const salesmen: SalesmanOption[] = (salesmenResult.data ?? []).map((s) => ({
    id: s.id as string,
    name: s.name as string,
    code: s.code as string | null,
  }));

  // Build active price lookup per salesman+product
  const { data: priceData } = await supabase
    .from("salesman_prices")
    .select("salesman_id, product_id, price")
    .lte("valid_from", new Date().toISOString().slice(0, 10))
    .or("valid_to.is.null,valid_to.gte." + new Date().toISOString().slice(0, 10));

  const priceMap = new Map<string, number>();
  for (const p of priceData ?? []) {
    priceMap.set(`${p.salesman_id}:${p.product_id}`, Number(p.price));
  }

  // Products list: activePrice will vary by salesman — we'll attach the first price we find
  // The real price lookup happens in server action (upsertOrderItemAction uses whatever price is passed)
  const products: ProductOption[] = (productsResult.data ?? []).map((p) => {
    // Find any active price for this product (displayed as a hint)
    let activePrice: number | null = null;
    for (const [key, price] of priceMap) {
      if (key.endsWith(`:${p.id as string}`)) {
        activePrice = price;
        break;
      }
    }
    return {
      id: p.id as string,
      name: p.name as string,
      sku: p.sku as string | null,
      unit: p.unit as string,
      activePrice,
    };
  });

  const orders: DispatchOrderRow[] = [];
  const orderDetailsMap = new Map<string, DispatchOrderDetail>();

  for (const r of ordersResult.data ?? []) {
    const sm = r.salesmen as unknown as { name: string } | null | undefined;
    const rawItems = (r.dispatch_items ?? []) as unknown as Array<{
      id: string;
      product_id: string;
      quantity: number;
      unit_price: number;
      qty_returned: number | null;
      products: { name: string; unit: string } | null;
    }>;

    const items: DispatchOrderItem[] = rawItems.map((item) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.products?.name ?? "Unknown",
      productUnit: item.products?.unit ?? "",
      quantity: item.quantity,
      qtyReturned: item.qty_returned ?? 0,
      unitPrice: item.unit_price,
      lineTotal: item.quantity * item.unit_price,
    }));

    const row: DispatchOrderRow = {
      id: r.id as string,
      orderNumber: r.order_number as string,
      salesmanId: r.salesman_id as string,
      // biome-ignore lint/suspicious/noUnnecessaryConditions: supabase join may return null
      salesmanName: sm?.name ?? "Unknown",
      orderDate: r.order_date as string,
      status: (r.status as DispatchStatus) ?? "draft",
      notes: r.notes as string | null,
      total: Number(r.total),
      itemCount: items.length,
      createdAt: r.created_at as string,
    };

    orders.push(row);
    orderDetailsMap.set(row.id, { ...row, items });
  }

  const priceRecords = (priceData ?? []).map((p) => ({
    salesmanId: p.salesman_id as string,
    productId: p.product_id as string,
    price: Number(p.price),
  }));

  return (
    <Dispatch
      orders={orders}
      orderDetails={orderDetailsMap}
      salesmen={salesmen}
      products={products}
      priceRecords={priceRecords}
      canCreate={can(session, "dispatch", "create")}
      canEdit={can(session, "dispatch", "edit")}
    />
  );
}
