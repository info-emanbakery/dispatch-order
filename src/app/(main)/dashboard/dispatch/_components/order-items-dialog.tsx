"use client";

import * as React from "react";

import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { removeOrderItemAction, upsertOrderItemAction } from "@/server/dispatch-actions";

import type { DispatchOrderDetail, ProductOption } from "./types";
import { DISPATCH_STATUS_LABELS } from "./types";

function AddItemRow({
  orderId,
  products,
  usedProductIds,
  onAdded,
}: {
  orderId: string;
  products: ProductOption[];
  usedProductIds: Set<string>;
  onAdded: () => void;
}) {
  const [productId, setProductId] = React.useState("");
  const [qty, setQty] = React.useState("1");
  const [submitting, setSubmitting] = React.useState(false);

  const available = products.filter((p) => !usedProductIds.has(p.id));
  const selected = products.find((p) => p.id === productId);

  async function handleAdd() {
    if (!productId) return;
    const quantity = Number.parseInt(qty, 10);
    if (Number.isNaN(quantity) || quantity <= 0) {
      toast.error("Enter a valid quantity.");
      return;
    }
    if (selected?.activePrice == null) {
      toast.error("No active price for this product. Set a price first.");
      return;
    }
    setSubmitting(true);
    const result = await upsertOrderItemAction({
      orderId,
      productId,
      quantity,
      unitPrice: selected.activePrice,
    });
    setSubmitting(false);
    if (result.success) {
      toast.success("Item added");
      setProductId("");
      setQty("1");
      onAdded();
    } else {
      toast.error("Failed to add item", { description: result.error });
    }
  }

  return (
    <div className="flex items-end gap-2 px-4 py-3">
      <div className="flex-1">
        <div className="mb-1 text-muted-foreground text-xs">Product</div>
        <Select value={productId} onValueChange={setProductId} disabled={submitting}>
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="Select product…" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {available.length === 0 ? (
                <SelectItem value="__none" disabled>
                  All products added
                </SelectItem>
              ) : (
                available.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} ({p.unit}){p.activePrice == null ? " — ⚠ No price" : ""}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-20">
        <div className="mb-1 text-muted-foreground text-xs">Qty</div>
        <Input
          className="h-8 text-sm"
          type="number"
          min="1"
          step="1"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          disabled={submitting}
        />
      </div>
      <div className="w-24">
        <div className="mb-1 text-muted-foreground text-xs">Unit price</div>
        <div className="flex h-8 items-center rounded-md border bg-muted/40 px-2 font-mono text-sm">
          {selected?.activePrice != null
            ? selected.activePrice.toLocaleString("en-EG", { minimumFractionDigits: 2 })
            : "—"}
        </div>
      </div>
      <Button size="sm" className="h-8" disabled={submitting || !productId} onClick={handleAdd}>
        {submitting ? <Spinner className="size-3.5" /> : <Plus className="size-3.5" />}
        Add
      </Button>
    </div>
  );
}

function ItemRow({
  item,
  orderId,
  canEdit,
  onRemoved,
}: {
  item: DispatchOrderDetail["items"][number];
  orderId: string;
  canEdit: boolean;
  onRemoved: () => void;
}) {
  const [removing, setRemoving] = React.useState(false);

  async function handleRemove() {
    setRemoving(true);
    const result = await removeOrderItemAction({ itemId: item.id, orderId });
    setRemoving(false);
    if (result.success) {
      toast.success("Item removed");
      onRemoved();
    } else {
      toast.error("Failed", { description: result.error });
    }
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2.5">
      <div className="flex-1">
        <div className="font-medium text-sm">{item.productName}</div>
        <div className="text-muted-foreground text-xs">{item.productUnit}</div>
      </div>
      <div className="w-16 text-right font-mono text-sm tabular-nums">{item.quantity}</div>
      <div className="w-24 text-right font-mono text-sm tabular-nums">
        {item.unitPrice.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
      </div>
      <div className="w-24 text-right font-mono font-semibold text-sm tabular-nums">
        {item.lineTotal.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
      </div>
      {canEdit && (
        <Button
          size="icon-sm"
          variant="ghost"
          className="size-7 text-destructive hover:bg-destructive/10"
          disabled={removing}
          onClick={handleRemove}
        >
          {removing ? <Spinner className="size-3.5" /> : <Trash2 className="size-3.5" />}
        </Button>
      )}
    </div>
  );
}

export function OrderItemsDialog({
  order,
  open,
  onOpenChange,
  products,
  onChanged,
}: {
  order: DispatchOrderDetail | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  products: ProductOption[];
  onChanged: () => void;
}) {
  if (!order) return null;
  const isDraft = order.status === "draft";
  const usedProductIds = new Set(order.items.map((i) => i.productId));

  const grandTotal = order.items.reduce((s, i) => s + i.lineTotal, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{order.orderNumber}</DialogTitle>
            <Badge variant="outline" className="font-normal text-xs">
              {DISPATCH_STATUS_LABELS[order.status]}
            </Badge>
          </div>
          <DialogDescription>
            {order.salesmanName} · {order.orderDate}
          </DialogDescription>
        </DialogHeader>

        {/* Column headers */}
        <div className="flex items-center gap-2 border-t bg-muted/30 px-4 py-1.5">
          <div className="flex-1 text-muted-foreground text-xs">Product</div>
          <div className="w-16 text-right text-muted-foreground text-xs">Qty</div>
          <div className="w-24 text-right text-muted-foreground text-xs">Unit Price</div>
          <div className="w-24 text-right text-muted-foreground text-xs">Line Total</div>
          {isDraft && <div className="size-7" />}
        </div>

        {/* Items */}
        {order.items.length === 0 ? (
          <div className="px-4 py-6 text-center text-muted-foreground text-sm">No items yet.</div>
        ) : (
          <div className="divide-y divide-border/40">
            {order.items.map((item) => (
              <ItemRow key={item.id} item={item} orderId={order.id} canEdit={isDraft} onRemoved={onChanged} />
            ))}
          </div>
        )}

        <Separator />
        <div className="flex justify-end px-4">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Order total</span>
            <span className="font-mono font-bold text-lg">
              {grandTotal.toLocaleString("en-EG", { minimumFractionDigits: 2 })} EGP
            </span>
          </div>
        </div>

        {/* Add row (draft only) */}
        {isDraft && (
          <>
            <Separator />
            <AddItemRow orderId={order.id} products={products} usedProductIds={usedProductIds} onAdded={onChanged} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
