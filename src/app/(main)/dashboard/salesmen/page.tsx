import { can, requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

import { Salesmen } from "./_components/salesmen";
import type { SalesmanRow } from "./_components/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await requirePermission("salesmen", "view");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("salesmen")
    .select("id, code, name, phone, area, active, created_at")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const rows: SalesmanRow[] = (data ?? []).map((s) => ({
    id: s.id as string,
    code: s.code as string | null,
    name: s.name as string,
    phone: s.phone as string | null,
    area: s.area as string | null,
    active: s.active as boolean,
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
