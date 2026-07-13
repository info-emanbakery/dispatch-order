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

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { CreatePriceDialog, EditPriceDialog } from "./price-dialog";
import { buildPricingColumns } from "./pricing-columns";
import { PricingTable } from "./pricing-table";
import type { PriceRow, ProductOption, SalesmanOption } from "./types";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "scheduled", label: "Scheduled" },
  { value: "expired", label: "Expired" },
];

export function Pricing({
  prices,
  salesmen,
  products,
  canCreate,
  canEdit,
}: {
  readonly prices: PriceRow[];
  readonly salesmen: SalesmanOption[];
  readonly products: ProductOption[];
  readonly canCreate: boolean;
  readonly canEdit: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "validFrom", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility] = React.useState<VisibilityState>({ search: false });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState<PriceRow | null>(null);

  const columns = React.useMemo(() => buildPricingColumns({ canEdit, onEdit: (row) => setEditRow(row) }), [canEdit]);

  const table = useReactTable({
    data: prices,
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

  return (
    <>
      <Card>
        <CardHeader className="border-b has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
          <CardTitle className="text-xl leading-none">Pricing Configuration</CardTitle>
          <CardDescription className="max-w-sm leading-snug">
            Set salesman-specific product prices with optional validity scheduling. Overlapping windows are rejected
            automatically.
          </CardDescription>
          <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
            <InputGroup className="h-8 w-full md:w-64">
              <InputGroupAddon align="inline-start">
                <Search className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                className="h-8"
                placeholder="Search salesman or product…"
                value={searchQuery}
                onChange={(event) => {
                  table.getColumn("search")?.setFilterValue(event.target.value || undefined);
                  table.setPageIndex(0);
                }}
              />
            </InputGroup>
            {canCreate && (
              <Button size="sm" onClick={() => setCreateOpen(true)}>
                <Plus /> Add Price
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4">
            <div className="flex flex-wrap gap-2">
              {/* Salesman filter */}
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
              {/* Status filter */}
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
              {table.getFilteredRowModel().rows.length} of {prices.length} entries
            </div>
          </div>
          <PricingTable table={table} />
        </CardContent>
      </Card>

      <CreatePriceDialog open={createOpen} onOpenChange={setCreateOpen} salesmen={salesmen} products={products} />
      <EditPriceDialog
        row={editRow}
        open={editRow !== null}
        onOpenChange={(o) => !o && setEditRow(null)}
        salesmen={salesmen}
        products={products}
      />
    </>
  );
}
