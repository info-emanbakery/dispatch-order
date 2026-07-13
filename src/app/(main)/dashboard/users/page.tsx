import { buildPermissionMap, type PermissionRow } from "@/lib/auth/modules";
import { can, requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

import { Users } from "./_components/users";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await requirePermission("users", "view");
  const supabase = await createClient();

  const [{ data: profiles, error: profilesError }, { data: permissionRows, error: permsError }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, email, is_master_admin, active, created_at")
      .order("created_at", { ascending: false }),
    supabase.from("permissions").select("user_id, module, can_view, can_read, can_create, can_edit"),
  ]);

  if (profilesError || permsError) {
    throw new Error(profilesError?.message ?? permsError?.message ?? "Failed to load users.");
  }

  const permsByUser = new Map<string, PermissionRow[]>();
  for (const row of permissionRows ?? []) {
    const list = permsByUser.get(row.user_id) ?? [];
    list.push(row as unknown as PermissionRow);
    permsByUser.set(row.user_id, list);
  }

  const rows = (profiles ?? []).map((p) => ({
    id: p.id as string,
    name: p.full_name as string,
    email: p.email as string,
    isMasterAdmin: p.is_master_admin as boolean,
    active: p.active as boolean,
    createdAt: p.created_at as string,
    permissions: buildPermissionMap(permsByUser.get(p.id) ?? [], p.is_master_admin as boolean),
  }));

  return (
    <Users
      users={rows}
      canCreate={can(session, "users", "create")}
      canEdit={can(session, "users", "edit")}
      currentUserId={session.userId}
    />
  );
}
