import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign, ClipboardList } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { ReportKpis } from "./types";

function KpiCard({
  title,
  value,
  unit,
  icon: Icon,
  colorClass,
}: {
  title: string;
  value: number;
  unit?: string;
  icon: React.ElementType;
  colorClass: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-muted-foreground text-sm font-normal">
          <Icon className={`size-4 ${colorClass}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`font-mono font-bold text-2xl ${colorClass}`}>
          {typeof value === "number" && unit === undefined
            ? value.toLocaleString("en-EG")
            : value.toLocaleString("en-EG", { minimumFractionDigits: 2 })}
          {unit && <span className="ml-1 font-normal text-muted-foreground text-sm">{unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

export function KpiStrip({ kpis }: { kpis: ReportKpis }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <KpiCard
        title="Total Orders"
        value={kpis.totalOrders}
        icon={ClipboardList}
        colorClass="text-blue-600 dark:text-blue-400"
      />
      <KpiCard
        title="Total Dispatched"
        value={kpis.totalDispatchedValue}
        unit="EGP"
        icon={ArrowUpCircle}
        colorClass="text-rose-600 dark:text-rose-400"
      />
      <KpiCard
        title="Total Collected"
        value={kpis.totalPaymentsCollected}
        unit="EGP"
        icon={ArrowDownCircle}
        colorClass="text-emerald-600 dark:text-emerald-400"
      />
      <KpiCard
        title="Outstanding Balance"
        value={kpis.totalOutstandingBalance}
        unit="EGP"
        icon={CircleDollarSign}
        colorClass={
          kpis.totalOutstandingBalance > 0
            ? "text-amber-600 dark:text-amber-400"
            : "text-emerald-600 dark:text-emerald-400"
        }
      />
    </div>
  );
}
