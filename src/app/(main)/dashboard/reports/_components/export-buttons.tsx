"use client";

import * as React from "react";

import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportButtons() {
  const [exportingLedger, setExportingLedger] = React.useState(false);
  const [exportingOrders, setExportingOrders] = React.useState(false);

  async function handleExport(type: "ledger" | "orders") {
    const setLoading = type === "ledger" ? setExportingLedger : setExportingOrders;
    setLoading(true);
    try {
      const res = await fetch(`/api/reports/export?type=${type}`);
      if (!res.ok) {
        const err = await res.text();
        toast.error("Export failed", { description: err });
        return;
      }
      const blob = await res.blob();
      const date = new Date().toISOString().slice(0, 10);
      downloadBlob(blob, `${type}-${date}.csv`);
      toast.success(`${type === "ledger" ? "Ledger" : "Orders"} export downloaded`);
    } catch {
      toast.error("Export failed", { description: "Unexpected error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" disabled={exportingLedger} onClick={() => handleExport("ledger")}>
        {exportingLedger ? <Spinner className="size-3.5" /> : <Download className="size-3.5" />}
        Export Ledger CSV
      </Button>
      <Button size="sm" variant="outline" disabled={exportingOrders} onClick={() => handleExport("orders")}>
        {exportingOrders ? <Spinner className="size-3.5" /> : <Download className="size-3.5" />}
        Export Orders CSV
      </Button>
    </div>
  );
}
