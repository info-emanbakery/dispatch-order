import { format } from "date-fns";

import { requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

import { ExportButtons } from "./_components/export-buttons";
import { KpiStrip } from "./_components/kpi-strip";
import { MonthlyChart } from "./_components/monthly-chart";
import { SalesmanPerfTable } from "./_components/salesman-perf-table";
import type { MonthlyPoint, ReportKpis, SalesmanPerf } from "./_components/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  await requirePermission("reports", "view");
  const supabase = await createClient();

  const [ordersResult, ledgerResult, balancesResult] = await Promise.all([
    supabase
      .from("dispatch_orders")
      .select("id, salesman_id, total_amount, order_date, status, salesmen(name, active)"),
    supabase.from("ledger_entries").select("id, salesman_id, entry_type, amount, created_at"),
    supabase.from("salesman_balances").select("*"),
  ]);

  const orders = ordersResult.data ?? [];
  const entries = ledgerResult.data ?? [];
  const balances = balancesResult.data ?? [];

  // ── KPIs ───────────────────────────────────────────────────────────────────
  const totalOrders = orders.length;
  const totalDispatchedValue = entries
    .filter((e) => e.entry_type === "debit")
    .reduce((s, e) => s + Number(e.amount), 0);
  const totalPaymentsCollected = entries
    .filter((e) => e.entry_type === "credit")
    .reduce((s, e) => s + Number(e.amount), 0);
  const totalOutstandingBalance = totalDispatchedValue - totalPaymentsCollected;

  const kpis: ReportKpis = {
    totalOrders,
    totalDispatchedValue,
    totalPaymentsCollected,
    totalOutstandingBalance,
  };

  // ── Monthly chart (last 12 months) ─────────────────────────────────────────
  const now = new Date();
  const months: MonthlyPoint[] = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
    return { month: format(d, "MMM yy"), dispatched: 0, collected: 0 };
  });

  for (const e of entries) {
    const d = new Date(e.created_at as string);
    const key = format(d, "MMM yy");
    const pt = months.find((m) => m.month === key);
    if (!pt) continue;
    if (e.entry_type === "debit") pt.dispatched += Number(e.amount);
    else pt.collected += Number(e.amount);
  }

  // ── Salesman performance ───────────────────────────────────────────────────
  const salesmanMap = new Map<
    string,
    { name: string; active: boolean; ordersCount: number; dispatchedValue: number; collectedValue: number }
  >();

  for (const o of orders) {
    const sm = o.salesmen as unknown as { name: string; active: boolean } | null | undefined;
    // biome-ignore lint/suspicious/noUnnecessaryConditions: supabase join may return null
    const name = sm?.name ?? "Unknown";
    // biome-ignore lint/suspicious/noUnnecessaryConditions: supabase join may return null
    const active = sm?.active ?? true;
    const sid = o.salesman_id as string;
    if (!salesmanMap.has(sid)) {
      salesmanMap.set(sid, { name, active, ordersCount: 0, dispatchedValue: 0, collectedValue: 0 });
    }
    const row = salesmanMap.get(sid);
    if (!row) continue;
    row.ordersCount += 1;
    row.dispatchedValue += Number(o.total_amount ?? 0);
  }

  for (const e of entries) {
    if (e.entry_type !== "credit") continue;
    const sid = e.salesman_id as string;
    if (!salesmanMap.has(sid)) {
      const bal = balances.find((b) => b.salesman_id === sid);
      salesmanMap.set(sid, {
        name: (bal?.name as string | undefined) ?? sid,
        active: (bal?.active as boolean | undefined) ?? true,
        ordersCount: 0,
        dispatchedValue: 0,
        collectedValue: 0,
      });
    }
    const row = salesmanMap.get(sid);
    if (!row) continue;
    row.collectedValue += Number(e.amount);
  }

  const perfRows: SalesmanPerf[] = Array.from(salesmanMap.entries()).map(([salesmanId, row]) => ({
    salesmanId,
    salesmanName: row.name,
    active: row.active,
    ordersCount: row.ordersCount,
    dispatchedValue: row.dispatchedValue,
    collectedValue: row.collectedValue,
    balance: row.dispatchedValue - row.collectedValue,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-xl">Reports</h1>
          <p className="text-muted-foreground text-sm">Dispatch and payment analytics across all salesmen.</p>
        </div>
        <ExportButtons />
      </div>
      <KpiStrip kpis={kpis} />
      <MonthlyChart data={months} />
      <SalesmanPerfTable rows={perfRows} />
    </div>
  );
}
