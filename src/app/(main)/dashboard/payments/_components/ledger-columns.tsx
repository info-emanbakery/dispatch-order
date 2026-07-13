"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { LedgerEntry, LedgerEntryType } from "./types";

function EntryTypeBadge({ type }: { type: LedgerEntryType }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 border px-2 py-1 font-medium",
        type === "debit"
          ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
          : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
      )}
    >
      {type === "debit" ? (
        <ArrowUpCircle className="size-3 text-rose-500" />
      ) : (
        <ArrowDownCircle className="size-3 text-emerald-500" />
      )}
      {type === "debit" ? "Debit" : "Credit"}
    </Badge>
  );
}

export function buildLedgerColumns({ showSalesman }: { showSalesman: boolean }): ColumnDef<LedgerEntry>[] {
  const columns: ColumnDef<LedgerEntry>[] = [
    {
      id: "search",
      accessorFn: (row) => `${row.salesmanName} ${row.reference ?? ""} ${row.note ?? ""}`,
      filterFn: "includesString",
      enableHiding: true,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <div className="whitespace-nowrap text-sm">{format(new Date(row.original.createdAt), "dd MMM yyyy HH:mm")}</div>
      ),
    },
    ...(showSalesman
      ? [
          {
            id: "salesman",
            accessorFn: (row: LedgerEntry) => row.salesmanName,
            header: "Salesman",
            filterFn: (row: { original: LedgerEntry }, _id: string, value: string) =>
              value === "all" ? true : row.original.salesmanId === value,
            cell: ({ row }: { row: { original: LedgerEntry } }) => (
              <div className="text-sm">{row.original.salesmanName}</div>
            ),
          } satisfies ColumnDef<LedgerEntry>,
        ]
      : []),
    {
      accessorKey: "entryType",
      header: "Type",
      filterFn: (row, _id, value) => (value === "all" ? true : row.original.entryType === value),
      cell: ({ row }) => <EntryTypeBadge type={row.original.entryType} />,
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount (EGP)</div>,
      cell: ({ row }) => (
        <div
          className={cn(
            "text-right font-mono font-semibold text-sm tabular-nums",
            row.original.entryType === "debit"
              ? "text-rose-600 dark:text-rose-400"
              : "text-emerald-600 dark:text-emerald-400",
          )}
        >
          {row.original.entryType === "debit" ? "+" : "−"}
          {row.original.amount.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
        </div>
      ),
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: ({ row }) => (
        <span className="capitalize text-sm">
          {row.original.method ? (
            row.original.method.replace(/_/g, " ")
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </span>
      ),
    },
    {
      id: "dispatch",
      header: "Dispatch #",
      cell: ({ row }) => (
        <span className="font-mono text-muted-foreground text-sm">{row.original.dispatchOrderNumber ?? "—"}</span>
      ),
    },
    {
      accessorKey: "reference",
      header: "Reference",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.reference ?? <span className="text-muted-foreground">—</span>}</span>
      ),
    },
    {
      accessorKey: "note",
      header: "Note",
      cell: ({ row }) => (
        <span className="max-w-xs truncate text-muted-foreground text-sm">{row.original.note ?? "—"}</span>
      ),
    },
  ];
  return columns;
}
