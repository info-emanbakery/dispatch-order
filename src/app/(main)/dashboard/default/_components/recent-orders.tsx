import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  draft: "secondary",
  submitted: "default",
  delivered: "outline",
  returned: "destructive",
  cancelled: "destructive",
};

const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  delivered: "Delivered",
  returned: "Returned",
  cancelled: "Cancelled",
};

interface Order {
  id: string;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
  salesman_name: string;
}

interface Props {
  orders: Order[];
}

export function RecentOrders({ orders }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Last {orders.length} dispatch orders</CardDescription>
        </div>
        <Link
          href="/dashboard/dispatch"
          className="text-muted-foreground text-xs transition-colors hover:text-foreground"
        >
          View all →
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {orders.length === 0 ? (
          <p className="px-6 py-8 text-center text-muted-foreground text-sm">No orders yet.</p>
        ) : (
          <div className="divide-y">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-6 py-3 gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm leading-none">{order.order_number}</p>
                  <p className="mt-1 truncate text-muted-foreground text-xs">{order.salesman_name}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-medium text-sm tabular-nums">
                    {order.total.toLocaleString("en-EG", { minimumFractionDigits: 2 })} EGP
                  </span>
                  <Badge variant={STATUS_VARIANT[order.status] ?? "secondary"} className="text-xs">
                    {STATUS_LABEL[order.status] ?? order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
