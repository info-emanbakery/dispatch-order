"use client";
"use no memo";

import * as React from "react";

import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { advanceOrderStatusAction, submitOrderAction } from "@/server/dispatch-actions";

import { buildDispatchColumns } from "./dispatch-columns";
import { DispatchTable } from "./dispatch-table";
import { CreateOrderDialog, EditOrderDialog } from "./order-dialog";
import { OrderItemsDialog } from "./order-items-dialog";
import type { DispatchOrderDetail, DispatchOrderRow, DispatchStatus, ProductOption, SalesmanOption } from "./types";
import { DISPATCH_STATUS_LABELS } from "./types";

type PriceRecord = { salesmanId: string; productId: string; price: number };

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All statuses" },
  ...Object.entries(DISPATCH_STATUS_LABELS).map(([v, l]) => ({ value: v, label: l })),
];

export function Dispatch({
  orders,
  orderDetails,
  salesmen,
  products,
  priceRecords,
  canCreate,
  canEdit,
}: {
  readonly orders: DispatchOrderRow[];
  readonly orderDetails: Map<string, DispatchOrderDetail>;
  readonly salesmen: SalesmanOption[];
  readonly products: ProductOption[];
  readonly priceRecords: PriceRecord[];
  readonly canCreate: boolean;
  readonly canEdit: boolean;
}) {
  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility] = React.useState<VisibilityState>({ search: false });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOrder, setEditOrder] = React.useState<DispatchOrderRow | null>(null);
  const [viewOrder, setViewOrder] = React.useState<DispatchOrderDetail | null>(null);
  const [pendingViewId, setPendingViewId] = React.useState<string | null>(null);

  type AdvanceTarget = "delivered" | "partial" | "returned" | "cancelled";
  const [confirmSubmit, setConfirmSubmit] = React.useState<DispatchOrderRow | null>(null);
  const [confirmAdvance, setConfirmAdvance] = React.useState<{
    order: DispatchOrderRow;
    newStatus: AdvanceTarget;
  } | null>(null);
  const [working, setWorking] = React.useState(false);

  // Build per-salesman price map
  const priceMap = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const p of priceRecords) {
      map.set(`${p.salesmanId}:${p.productId}`, p.price);
    }
    return map;
  }, [priceRecords]);

  // When a new order is created, router.refresh() re-renders the server component.
  // Once the new order appears in orderDetails, open the items dialog automatically.
  React.useEffect(() => {
    if (!pendingViewId) return;
    const detail = orderDetails.get(pendingViewId);
    if (detail) {
      setViewOrder(detail);
      setPendingViewId(null);
    }
  }, [pendingViewId, orderDetails]);

  // Compute salesman-specific product prices for the order currently being viewed
  const productsForCurrentOrder = React.useMemo((): ProductOption[] => {
    if (!viewOrder) return products;
    return products.map((p) => ({
      ...p,
      activePrice: priceMap.get(`${viewOrder.salesmanId}:${p.id}`) ?? null,
    }));
  }, [viewOrder, products, priceMap]);

  const columns = React.useMemo(
    () =>
      buildDispatchColumns({
        canEdit,
        onView: (row) => setViewOrder(orderDetails.get(row.id) ?? null),
        onSubmit: (row) => setConfirmSubmit(row),
        onAdvance: (row, newStatus) => setConfirmAdvance({ order: row, newStatus }),
      }),
    [canEdit, orderDetails],
  );

  const table = useReactTable({
    data: orders,
    columns,
    state: { sorting, columnFilters, columnVisibility, pagination },
    getRowId: (row) => row.id,
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const searchQuery = (table.getColumn("search")?.getFilterValue() as string | undefined) ?? "";
  const salesmanFilter = (table.getColumn("salesman")?.getFilterValue() as string | undefined) ?? "all";
  const statusFilter = (table.getColumn("status")?.getFilterValue() as string | undefined) ?? "all";

  async function handleConfirmSubmit() {
    if (!confirmSubmit) return;
    setWorking(true);
    const result = await submitOrderAction(confirmSubmit.id);
    setWorking(false);
    if (result.success) {
      toast.success(`Order ${confirmSubmit.orderNumber} submitted`);
      setConfirmSubmit(null);
    } else {
      toast.error("Submit failed", { description: result.error });
    }
  }

  async function handleConfirmAdvance() {
    if (!confirmAdvance) return;
    setWorking(true);
    const result = await advanceOrderStatusAction({
      orderId: confirmAdvance.order.id,
      newStatus: confirmAdvance.newStatus,
    });
    setWorking(false);
    if (result.success) {
      toast.success(`Order ${confirmAdvance.order.orderNumber} → ${DISPATCH_STATUS_LABELS[confirmAdvance.newStatus]}`);
      setConfirmAdvance(null);
    } else {
      toast.error("Status update failed", { description: result.error });
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="border-b has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
          <CardTitle className="text-xl leading-none">Dispatch Orders</CardTitle>
          <CardDescription className="max-w-sm leading-snug">
            Create and manage field dispatch orders. Prices are locked at submission time using the pricing engine.
          </CardDescription>
          <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
            <InputGroup className="h-8 w-full md:w-64">
              <InputGroupAddon align="inline-start">
                <Search className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                className="h-8"
                placeholder="Search order # or salesman…"
                value={searchQuery}
                onChange={(event) => {
                  table.getColumn("search")?.setFilterValue(event.target.value || undefined);
                  table.setPageIndex(0);
                }}
              />
            </InputGroup>
            {canCreate && (
              <Button size="sm" onClick={() => setCreateOpen(true)}>
                <Plus /> New Order
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4">
            <div className="flex flex-wrap gap-2">
              <Select
                value={salesmanFilter}
                onValueChange={(value) => {
                  table.getColumn("salesman")?.setFilterValue(value === "all" ? undefined : value);
                  table.setPageIndex(0);
                }}
              >
                <SelectTrigger size="sm" className="w-44">
                  <span className="text-muted-foreground">Salesman:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  <SelectGroup>
                    <SelectItem value="all">All salesmen</SelectItem>
                    {salesmen.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value);
                  table.setPageIndex(0);
                }}
              >
                <SelectTrigger size="sm">
                  <span className="text-muted-foreground">Status:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  <SelectGroup>
                    {STATUS_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="text-muted-foreground text-sm tabular-nums">
              {table.getFilteredRowModel().rows.length} of {orders.length} orders
            </div>
          </div>
          <DispatchTable table={table} />
        </CardContent>
      </Card>

      {/* Create order dialog — after creation, router.refresh() then auto-open items */}
      <CreateOrderDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        salesmen={salesmen}
        onCreated={(orderId) => {
          setPendingViewId(orderId);
          router.refresh();
        }}
      />

      {/* Edit order header */}
      <EditOrderDialog
        order={editOrder}
        open={editOrder !== null}
        onOpenChange={(o) => !o && setEditOrder(null)}
        salesmen={salesmen}
      />

      {/* Order items management — uses salesman-specific prices */}
      <OrderItemsDialog
        order={viewOrder}
        open={viewOrder !== null}
        onOpenChange={(o) => !o && setViewOrder(null)}
        products={productsForCurrentOrder}
        onChanged={() => {
          // refresh happens via revalidatePath; optimistic re-fetch not needed
        }}
      />

      {/* Submit confirmation */}
      <AlertDialog open={confirmSubmit !== null} onOpenChange={(o) => !o && !working && setConfirmSubmit(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit {confirmSubmit?.orderNumber}?</AlertDialogTitle>
            <AlertDialogDescription>
              Submitting will lock the order, record a ledger debit of{" "}
              <strong>{confirmSubmit?.total.toLocaleString("en-EG", { minimumFractionDigits: 2 })} EGP</strong> for{" "}
              {confirmSubmit?.salesmanName}, and move it to <strong>Submitted</strong> status. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={working}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={working}
              onClick={(e) => {
                e.preventDefault();
                void handleConfirmSubmit();
              }}
            >
              {working ? "Submitting…" : "Submit Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Advance status confirmation */}
      <AlertDialog open={confirmAdvance !== null} onOpenChange={(o) => !o && !working && setConfirmAdvance(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Mark {confirmAdvance?.order.orderNumber} as{" "}
              {confirmAdvance ? DISPATCH_STATUS_LABELS[confirmAdvance.newStatus] : ""}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will advance the order status to{" "}
              <strong>{confirmAdvance ? DISPATCH_STATUS_LABELS[confirmAdvance.newStatus] : ""}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={working}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={working}
              onClick={(e) => {
                e.preventDefault();
                void handleConfirmAdvance();
              }}
            >
              {working ? "Updating…" : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
