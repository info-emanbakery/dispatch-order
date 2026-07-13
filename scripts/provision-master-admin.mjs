#!/usr/bin/env node
/**
 * Module 7 — Feature 2: Initial Master Admin Provisioning
 *
 * Provisions exactly ONE Master Admin in Supabase Auth + profiles table.
 * Refuses to run if a Master Admin already exists.
 *
 * Usage:
 *   node scripts/provision-master-admin.mjs <email> <password> [full name]
 * or via env: MASTER_ADMIN_EMAIL / MASTER_ADMIN_PASSWORD / MASTER_ADMIN_NAME
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const email = process.env.MASTER_ADMIN_EMAIL ?? process.argv[2];
const password = process.env.MASTER_ADMIN_PASSWORD ?? process.argv[3];
const fullName = process.env.MASTER_ADMIN_NAME ?? process.argv[4] ?? "Master Admin";

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}
if (!email || !password) {
  console.error("Usage: node scripts/provision-master-admin.mjs <email> <password> [full name]");
  process.exit(1);
}
if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: existing, error: checkError } = await admin
  .from("profiles")
  .select("id, email")
  .eq("is_master_admin", true);

if (checkError) {
  console.error("Failed to check for existing Master Admin:", checkError.message);
  process.exit(1);
}
if (existing && existing.length > 0) {
  console.error(`A Master Admin already exists (${existing[0].email}). Aborting — exactly one is allowed.`);
  process.exit(1);
}

const { data: created, error: createError } = await admin.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { full_name: fullName },
});

if (createError) {
  console.error("Failed to create auth user:", createError.message);
  process.exit(1);
}

const { error: profileError } = await admin.from("profiles").insert({
  id: created.user.id,
  full_name: fullName,
  email,
  is_master_admin: true,
  active: true,
});

if (profileError) {
  console.error("Auth user created but profile insert failed:", profileError.message);
  console.error("Rolling back auth user…");
  await admin.auth.admin.deleteUser(created.user.id);
  process.exit(1);
}

console.log(`✅ Master Admin provisioned: ${fullName} <${email}> (id: ${created.user.id})`);
console.log("They can now sign in at /auth/v1/login with full access to every module.");
