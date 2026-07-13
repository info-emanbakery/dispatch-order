"use client";

import * as React from "react";

import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { adjustSalesmanPriceAction, setDefaultPriceForAllAction } from "@/server/pricing-actions";

export type SalesmanPriceEntry = {
  salesmanId: string;
  salesmanName: string;
  salesmanCode: string | null;
  currentPrice: number | null;
  priceId: string | null;
};

export function ProductPricesDrawer({
  open,
  onOpenChange,
  productId,
  productName,
  productUnit,
  entries,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  productId: string;
  productName: string;
  productUnit: string;
  entries: SalesmanPriceEntry[];
}) {
  const router = useRouter();
  const [defaultPrice, setDefaultPrice] = React.useState("");
  const [overwrite, setOverwrite] = React.useState(false);
  const [settingDefault, setSettingDefault] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const missingCount = entries.filter((e) => e.currentPrice === null).length;

  async function handleSetDefault() {
    const price = Number(defaultPrice);
    if (!defaultPrice || Number.isNaN(price) || price <= 0) {
      toast.error("Enter a valid price.");
      return;
    }
    setSettingDefault(true);
    const result = await setDefaultPriceForAllAction({ productId, price, overwriteExisting: overwrite });
    setSettingDefault(false);
    if (result.success) {
      toast.success(`Set for ${result.created} salesman(s). ${result.skipped > 0 ? `${result.skipped} already had a price (skipped).` : ""}`);
      setDefaultPrice("");
      router.refresh();
    } else {
      toast.error("Failed", { description: result.error });
    }
  }

  function startEdit(entry: SalesmanPriceEntry) {
    setEditingId(entry.salesmanId);
    setEditValue(entry.currentPrice !== null ? String(entry.currentPrice) : "");
  }

  async function saveEdit(entry: SalesmanPriceEntry) {
    const price = Number(editValue);
    if (!editValue || Number.isNaN(price) || price <= 0) {
      toast.error("Enter a valid price.");
      return;
    }
    setSaving(true);
    const result = await adjustSalesmanPriceAction({
      salesmanId: entry.salesmanId,
      productId,
      price,
    });
    setSaving(false);
    if (result.success) {
      toast.success(`Price updated for ${entry.salesmanName}`);
      setEditingId(null);
      router.refresh();
    } else {
      toast.error("Failed", { description: result.error });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="size-4" />
            {productName}
            <Badge variant="secondary" className="font-normal">{productUnit}</Badge>
          </DialogTitle>
          <DialogDescription>
            Salesman prices for this product. Changes create a new audit row — history is preserved.
          </DialogDescription>
        </DialogHeader>

        {/* Set default for all */}
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="mb-2 font-medium text-sm">Set default price for all salesmen</div>
          <div className="flex flex-wrap items-end gap-2">
            <div>
              <div className="mb-1 text-muted-foreground text-xs">Price (EGP)</div>
              <Input
                type="number"
                min="0.01"
                step="0.01"
                className="h-8 w-32 text-sm"
                placeholder="0.00"
                value={defaultPrice}
                onChange={(e) => setDefaultPrice(e.target.value)}
                disabled={settingDefault}
              />
            </div>
            <label className="flex cursor-pointer items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={overwrite}
                onChange={(e) => setOverwrite(e.target.checked)}
                disabled={settingDefault}
                className="rounded"
              />
              Also update salesmen who already have a price
            </label>
            <Button size="sm" className="h-8" onClick={handleSetDefault} disabled={settingDefault || !defaultPrice}>
              {settingDefault ? <Spinner className="size-3.5" /> : null}
              Apply to all
            </Button>
          </div>
          {missingCount > 0 && (
            <p className="mt-1.5 text-amber-600 text-xs dark:text-amber-400">
              {missingCount} salesman(s) have no price set yet.
            </p>
          )}
        </div>

        <Separator />

        {/* Per-salesman rows */}
        <div className="space-y-0 divide-y divide-border/50">
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 bg-muted/30 px-3 py-1.5">
            <div className="text-muted-foreground text-xs">Salesman</div>
            <div className="text-right text-muted-foreground text-xs">Current price (EGP)</div>
            <div className="w-20" />
          </div>
          {entries.map((entry) => {
            const isEditing = editingId === entry.salesmanId;
            return (
              <div key={entry.salesmanId} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 px-3 py-2">
                <div>
                  <div className="font-medium text-sm">{entry.salesmanName}</div>
                  {entry.salesmanCode && (
                    <div className="text-muted-foreground text-xs">{entry.salesmanCode}</div>
                  )}
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
            <div className="px-3 py-8 text-center text-muted-foreground text-sm">No active salesmen found.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
