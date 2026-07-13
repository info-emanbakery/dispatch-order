"use client";

import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { SalesmanBalance } from "./types";

function StatCell({ label, value, className }: { label: string; value: number; className?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={cn("font-mono font-semibold text-sm tabular-nums", className)}>
        {value.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}

export function BalanceCards({
  balances,
  canCreate,
  onRecordPayment,
}: {
  balances: SalesmanBalance[];
  canCreate: boolean;
  onRecordPayment: (salesmanId: string) => void;
}) {
  const totalOutstanding = balances.reduce((s, b) => s + b.balance, 0);
  const totalDebits = balances.reduce((s, b) => s + b.totalDebits, 0);
  const totalCredits = balances.reduce((s, b) => s + b.totalCredits, 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-muted-foreground text-sm font-normal">
              <ArrowUpCircle className="size-4 text-rose-500" />
              Total Debits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono font-bold text-2xl text-rose-600 dark:text-rose-400">
              {totalDebits.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
              <span className="ml-1 font-normal text-muted-foreground text-sm">EGP</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-muted-foreground text-sm font-normal">
              <ArrowDownCircle className="size-4 text-emerald-500" />
              Total Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono font-bold text-2xl text-emerald-600 dark:text-emerald-400">
              {totalCredits.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
              <span className="ml-1 font-normal text-muted-foreground text-sm">EGP</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-muted-foreground text-sm font-normal">
              <CircleDollarSign className="size-4 text-amber-500" />
              Outstanding Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "font-mono font-bold text-2xl",
                totalOutstanding > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400",
              )}
            >
              {totalOutstanding.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
              <span className="ml-1 font-normal text-muted-foreground text-sm">EGP</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per-salesman balance list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Salesman Balances</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="divide-y divide-border/60">
            {balances.map((b) => (
              <div key={b.salesmanId} className="flex items-center gap-4 px-6 py-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{b.salesmanName}</span>
                    {!b.active && (
                      <span className="rounded-sm bg-muted px-1.5 py-0.5 text-muted-foreground text-xs">
                        Deactivated
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <StatCell label="Debits" value={b.totalDebits} className="text-rose-600 dark:text-rose-400" />
                  <StatCell label="Credits" value={b.totalCredits} className="text-emerald-600 dark:text-emerald-400" />
                  <Separator orientation="vertical" className="h-8" />
                  <StatCell
                    label="Balance"
                    value={b.balance}
                    className={b.balance > 0 ? "text-amber-600 dark:text-amber-400" : "text-foreground"}
                  />
                  {canCreate && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      onClick={() => onRecordPayment(b.salesmanId)}
                    >
                      <Plus className="size-3" />
                      Record Payment
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {balances.length === 0 && (
              <div className="px-6 py-8 text-center text-muted-foreground text-sm">
                No ledger data yet. Balances will appear once dispatch orders are submitted.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
