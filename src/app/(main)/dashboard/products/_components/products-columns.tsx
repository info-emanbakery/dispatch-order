"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, PackageCheck, PackageX, Pencil, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import type { ProductRow } from "./types";

const CATEGORY_COLORS: Record<string, string> = {
  Chapathi: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
  Shami: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/20",
  Labanani: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20",
  Samooli: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20",
  Felafil: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
  "Abu Navas": "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-500/10 dark:text-pink-300 dark:border-pink-500/20",
  Burger: "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20",
  Hub: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/20",
};

function CategoryBadge({ category }: { category: string | null }) {
  if (!category) return <span className="text-muted-foreground">—</span>;
  const cls = CATEGORY_COLORS[category] ?? "bg-zinc-50 text-zinc-700 border-zinc-200";
  return (
    <Badge variant="outline" className={cn("border px-2 py-0.5 text-xs font-medium", cls)}>
      {category}
    </Badge>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 border px-2 py-1 font-medium",
        active
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
          : "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-400",
      )}
    >
      <span className={cn("size-1.5 rounded-full", active ? "bg-emerald-500" : "bg-zinc-400")} />
      {active ? "Active" : "Discontinued"}
    </Badge>
  );
}

export function buildProductsColumns({
  canEdit,
  onEdit,
  onToggleActive,
  onViewPrices,
}: {
  canEdit: boolean;
  onEdit: (product: ProductRow) => void;
  onToggleActive: (product: ProductRow) => void;
  onViewPrices: (product: ProductRow) => void;
}): ColumnDef<ProductRow>[] {
  const columns: ColumnDef<ProductRow>[] = [
    {
      id: "search",
      accessorFn: (row) => `${row.name} ${row.code ?? ""} ${row.sku ?? ""} ${row.barcode ?? ""} ${row.category ?? ""}`,
      filterFn: "includesString",
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-foreground text-sm">{row.original.name}</div>
          <div className="flex items-center gap-1.5">
            {row.original.code && (
              <span className="font-mono text-muted-foreground text-xs">{row.original.code}</span>
            )}
            {row.original.sku && row.original.sku !== row.original.code && (
              <span className="text-muted-foreground text-xs">· {row.original.sku}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      filterFn: (row, _id, value) => value === "All" || row.original.category === value,
      cell: ({ row }) => <CategoryBadge category={row.original.category} />,
    },
    {
      accessorKey: "unit",
      header: "Unit",
      cell: ({ row }) => <Badge variant="secondary">{row.original.unit}</Badge>,
    },
    {
      accessorKey: "active",
      header: "Status",
      filterFn: (row, _id, value) => (value === "Active" ? row.original.active : !row.original.active),
      cell: ({ row }) => <StatusBadge active={row.original.active} />,
    },
    {
      id: "createdAt",
      accessorFn: (row) => new Date(row.createdAt).getTime(),
      header: "Created",
      cell: ({ row }) => (
        <div className="text-foreground text-sm">{format(new Date(row.original.createdAt), "dd MMM yyyy")}</div>
      ),
    },
    {
      id: "prices",
      header: "",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => onViewPrices(row.original)}
        >
          <Tag className="size-3" />
          Prices
        </Button>
      ),
      enableHiding: false,
      enableSorting: false,
    },
  ];

  if (canEdit) {
    columns.push({
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label={`Open actions for ${p.name}`}
                  className="size-8 rounded-md text-muted-foreground hover:bg-muted/50"
                  size="icon-sm"
                  variant="ghost"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onEdit(p)}>
                  <Pencil />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {p.active ? (
                  <DropdownMenuItem variant="destructive" onSelect={() => onToggleActive(p)}>
                    <PackageX />
                    Discontinue
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onSelect={() => onToggleActive(p)}>
                    <PackageCheck />
                    Reactivate
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      enableHiding: false,
      enableSorting: false,
    });
  }

  return columns;
}
