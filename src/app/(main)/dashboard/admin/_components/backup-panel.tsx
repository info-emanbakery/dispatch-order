"use client";

import * as React from "react";

import { format } from "date-fns";
import { DatabaseBackup, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

type BackupRun = {
  created_at: string;
  new_data: {
    tables_backed_up?: string[];
    row_counts?: Record<string, number>;
    errors?: string[];
  };
};

export function BackupPanel({ initialRuns }: { initialRuns: BackupRun[] }) {
  const [runs, setRuns] = React.useState<BackupRun[]>(initialRuns);
  const [loading, setLoading] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);

  async function refreshRuns() {
    setLoading(true);
    const res = await fetch("/api/admin/backup");
    if (res.ok) {
      const json = await res.json();
      setRuns(json.runs ?? []);
    }
    setLoading(false);
  }

  async function triggerBackup() {
    setDownloading(true);
    try {
      const res = await fetch("/api/admin/backup", { method: "POST" });
      if (!res.ok) {
        toast.error("Backup failed", { description: await res.text() });
        return;
      }
      const json = await res.json();
      const blob = new Blob([JSON.stringify(json.data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Backup downloaded", {
        description: `${Object.values(json.tables as Record<string, number>).reduce((s, n) => s + n, 0)} total rows exported`,
      });
      await refreshRuns();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DatabaseBackup className="size-4" />
          Database Backup
        </CardTitle>
        <CardDescription>
          Manual backup downloads all tables as JSON. Automated backups run daily at 02:00 UTC via Vercel Cron (set{" "}
          <code>BACKUP_SECRET</code> to secure the endpoint).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button onClick={triggerBackup} disabled={downloading}>
            {downloading ? <Spinner className="size-4" /> : <Download className="size-4" />}
            Download Backup Now
          </Button>
          <Button variant="outline" size="icon" onClick={refreshRuns} disabled={loading}>
            <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <div className="font-medium text-sm">Recent Backup Runs</div>
          {runs.length === 0 && <p className="text-muted-foreground text-sm">No backup runs yet.</p>}
          {runs.map((run) => {
            const errors = run.new_data?.errors ?? [];
            return (
              <div
                key={run.created_at}
                className="flex items-start justify-between gap-4 rounded-lg border border-border/60 px-4 py-3"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="font-medium text-sm">{format(new Date(run.created_at), "dd MMM yyyy HH:mm:ss")}</div>
                  <div className="text-muted-foreground text-xs">
                    {(run.new_data?.tables_backed_up ?? []).join(", ")}
                  </div>
                  {errors.length > 0 && (
                    <Alert variant="destructive" className="mt-1 py-1">
                      <AlertDescription className="text-xs">{errors.join("; ")}</AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(run.new_data?.row_counts ?? {}).map(([table, count]) => (
                    <Badge key={table} variant="secondary" className="text-xs">
                      {table}: {count}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
