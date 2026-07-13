import { type NextRequest, NextResponse } from "next/server";

import { requirePermission } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Secrets: BACKUP_SECRET env var gates automated cron calls.
// Master admin session also accepted for manual triggers.

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.BACKUP_SECRET;
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;
  // Fall back to session auth (manual trigger from the admin UI)
  try {
    const session = await requirePermission("users", "view"); // master admin only
    return session.isMasterAdmin;
  } catch {
    return false;
  }
}

const TABLES = [
  "salesmen",
  "products",
  "salesman_prices",
  "dispatch_orders",
  "dispatch_items",
  "ledger_entries",
  "profiles",
  "permissions",
] as const;

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const supabase = createAdminClient();
  const backupTimestamp = new Date().toISOString();
  const bundle: Record<string, unknown[]> = {};
  const errors: string[] = [];

  await Promise.all(
    TABLES.map(async (table) => {
      const { data, error } = await supabase.from(table).select("*");
      if (error) {
        errors.push(`${table}: ${error.message}`);
      } else {
        bundle[table] = data ?? [];
      }
    }),
  );

  // Log the backup run into audit_log
  await supabase.from("audit_log").insert({
    table_name: "_backup",
    record_id: backupTimestamp,
    action: "backup",
    new_data: {
      tables_backed_up: Object.keys(bundle),
      row_counts: Object.fromEntries(Object.entries(bundle).map(([k, v]) => [k, Array.isArray(v) ? v.length : 0])),
      errors,
    },
  });

  return NextResponse.json(
    {
      timestamp: backupTimestamp,
      tables: Object.fromEntries(Object.entries(bundle).map(([k, v]) => [k, Array.isArray(v) ? v.length : 0])),
      errors,
      data: bundle,
    },
    {
      headers: {
        "Content-Disposition": `attachment; filename="backup-${backupTimestamp.slice(0, 10)}.json"`,
        "Content-Type": "application/json",
      },
    },
  );
}

// Health endpoint — returns last backup timestamp from audit_log
export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("audit_log")
    .select("created_at, new_data")
    .eq("table_name", "_backup")
    .eq("action", "backup")
    .order("created_at", { ascending: false })
    .limit(10);

  return NextResponse.json({ runs: data ?? [] });
}
