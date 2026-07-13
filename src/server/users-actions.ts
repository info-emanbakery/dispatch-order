"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { APP_MODULES } from "@/lib/auth/modules";
import { can, getSessionProfile } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/supabase/admin";

const MODULE_KEYS = APP_MODULES.map((m) => m.key) as [string, ...string[]];

const permissionRowSchema = z.object({
  module: z.enum(MODULE_KEYS),
  can_view: z.boolean(),
  can_read: z.boolean(),
  can_create: z.boolean(),
  can_edit: z.boolean(),
});

const createUserSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
  email: z.email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters.").max(72),
  permissions: z.array(permissionRowSchema).max(APP_MODULES.length),
});

const updateUserSchema = z.object({
  userId: z.uuid(),
  fullName: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
  permissions: z.array(permissionRowSchema).max(APP_MODULES.length),
});

const setActiveSchema = z.object({
  userId: z.uuid(),
  active: z.boolean(),
});

const resetPasswordSchema = z.object({
  userId: z.uuid(),
  password: z.string().min(8, "Password must be at least 8 characters.").max(72),
});

export type ActionResult = { success: true } | { success: false; error: string };

function firstZodError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input.";
}

export async function createUserAction(input: z.infer<typeof createUserSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "users", "create")) {
    return { success: false, error: "You don't have permission to create users." };
  }

  const parsed = createUserSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const admin = createAdminClient();
  const { fullName, email, password, permissions } = parsed.data;

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (createError) {
    const friendly = createError.message.toLowerCase().includes("already")
      ? "A user with this email address already exists."
      : createError.message;
    return { success: false, error: friendly };
  }

  const { error: profileError } = await admin.from("profiles").insert({
    id: created.user.id,
    full_name: fullName,
    email,
    is_master_admin: false,
    active: true,
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(created.user.id);
    return { success: false, error: `Failed to create profile: ${profileError.message}` };
  }

  if (permissions.length > 0) {
    const rows = permissions.map((p) => ({ user_id: created.user.id, ...p }));
    const { error: permError } = await admin.from("permissions").upsert(rows, { onConflict: "user_id,module" });
    if (permError) {
      return { success: false, error: `User created but permissions failed to save: ${permError.message}` };
    }
  }

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function updateUserAction(input: z.infer<typeof updateUserSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "users", "edit")) {
    return { success: false, error: "You don't have permission to edit users." };
  }

  const parsed = updateUserSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const { userId, fullName, permissions } = parsed.data;
  const admin = createAdminClient();

  const { data: target } = await admin.from("profiles").select("id, is_master_admin").eq("id", userId).single();
  if (!target) return { success: false, error: "User not found." };

  if (target.is_master_admin && userId !== session.userId) {
    return { success: false, error: "The Master Admin account can only be edited by the Master Admin." };
  }

  // Guardrail check BEFORE any write: non-master users may rename themselves,
  // but their own permission rows are never touched (matrix is read-only for self in the UI).
  const isSelfEdit = userId === session.userId;

  const { error: profileError } = await admin.from("profiles").update({ full_name: fullName }).eq("id", userId);
  if (profileError) return { success: false, error: profileError.message };

  // Master admin has implicit full access — no permission rows needed.
  // Self-edits never modify own permissions (server-side guardrail).
  if (!target.is_master_admin && !isSelfEdit) {
    const rows = permissions.map((p) => ({ user_id: userId, ...p }));
    const { error: permError } = await admin.from("permissions").upsert(rows, { onConflict: "user_id,module" });
    if (permError) return { success: false, error: permError.message };
  }

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function setUserActiveAction(input: z.infer<typeof setActiveSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "users", "edit")) {
    return { success: false, error: "You don't have permission to edit users." };
  }

  const parsed = setActiveSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const { userId, active } = parsed.data;

  if (userId === session.userId) {
    return { success: false, error: "You cannot deactivate your own account." };
  }

  const admin = createAdminClient();
  const { data: target } = await admin.from("profiles").select("id, is_master_admin").eq("id", userId).single();
  if (!target) return { success: false, error: "User not found." };
  if (target.is_master_admin) {
    return { success: false, error: "The Master Admin account cannot be deactivated." };
  }

  const { error } = await admin.from("profiles").update({ active }).eq("id", userId);
  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function resetUserPasswordAction(input: z.infer<typeof resetPasswordSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "users", "edit")) {
    return { success: false, error: "You don't have permission to edit users." };
  }

  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const { userId, password } = parsed.data;
  const admin = createAdminClient();

  const { data: target } = await admin.from("profiles").select("id, is_master_admin").eq("id", userId).single();
  if (!target) return { success: false, error: "User not found." };
  if (target.is_master_admin && userId !== session.userId) {
    return { success: false, error: "Only the Master Admin can reset their own password." };
  }

  const { error } = await admin.auth.admin.updateUserById(userId, { password });
  if (error) return { success: false, error: error.message };

  return { success: true };
}
