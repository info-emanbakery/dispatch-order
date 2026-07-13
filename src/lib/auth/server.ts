import { cache } from "react";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { buildPermissionMap, type ModuleKey, type PermissionAction, type PermissionMap } from "./modules";

export type SessionProfile = {
  userId: string;
  fullName: string;
  email: string;
  isMasterAdmin: boolean;
  permissions: PermissionMap;
};

/**
 * Loads the authenticated user's profile + permission matrix.
 * Cached per-request (React cache) so layouts and pages share one fetch.
 * Returns null when unauthenticated, profile missing, or deactivated.
 */
export const getSessionProfile = cache(async (): Promise<SessionProfile | null> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email, is_master_admin, active")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.active) return null;

  let permissionRows = null;
  if (!profile.is_master_admin) {
    const { data } = await supabase
      .from("permissions")
      .select("module, can_view, can_read, can_create, can_edit")
      .eq("user_id", user.id);
    permissionRows = data;
  }

  return {
    userId: profile.id,
    fullName: profile.full_name,
    email: profile.email,
    isMasterAdmin: profile.is_master_admin,
    permissions: buildPermissionMap(permissionRows, profile.is_master_admin),
  };
});

export function can(session: SessionProfile, module: ModuleKey, action: PermissionAction): boolean {
  if (session.isMasterAdmin) return true;
  return session.permissions[module]?.[action] ?? false;
}

/** Redirects to login when unauthenticated. */
export async function requireAuth(): Promise<SessionProfile> {
  const session = await getSessionProfile();
  if (!session) redirect("/auth/v1/login");
  return session;
}

/** Redirects to /unauthorized when the user lacks the required permission. */
export async function requirePermission(module: ModuleKey, action: PermissionAction): Promise<SessionProfile> {
  const session = await requireAuth();
  if (!can(session, module, action)) redirect("/unauthorized");
  return session;
}
