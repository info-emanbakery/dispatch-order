import { requirePermission } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/supabase/admin";

import { BackupPanel } from "./_components/backup-panel";
import { BulkImportPanel } from "./_components/bulk-import-panel";
import { PriceImportPanel } from "./_components/price-import-panel";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await requirePermission("users", "view");
  if (!session.isMasterAdmin) {
    throw new Error("Master admin access required.");
  }

  const supabase = createAdminClient();
  const { data: runs } = await supabase
    .from("audit_log")
    .select("created_at, new_data")
    .eq("table_name", "_backup")
    .eq("action", "backup")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-xl">Admin Tools</h1>
        <p className="text-muted-foreground text-sm">Backup, bulk import, and system utilities. Master admin only.</p>
      </div>
      <PriceImportPanel />
      <BackupPanel initialRuns={(runs as never) ?? []} />
      <BulkImportPanel />
    </div>
  );
}
