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
import { setSalesmanActiveAction } from "@/server/catalog-actions";

import { CreateSalesmanDialog, EditSalesmanDialog } from "./salesman-dialog";
import { SalesmanPricesDrawer, type ProductPriceEntry } from "./salesman-prices-drawer";
import { buildSalesmenColumns } from "./salesmen-columns";
import { SalesmenTable } from "./salesmen-table";
import type { SalesmanRow } from "./types";

const STATUS_FILTERS = ["All", "Active", "Deactivated"];

export function Salesmen({
  salesmen,
  productPrices,
  canCreate,
  canEdit,
}: {
  readonly salesmen: SalesmanRow[];
  readonly productPrices: {
    salesmanId: string;
    productId: string;
    productName: string;
    productUnit: string;
    productSku: string | null;
    currentPrice: number | null;
  }[];
  readonly canCreate: boolean;
  readonly canEdit: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility] = React.useState<VisibilityState>({ search: false });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState<SalesmanRow | null>(null);
  const [toggleRow, setToggleRow] = React.useState<SalesmanRow | null>(null);
  const [toggling, setToggling] = React.useState(false);
  const [pricesSalesman, setPricesSalesman] = React.useState<SalesmanRow | null>(null);

  const columns = React.useMemo(
    () =>
      buildSalesmenColumns({
        canEdit,
        onEdit: (row) => setEditRow(row),
        onToggleActive: (row) => setToggleRow(row),
        onViewPrices: (row) => setPricesSalesman(row),
      }),
    [canEdit],
  );

  const table = useReactTable({
    data: salesmen,
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
  const statusFilter = (table.getColumn("active")?.getFilterValue() as string | undefined) ?? "All";

  let toggleLabel = toggleRow?.active ? "Deactivate" : "Reactivate";
  if (toggling) toggleLabel = "Working…";

  async function confirmToggle() {
    if (!toggleRow) return;
    setToggling(true);
    const result = await setSalesmanActiveAction({ id: toggleRow.id, active: !toggleRow.active });
    setToggling(false);
    if (result.success) {
      toast.success(toggleRow.active ? "Salesman deactivated" : "Salesman reactivated");
      setToggleRow(null);
    } else {
      toast.error("Action failed", { description: result.error });
    }
  }

  // Build price entries for the currently selected salesman
  const priceEntries: ProductPriceEntry[] = React.useMemo(() => {
    if (!pricesSalesman) return [];
    return productPrices
      .filter((pp) => pp.salesmanId === pricesSalesman.id)
      .map((pp) => ({
        productId: pp.productId,
        productName: pp.productName,
        productUnit: pp.productUnit,
        productSku: pp.productSku,
        currentPrice: pp.currentPrice,
      }));
  }, [pricesSalesman, productPrices]);

  return (
    <>
      <Card>
        <CardHeader className="border-b has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
          <CardTitle className="text-xl leading-none">Salesmen</CardTitle>
          <CardDescription className="max-w-sm leading-snug">
            Manage field salesmen. Click "Prices" to view and adjust individual product prices.
          </CardDescription>
          <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
            <InputGroup className="h-8 w-full md:w-64">
              <InputGroupAddon align="inline-start">
                <Search className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                className="h-8"
                placeholder="Search by name, code or area…"
                value={searchQuery}
                onChange={(event) => {
                  table.getColumn("search")?.setFilterValue(event.target.value || undefined);
                  table.setPageIndex(0);
                }}
              />
            </InputGroup>
            {canCreate && (
              <Button size="sm" onClick={() => setCreateOpen(true)}>
                <Plus /> Add Salesman
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                table.getColumn("active")?.setFilterValue(value === "All" ? undefined : value);
                table.setPageIndex(0);
              }}
            >
              <SelectTrigger size="sm">
                <span className="text-muted-foreground">Status:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" align="start">
                <SelectGroup>
                  {STATUS_FILTERS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="text-muted-foreground text-sm tabular-nums">
              {table.getFilteredRowModel().rows.length} of {salesmen.length} salesmen
            </div>
          </div>
          <SalesmenTable table={table} />
        </CardContent>
      </Card>

      <CreateSalesmanDialog open={createOpen} onOpenChange={setCreateOpen} />
      <EditSalesmanDialog salesman={editRow} open={editRow !== null} onOpenChange={(o) => !o && setEditRow(null)} />

      {/* Prices drawer */}
      {pricesSalesman && (
        <SalesmanPricesDrawer
          open={pricesSalesman !== null}
          onOpenChange={(o) => !o && setPricesSalesman(null)}
          salesmanId={pricesSalesman.id}
          salesmanName={pricesSalesman.name}
          entries={priceEntries}
        />
      )}

      <AlertDialog open={toggleRow !== null} onOpenChange={(o) => !o && !toggling && setToggleRow(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {toggleRow?.active ? `Deactivate ${toggleRow?.name}?` : `Reactivate ${toggleRow?.name}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {toggleRow?.active
                ? "Deactivated salesmen cannot receive new dispatch orders. Their historical records remain untouched."
                : "This salesman will be able to receive new dispatch orders again."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={toggling}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={toggleRow?.active ? "bg-destructive text-white hover:bg-destructive/90" : undefined}
              disabled={toggling}
              onClick={(e) => {
                e.preventDefault();
                void confirmToggle();
              }}
            >
              {toggleLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
