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
import { PRODUCT_CATEGORIES, setProductActiveAction } from "@/server/catalog-actions";

import { CreateProductDialog, EditProductDialog } from "./product-dialog";
import { ProductPricesDrawer, type SalesmanPriceEntry } from "./product-prices-drawer";
import { buildProductsColumns } from "./products-columns";
import { ProductsTable } from "./products-table";
import type { ProductRow } from "./types";

const STATUS_FILTERS = ["All", "Active", "Discontinued"];
const CATEGORY_FILTERS = ["All", ...PRODUCT_CATEGORIES];

export function Products({
  products,
  salesmanPrices,
  canCreate,
  canEdit,
}: {
  readonly products: ProductRow[];
  readonly salesmanPrices: {
    productId: string;
    salesmanId: string;
    salesmanName: string;
    salesmanCode: string | null;
    currentPrice: number | null;
  }[];
  readonly canCreate: boolean;
  readonly canEdit: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility] = React.useState<VisibilityState>({ search: false });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 15 });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState<ProductRow | null>(null);
  const [toggleRow, setToggleRow] = React.useState<ProductRow | null>(null);
  const [toggling, setToggling] = React.useState(false);
  const [pricesProduct, setPricesProduct] = React.useState<ProductRow | null>(null);

  const columns = React.useMemo(
    () =>
      buildProductsColumns({
        canEdit,
        onEdit: (row) => setEditRow(row),
        onToggleActive: (row) => setToggleRow(row),
        onViewPrices: (row) => setPricesProduct(row),
      }),
    [canEdit],
  );

  const table = useReactTable({
    data: products,
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
  const categoryFilter = (table.getColumn("category")?.getFilterValue() as string | undefined) ?? "All";

  let toggleLabel = toggleRow?.active ? "Discontinue" : "Reactivate";
  if (toggling) toggleLabel = "Working…";

  async function confirmToggle() {
    if (!toggleRow) return;
    setToggling(true);
    const result = await setProductActiveAction({ id: toggleRow.id, active: !toggleRow.active });
    setToggling(false);
    if (result.success) {
      toast.success(toggleRow.active ? "Product discontinued" : "Product reactivated");
      setToggleRow(null);
    } else {
      toast.error("Action failed", { description: result.error });
    }
  }

  const priceEntries: SalesmanPriceEntry[] = React.useMemo(() => {
    if (!pricesProduct) return [];
    return salesmanPrices
      .filter((sp) => sp.productId === pricesProduct.id)
      .map((sp) => ({
        salesmanId: sp.salesmanId,
        salesmanName: sp.salesmanName,
        salesmanCode: sp.salesmanCode,
        currentPrice: sp.currentPrice,
        priceId: null,
      }));
  }, [pricesProduct, salesmanPrices]);

  return (
    <>
      <Card>
        <CardHeader className="border-b has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
          <CardTitle className="text-xl leading-none">Products</CardTitle>
          <CardDescription className="max-w-sm leading-snug">
            Manage the bakery product catalog. Click "Prices" to view and edit salesman prices.
          </CardDescription>
          <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
            <InputGroup className="h-8 w-full md:w-64">
              <InputGroupAddon align="inline-start">
                <Search className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                className="h-8"
                placeholder="Search by name, code or category…"
                value={searchQuery}
                onChange={(event) => {
                  table.getColumn("search")?.setFilterValue(event.target.value || undefined);
                  table.setPageIndex(0);
                }}
              />
            </InputGroup>
            {canCreate && (
              <Button size="sm" onClick={() => setCreateOpen(true)}>
                <Plus /> Add Product
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div className="flex flex-wrap items-center gap-3 px-4">
            {/* Category filter */}
            <Select
              value={categoryFilter}
              onValueChange={(value) => {
                table.getColumn("category")?.setFilterValue(value === "All" ? undefined : value);
                table.setPageIndex(0);
              }}
            >
              <SelectTrigger size="sm" className="w-36">
                <span className="text-muted-foreground">Category:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" align="start">
                <SelectGroup>
                  {CATEGORY_FILTERS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Status filter */}
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

            <div className="ml-auto text-muted-foreground text-sm tabular-nums">
              {table.getFilteredRowModel().rows.length} of {products.length} products
            </div>
          </div>
          <ProductsTable table={table} />
        </CardContent>
      </Card>

      <CreateProductDialog open={createOpen} onOpenChange={setCreateOpen} />
      <EditProductDialog product={editRow} open={editRow !== null} onOpenChange={(o) => !o && setEditRow(null)} />

      {pricesProduct && (
        <ProductPricesDrawer
          open={pricesProduct !== null}
          onOpenChange={(o) => !o && setPricesProduct(null)}
          productId={pricesProduct.id}
          productName={pricesProduct.name}
          productUnit={pricesProduct.unit}
          entries={priceEntries}
        />
      )}

      <AlertDialog open={toggleRow !== null} onOpenChange={(o) => !o && !toggling && setToggleRow(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {toggleRow?.active ? `Discontinue ${toggleRow?.name}?` : `Reactivate ${toggleRow?.name}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {toggleRow?.active
                ? "Discontinued products cannot be added to new orders. Existing dispatch and ledger records remain untouched."
                : "This product will be available for new dispatch orders again."}
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
