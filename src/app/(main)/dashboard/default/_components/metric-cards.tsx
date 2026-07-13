import { ClipboardList, Coins, TrendingUp, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  totalOrders: number;
  totalRevenue: number;
  activeSalesmen: number;
  pendingOrders: number;
}

export function MetricCards({ totalOrders, totalRevenue, activeSalesmen, pendingOrders }: Props) {
  const formattedRevenue = totalRevenue.toLocaleString("en-EG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4 md:gap-4">
      <Card className="bg-linear-to-t from-primary/5 to-card shadow-xs dark:bg-card">
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <ClipboardList className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total Orders</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="font-medium text-2xl tabular-nums leading-none tracking-tight md:text-3xl">
            {totalOrders.toLocaleString()}
          </div>
          <p className="text-muted-foreground text-xs">All-time dispatch orders</p>
        </CardContent>
      </Card>

      <Card className="bg-linear-to-t from-primary/5 to-card shadow-xs dark:bg-card">
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Coins className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Revenue</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="font-medium text-2xl tabular-nums leading-none tracking-tight md:text-3xl">
            {formattedRevenue}
          </div>
          <p className="text-muted-foreground text-xs">EGP · submitted &amp; delivered</p>
        </CardContent>
      </Card>

      <Card className="bg-linear-to-t from-primary/5 to-card shadow-xs dark:bg-card">
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Users className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Active Salesmen</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="font-medium text-2xl tabular-nums leading-none tracking-tight md:text-3xl">
            {activeSalesmen.toLocaleString()}
          </div>
          <p className="text-muted-foreground text-xs">Currently active in the field</p>
        </CardContent>
      </Card>

      <Card className="bg-linear-to-t from-primary/5 to-card shadow-xs dark:bg-card">
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <TrendingUp className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Pending</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-2xl tabular-nums leading-none tracking-tight md:text-3xl">
              {pendingOrders.toLocaleString()}
            </div>
            {pendingOrders > 0 && (
              <Badge variant="destructive" className="text-xs">
                Needs action
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-xs">Draft + submitted orders</p>
        </CardContent>
      </Card>
    </div>
  );
}
