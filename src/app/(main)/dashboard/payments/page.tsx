import { can, requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

import { Payments } from "./_components/payments";
import type { LedgerEntry, SalesmanBalance, SalesmanOption } from "./_components/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await requirePermission("payments", "view");
  const supabase = await createClient();

  const [entriesResult, balancesResult, salesmenResult] = await Promise.all([
    supabase
      .from("ledger_entries")
      .select(
        "id, salesman_id, entry_type, amount, method, dispatch_order_id, reference, note, created_at, salesmen(name), dispatch_orders(order_number)",
      )
      .order("created_at", { ascending: false }),
    supabase.from("salesman_balances").select("*"),
    supabase.from("salesmen").select("id, name, code").eq("active", true).order("name"),
  ]);

  if (entriesResult.error ?? balancesResult.error ?? salesmenResult.error) {
    throw new Error(
      entriesResult.error?.message ??
        balancesResult.error?.message ??
        salesmenResult.error?.message ??
        "Failed to load payments data.",
    );
  }

  const entries: LedgerEntry[] = (entriesResult.data ?? []).map((r) => {
    const sm = r.salesmen as unknown as { name: string } | null | undefined;
    const do_ = r.dispatch_orders as unknown as { order_number: string } | null | undefined;
    return {
      id: r.id as string,
      salesmanId: r.salesman_id as string,
      // biome-ignore lint/suspicious/noUnnecessaryConditions: supabase join may return null
      salesmanName: sm?.name ?? "Unknown",
      entryType: r.entry_type as "debit" | "credit",
      amount: Number(r.amount),
      method: r.method as string | null,
      dispatchOrderId: r.dispatch_order_id as string | null,
      // biome-ignore lint/suspicious/noUnnecessaryConditions: supabase join may return null
      dispatchOrderNumber: do_?.order_number ?? null,
      reference: r.reference as string | null,
      note: r.note as string | null,
      createdAt: r.created_at as string,
    };
  });

  const balances: SalesmanBalance[] = (balancesResult.data ?? []).map((b) => ({
    salesmanId: b.salesman_id as string,
    salesmanName: b.name as string,
    active: b.active as boolean,
    totalDebits: Number(b.total_debits),
    totalCredits: Number(b.total_credits),
    balance: Number(b.balance),
  }));

  const salesmen: SalesmanOption[] = (salesmenResult.data ?? []).map((s) => ({
    id: s.id as string,
    name: s.name as string,
    code: s.code as string | null,
  }));

  return (
    <Payments
      entries={entries}
      balances={balances}
      salesmen={salesmen}
      canCreate={can(session, "payments", "create")}
    />
  );
}
