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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BalanceCards } from "./balance-cards";
import { buildLedgerColumns } from "./ledger-columns";
import { LedgerTable } from "./ledger-table";
import { RecordPaymentDialog } from "./record-payment-dialog";
import type { LedgerEntry, SalesmanBalance, SalesmanOption } from "./types";

const TYPE_OPTIONS = [
  { value: "all", label: "All entries" },
  { value: "debit", label: "Debits only" },
  { value: "credit", label: "Credits only" },
];

export function Payments({
  entries,
  balances,
  salesmen,
  canCreate,
}: {
  readonly entries: LedgerEntry[];
  readonly balances: SalesmanBalance[];
  readonly salesmen: SalesmanOption[];
  readonly canCreate: boolean;
}) {
  const [paymentOpen, setPaymentOpen] = React.useState(false);
  const [preselectedSalesman, setPreselectedSalesman] = React.useState<string | undefined>(undefined);

  const [sorting, setSorting] = React.useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility] = React.useState<VisibilityState>({ search: false });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });

  const columns = React.useMemo(() => buildLedgerColumns({ showSalesman: true }), []);

  const table = useReactTable({
    data: entries,
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
  const typeFilter = (table.getColumn("entryType")?.getFilterValue() as string | undefined) ?? "all";

  function openPaymentFor(salesmanId: string) {
    setPreselectedSalesman(salesmanId);
    setPaymentOpen(true);
  }

  return (
    <>
      <Tabs defaultValue="balances">
        <div className="mb-4 flex items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="balances">Balances</TabsTrigger>
            <TabsTrigger value="ledger">Full Ledger</TabsTrigger>
          </TabsList>
          {canCreate && (
            <Button
              size="sm"
              onClick={() => {
                setPreselectedSalesman(undefined);
                setPaymentOpen(true);
              }}
            >
              <Plus /> Record Payment
            </Button>
          )}
        </div>

        <TabsContent value="balances">
          <BalanceCards balances={balances} canCreate={canCreate} onRecordPayment={openPaymentFor} />
        </TabsContent>

        <TabsContent value="ledger">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl leading-none">Ledger Entries</CardTitle>
              <CardDescription className="max-w-sm leading-snug">
                Append-only double-entry ledger. Debits are dispatch orders; credits are payments.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-0">
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4">
                <div className="flex flex-wrap gap-2">
                  <InputGroup className="h-8 w-full md:w-60">
                    <InputGroupAddon align="inline-start">
                      <Search className="size-3.5" />
                    </InputGroupAddon>
                    <InputGroupInput
                      className="h-8"
                      placeholder="Search salesman, reference…"
                      value={searchQuery}
                      onChange={(event) => {
                        table.getColumn("search")?.setFilterValue(event.target.value || undefined);
                        table.setPageIndex(0);
                      }}
                    />
                  </InputGroup>
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
                    value={typeFilter}
                    onValueChange={(value) => {
                      table.getColumn("entryType")?.setFilterValue(value === "all" ? undefined : value);
                      table.setPageIndex(0);
                    }}
                  >
                    <SelectTrigger size="sm">
                      <span className="text-muted-foreground">Type:</span>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper" align="start">
                      <SelectGroup>
                        {TYPE_OPTIONS.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-muted-foreground text-sm tabular-nums">
                  {table.getFilteredRowModel().rows.length} of {entries.length} entries
                </div>
              </div>
              <LedgerTable table={table} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <RecordPaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        salesmen={salesmen}
        preselectedSalesmanId={preselectedSalesman}
      />
    </>
  );
}
