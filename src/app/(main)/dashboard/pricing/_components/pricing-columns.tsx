"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import type { PriceRow, PriceStatus } from "./types";

function StatusBadge({ status }: { status: PriceStatus }) {
  const map: Record<PriceStatus, { label: string; className: string; dotClass: string }> = {
    active: {
      label: "Active",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
      dotClass: "bg-emerald-500",
    },
    scheduled: {
      label: "Scheduled",
      className:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300",
      dotClass: "bg-blue-500",
    },
    expired: {
      label: "Expired",
      className:
        "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-400",
      dotClass: "bg-zinc-400",
    },
  };
  const { label, className, dotClass } = map[status];
  return (
    <Badge variant="outline" className={cn("gap-1.5 border px-2 py-1 font-medium", className)}>
      <span className={cn("size-1.5 rounded-full", dotClass)} />
      {label}
    </Badge>
  );
}

export function buildPricingColumns({
  canEdit,
  onEdit,
}: {
  canEdit: boolean;
  onEdit: (row: PriceRow) => void;
}): ColumnDef<PriceRow>[] {
  const columns: ColumnDef<PriceRow>[] = [
    {
      id: "search",
      accessorFn: (row) => `${row.salesmanName} ${row.productName}`,
      filterFn: "includesString",
      enableHiding: true,
    },
    {
      id: "salesman",
      accessorFn: (row) => row.salesmanName,
      header: "Salesman",
      filterFn: (row, _id, value) => (value === "all" ? true : row.original.salesmanId === value),
      cell: ({ row }) => <div className="font-medium text-sm">{row.original.salesmanName}</div>,
    },
    {
      id: "product",
      accessorFn: (row) => row.productName,
      header: "Product",
      cell: ({ row }) => <div className="text-sm">{row.original.productName}</div>,
    },
    {
      accessorKey: "price",
      header: "Price (EGP)",
      cell: ({ row }) => (
        <div className="font-mono font-semibold text-sm">
          {row.original.price.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
        </div>
      ),
    },
    {
      accessorKey: "validFrom",
      header: "Valid From",
      cell: ({ row }) => <div className="text-sm">{format(new Date(row.original.validFrom), "dd MMM yyyy")}</div>,
    },
    {
      accessorKey: "validTo",
      header: "Valid To",
      cell: ({ row }) => (
        <div className="text-muted-foreground text-sm">
          {row.original.validTo ? format(new Date(row.original.validTo), "dd MMM yyyy") : "Open-ended"}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: (row, _id, value) => (value === "all" ? true : row.original.status === value),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
  ];

  if (canEdit) {
    columns.push({
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label={`Edit price for ${row.original.salesmanName} – ${row.original.productName}`}
                className="size-8 rounded-md text-muted-foreground hover:bg-muted/50"
                size="icon-sm"
                variant="ghost"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => onEdit(row.original)}>
                <Pencil />
                Edit price
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      enableHiding: false,
      enableSorting: false,
    });
  }

  return columns;
}
