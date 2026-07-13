"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Loader2,
  MoreHorizontal,
  PackageCheck,
  Undo2,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import type { DispatchOrderRow, DispatchStatus } from "./types";
import { DISPATCH_STATUS_LABELS } from "./types";

const STATUS_CONFIG: Record<
  DispatchStatus,
  { icon: React.ComponentType<{ className?: string }>; className: string; dotClass: string }
> = {
  draft: {
    icon: CircleDashed,
    className:
      "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-400",
    dotClass: "bg-zinc-400",
  },
  submitted: {
    icon: Loader2,
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300",
    dotClass: "bg-blue-500",
  },
  delivered: {
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
    dotClass: "bg-emerald-500",
  },
  partial: {
    icon: PackageCheck,
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300",
    dotClass: "bg-amber-500",
  },
  returned: {
    icon: Undo2,
    className:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300",
    dotClass: "bg-orange-500",
  },
  cancelled: {
    icon: XCircle,
    className: "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300",
    dotClass: "bg-red-500",
  },
};

function StatusBadge({ status }: { status: DispatchStatus }) {
  const { className, dotClass } = STATUS_CONFIG[status];
  return (
    <Badge variant="outline" className={cn("gap-1.5 border px-2 py-1 font-medium", className)}>
      <span className={cn("size-1.5 rounded-full", dotClass)} />
      {DISPATCH_STATUS_LABELS[status]}
    </Badge>
  );
}

export function buildDispatchColumns({
  canEdit,
  onView,
  onSubmit,
  onAdvance,
}: {
  canEdit: boolean;
  onView: (row: DispatchOrderRow) => void;
  onSubmit: (row: DispatchOrderRow) => void;
  onAdvance: (row: DispatchOrderRow, newStatus: "delivered" | "partial" | "returned" | "cancelled") => void;
}): ColumnDef<DispatchOrderRow>[] {
  const columns: ColumnDef<DispatchOrderRow>[] = [
    {
      id: "search",
      accessorFn: (row) => `${row.orderNumber} ${row.salesmanName}`,
      filterFn: "includesString",
      enableHiding: true,
    },
    {
      accessorKey: "orderNumber",
      header: "Order #",
      cell: ({ row }) => (
        <button
          type="button"
          className="font-mono font-semibold text-sm text-primary hover:underline"
          onClick={() => onView(row.original)}
        >
          {row.original.orderNumber}
        </button>
      ),
    },
    {
      id: "salesman",
      accessorFn: (row) => row.salesmanName,
      header: "Salesman",
      filterFn: (row, _id, value) => (value === "all" ? true : row.original.salesmanId === value),
      cell: ({ row }) => <div className="text-sm">{row.original.salesmanName}</div>,
    },
    {
      accessorKey: "orderDate",
      header: "Date",
      cell: ({ row }) => <div className="text-sm">{format(new Date(row.original.orderDate), "dd MMM yyyy")}</div>,
    },
    {
      accessorKey: "itemCount",
      header: "Items",
      cell: ({ row }) => <div className="text-center text-sm tabular-nums">{row.original.itemCount}</div>,
    },
    {
      accessorKey: "total",
      header: () => <div className="text-right">Total (EGP)</div>,
      cell: ({ row }) => (
        <div className="text-right font-mono text-sm">
          {row.original.total.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
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
      cell: ({ row }) => {
        const o = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label={`Actions for ${o.orderNumber}`}
                  className="size-8 rounded-md text-muted-foreground hover:bg-muted/50"
                  size="icon-sm"
                  variant="ghost"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs">Order {o.orderNumber}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => onView(o)}>
                  <ChevronRight />
                  View / edit items
                </DropdownMenuItem>
                {o.status === "draft" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => onSubmit(o)}>
                      <CheckCircle2 />
                      Submit order
                    </DropdownMenuItem>
                  </>
                )}
                {o.status === "submitted" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => onAdvance(o, "delivered")}>
                      <CheckCircle2 />
                      Mark Delivered
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onAdvance(o, "partial")}>
                      <PackageCheck />
                      Mark Partial
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onAdvance(o, "returned")}>
                      <Undo2 />
                      Mark Returned
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onSelect={() => onAdvance(o, "cancelled")}>
                      <XCircle />
                      Cancel
                    </DropdownMenuItem>
                  </>
                )}
                {o.status === "partial" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => onAdvance(o, "delivered")}>
                      <CheckCircle2 />
                      Mark Delivered
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onAdvance(o, "returned")}>
                      <Undo2 />
                      Mark Returned
                    </DropdownMenuItem>
                  </>
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
