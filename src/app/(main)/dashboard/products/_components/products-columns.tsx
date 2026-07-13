"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, PackageCheck, PackageX, Pencil } from "lucide-react";

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
}: {
  canEdit: boolean;
  onEdit: (product: ProductRow) => void;
  onToggleActive: (product: ProductRow) => void;
}): ColumnDef<ProductRow>[] {
  const columns: ColumnDef<ProductRow>[] = [
    {
      id: "search",
      accessorFn: (row) => `${row.name} ${row.sku ?? ""} ${row.barcode ?? ""}`,
      filterFn: "includesString",
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-foreground text-sm">{row.original.name}</div>
          {row.original.sku && <div className="text-muted-foreground text-xs">SKU: {row.original.sku}</div>}
        </div>
      ),
    },
    {
      accessorKey: "barcode",
      header: "Barcode",
      cell: ({ row }) => (
        <span className="font-mono text-sm">
          {row.original.barcode ?? <span className="text-muted-foreground">—</span>}
        </span>
      ),
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
