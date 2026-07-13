import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { SalesmanPerf } from "./types";

function Num({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {value.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
    </span>
  );
}

export function SalesmanPerfTable({ rows }: { rows: SalesmanPerf[] }) {
  const sorted = [...rows].sort((a, b) => b.balance - a.balance);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Salesman Performance</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
          <TableHeader>
            <TableRow>
              <TableHead>Salesman</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Dispatched (EGP)</TableHead>
              <TableHead className="text-right">Collected (EGP)</TableHead>
              <TableHead className="text-right">Balance (EGP)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((row) => (
              <TableRow key={row.salesmanId} className="border-border/60">
                <TableCell>
                  <span className={cn("font-medium text-sm", !row.active && "text-muted-foreground line-through")}>
                    {row.salesmanName}
                  </span>
                  {!row.active && (
                    <span className="ml-2 rounded-sm bg-muted px-1.5 py-0.5 text-muted-foreground text-xs">
                      inactive
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right text-sm">{row.ordersCount}</TableCell>
                <TableCell className="text-right text-sm">
                  <Num value={row.dispatchedValue} className="text-rose-600 dark:text-rose-400" />
                </TableCell>
                <TableCell className="text-right text-sm">
                  <Num value={row.collectedValue} className="text-emerald-600 dark:text-emerald-400" />
                </TableCell>
                <TableCell className="text-right text-sm">
                  <Num
                    value={row.balance}
                    className={row.balance > 0 ? "text-amber-600 dark:text-amber-400 font-semibold" : ""}
                  />
                </TableCell>
              </TableRow>
            ))}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No data available yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
