import { can, requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

import { Salesmen } from "./_components/salesmen";
import type { SalesmanRow } from "./_components/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await requirePermission("salesmen", "view");
  const supabase = await createClient();

  const [{ data, error }, { data: balData }] = await Promise.all([
    supabase
      .from("salesmen")
      .select("id, code, name, phone, area, active, created_at")
      .order("name", { ascending: true }),
    supabase.from("salesman_balances").select("salesman_id, balance"),
  ]);

  if (error) throw new Error(error.message);

  const balanceMap = new Map(
    (balData ?? []).map((b) => [b.salesman_id as string, Number(b.balance ?? 0)]),
  );

  const rows: SalesmanRow[] = (data ?? []).map((s) => ({
    id: s.id as string,
    code: s.code as string | null,
    name: s.name as string,
    phone: s.phone as string | null,
    area: s.area as string | null,
    active: s.active as boolean,
    balance: balanceMap.get(s.id as string) ?? 0,
    createdAt: s.created_at as string,
  }));

  return (
    <Salesmen
      salesmen={rows}
      canCreate={can(session, "salesmen", "create")}
      canEdit={can(session, "salesmen", "edit")}
    />
  );
}
