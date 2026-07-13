"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Pencil, UserCheck, UserX } from "lucide-react";

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

import type { SalesmanRow } from "./types";

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
      {active ? "Active" : "Deactivated"}
    </Badge>
  );
}

export function buildSalesmenColumns({
  canEdit,
  onEdit,
  onToggleActive,
}: {
  canEdit: boolean;
  onEdit: (salesman: SalesmanRow) => void;
  onToggleActive: (salesman: SalesmanRow) => void;
}): ColumnDef<SalesmanRow>[] {
  const columns: ColumnDef<SalesmanRow>[] = [
    {
      id: "search",
      accessorFn: (row) => `${row.name} ${row.code ?? ""} ${row.area ?? ""}`,
      filterFn: "includesString",
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: "Salesman",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-foreground text-sm">{row.original.name}</div>
          {row.original.code && <div className="text-muted-foreground text-xs">{row.original.code}</div>}
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.phone ?? <span className="text-muted-foreground">—</span>}</span>
      ),
    },
    {
      accessorKey: "area",
      header: "Area",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.area ?? <span className="text-muted-foreground">—</span>}</span>
      ),
    },
    {
      accessorKey: "active",
      header: "Status",
      filterFn: (row, _id, value) => (value === "Active" ? row.original.active : !row.original.active),
      cell: ({ row }) => <StatusBadge active={row.original.active} />,
    },
    {
      accessorKey: "balance",
      header: () => <div className="text-right">Outstanding (EGP)</div>,
      cell: ({ row }) => {
        const bal = row.original.balance;
        return (
          <div
            className={cn(
              "text-right font-mono text-sm tabular-nums",
              bal > 0
                ? "font-semibold text-amber-600 dark:text-amber-400"
                : "text-muted-foreground",
            )}
          >
            {bal.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
          </div>
        );
      },
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
        const s = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label={`Open actions for ${s.name}`}
                  className="size-8 rounded-md text-muted-foreground hover:bg-muted/50"
                  size="icon-sm"
                  variant="ghost"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onEdit(s)}>
                  <Pencil />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {s.active ? (
                  <DropdownMenuItem variant="destructive" onSelect={() => onToggleActive(s)}>
                    <UserX />
                    Deactivate
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onSelect={() => onToggleActive(s)}>
                    <UserCheck />
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
