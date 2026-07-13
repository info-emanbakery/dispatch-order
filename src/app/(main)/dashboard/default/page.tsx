import { createAdminClient } from "@/lib/supabase/admin";

import { MetricCards } from "./_components/metric-cards";
import { OrderStatusChart } from "./_components/order-status-chart";
import { RecentOrders } from "./_components/recent-orders";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = createAdminClient();

  const [ordersRes, salesmenRes, revenueRes, recentRes] = await Promise.all([
    supabase.from("dispatch_orders").select("status"),
    supabase.from("salesmen").select("id", { count: "exact", head: true }).eq("active", true),
    supabase.from("dispatch_orders").select("total").in("status", ["submitted", "delivered"]),
    supabase
      .from("dispatch_orders")
      .select("id, order_number, total, status, created_at, salesmen(full_name)")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const orders = ordersRes.data ?? [];
  const activeSalesmen = salesmenRes.count ?? 0;
  const totalRevenue = (revenueRes.data ?? []).reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const recentOrders = (recentRes.data ?? []).map((o) => ({
    id: o.id as string,
    order_number: o.order_number as string,
    total: Number(o.total) || 0,
    status: o.status as string,
    created_at: o.created_at as string,
    salesman_name: (o.salesmen as unknown as { full_name: string } | null)?.full_name ?? "—",
  }));

  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    const s = o.status as string;
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});

  const draftCount = statusCounts["draft"] ?? 0;
  const submittedCount = statusCounts["submitted"] ?? 0;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div>
        <h1 className="font-semibold text-xl">Overview</h1>
        <p className="mt-0.5 text-muted-foreground text-sm">Live snapshot of your dispatch operations.</p>
      </div>

      <MetricCards
        totalOrders={orders.length}
        totalRevenue={totalRevenue}
        activeSalesmen={activeSalesmen}
        pendingOrders={draftCount + submittedCount}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6">
        <OrderStatusChart data={statusCounts} />
        <RecentOrders orders={recentOrders} />
      </div>
    </div>
  );
}
