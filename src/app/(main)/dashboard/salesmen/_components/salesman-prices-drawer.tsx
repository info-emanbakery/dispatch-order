"use client";

import * as React from "react";

import { Tag } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { adjustSalesmanPriceAction } from "@/server/pricing-actions";

export type ProductPriceEntry = {
  productId: string;
  productName: string;
  productUnit: string;
  productSku: string | null;
  currentPrice: number | null;
};

export function SalesmanPricesDrawer({
  open,
  onOpenChange,
  salesmanId,
  salesmanName,
  entries,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  salesmanId: string;
  salesmanName: string;
  entries: ProductPriceEntry[];
}) {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const missingCount = entries.filter((e) => e.currentPrice === null).length;

  function startEdit(entry: ProductPriceEntry) {
    setEditingId(entry.productId);
    setEditValue(entry.currentPrice !== null ? String(entry.currentPrice) : "");
  }

  async function saveEdit(entry: ProductPriceEntry) {
    const price = Number(editValue);
    if (!editValue || Number.isNaN(price) || price <= 0) {
      toast.error("Enter a valid price.");
      return;
    }
    setSaving(true);
    const result = await adjustSalesmanPriceAction({
      salesmanId,
      productId: entry.productId,
      price,
    });
    setSaving(false);
    if (result.success) {
      toast.success(`Price updated — ${entry.productName}`);
      setEditingId(null);
    } else {
      toast.error("Failed", { description: result.error });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="size-4" />
            {salesmanName} — Prices
          </DialogTitle>
          <DialogDescription>
            Current active prices for this salesman. Each change creates a new audit row — history is preserved.
            {missingCount > 0 && (
              <span className="ml-1 text-amber-600 dark:text-amber-400">
                {missingCount} product(s) have no price set.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="divide-y divide-border/50">
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 bg-muted/30 px-3 py-1.5">
            <div className="text-muted-foreground text-xs">Product</div>
            <div className="text-right text-muted-foreground text-xs">Current price (EGP)</div>
            <div className="w-20" />
          </div>

          {entries.map((entry) => {
            const isEditing = editingId === entry.productId;
            return (
              <div key={entry.productId} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 px-3 py-2">
                <div>
                  <div className="font-medium text-sm">{entry.productName}</div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="h-4 px-1 text-xs">{entry.productUnit}</Badge>
                    {entry.productSku && (
                      <span className="text-muted-foreground text-xs">{entry.productSku}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {isEditing ? (
                    <Input
                      autoFocus
                      type="number"
                      min="0.01"
                      step="0.01"
                      className="h-7 w-28 text-right text-sm"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      disabled={saving}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") void saveEdit(entry);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                    />
                  ) : (
                    <span
                      className={
                        entry.currentPrice === null
                          ? "text-muted-foreground text-sm italic"
                          : "font-mono text-sm tabular-nums"
                      }
                    >
                      {entry.currentPrice !== null
                        ? entry.currentPrice.toLocaleString("en-EG", { minimumFractionDigits: 2 })
                        : "No price set"}
                    </span>
                  )}
                </div>
                <div className="flex w-20 justify-end gap-1">
                  {isEditing ? (
                    <>
                      <Button
                        size="sm"
                        className="h-7 px-2 text-xs"
                        disabled={saving}
                        onClick={() => void saveEdit(entry)}
                      >
                        {saving ? <Spinner className="size-3" /> : "Save"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        disabled={saving}
                        onClick={() => setEditingId(null)}
                      >
                        ✕
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs"
                      onClick={() => startEdit(entry)}
                    >
                      {entry.currentPrice === null ? "Set price" : "Change"}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}

          {entries.length === 0 && (
            <div className="px-3 py-8 text-center text-muted-foreground text-sm">No active products found.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
