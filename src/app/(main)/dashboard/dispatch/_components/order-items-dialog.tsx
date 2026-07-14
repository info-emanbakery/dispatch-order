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
    <div className="px-4 py-3 sm:px-6">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-end sm:gap-2">
        <div className="col-span-2 sm:flex-1">
          <div className="mb-1 text-muted-foreground text-xs">Product</div>
          <Select value={productId} onValueChange={setProductId} disabled={submitting}>
            <SelectTrigger className="h-9 text-sm">
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
        <div className="sm:w-20">
          <div className="mb-1 text-muted-foreground text-xs">Qty</div>
          <Input
            className="h-9 text-sm"
            type="number"
            min="1"
            step="1"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div className="sm:w-24">
          <div className="mb-1 text-muted-foreground text-xs">Unit price</div>
          <div className="flex h-9 items-center rounded-md border bg-muted/40 px-2 font-mono text-sm">
            {selected?.activePrice != null
              ? selected.activePrice.toLocaleString("en-EG", { minimumFractionDigits: 2 })
              : "—"}
          </div>
        </div>
        <Button
          size="sm"
          className="col-span-2 h-9 sm:col-span-1"
          disabled={submitting || !productId}
          onClick={handleAdd}
        >
          {submitting ? <Spinner className="size-3.5" /> : <Plus className="size-3.5" />}
          Add
        </Button>
      </div>
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
    <div className="flex items-center gap-2 px-4 py-2.5 sm:px-6">
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-sm">{item.productName}</div>
        <div className="text-muted-foreground text-xs">{item.productUnit}</div>
      </div>
      <div className="w-10 text-right font-mono text-sm tabular-nums sm:w-16">{item.quantity}</div>
      <div className="hidden text-right font-mono text-sm tabular-nums sm:block sm:w-24">
        {item.unitPrice.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
      </div>
      <div className="w-20 text-right font-mono font-semibold text-sm tabular-nums sm:w-24">
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
      <DialogContent className="flex max-h-[90dvh] w-[calc(100vw-2rem)] max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:w-full">
        <DialogHeader className="shrink-0 px-4 pb-3 pt-4 sm:px-6">
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
        <div className="shrink-0 border-y bg-muted/30 px-4 py-1.5 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 text-muted-foreground text-xs">Product</div>
            <div className="w-10 text-right text-muted-foreground text-xs sm:w-16">Qty</div>
            <div className="hidden text-right text-muted-foreground text-xs sm:block sm:w-24">Unit Price</div>
            <div className="w-20 text-right text-muted-foreground text-xs sm:w-24">Total</div>
            {isDraft && <div className="size-7" />}
          </div>
        </div>

        {/* Scrollable items list */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {order.items.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground text-sm">No items yet.</div>
          ) : (
            <div className="divide-y divide-border/40">
              {order.items.map((item) => (
                <ItemRow key={item.id} item={item} orderId={order.id} canEdit={isDraft} onRemoved={onChanged} />
              ))}
            </div>
          )}
        </div>

        {/* Footer: total + add row */}
        <div className="shrink-0 border-t bg-background">
          <div className="flex justify-end px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">Order total</span>
              <span className="font-mono font-bold text-base sm:text-lg">
                {grandTotal.toLocaleString("en-EG", { minimumFractionDigits: 2 })} EGP
              </span>
            </div>
          </div>

          {isDraft && (
            <>
              <Separator />
              <AddItemRow orderId={order.id} products={products} usedProductIds={usedProductIds} onAdded={onChanged} />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
