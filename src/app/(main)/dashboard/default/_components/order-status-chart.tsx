"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATUS_META: Record<string, { label: string; color: string }> = {
  draft: { label: "Draft", color: "#94a3b8" },
  submitted: { label: "Submitted", color: "#3b82f6" },
  delivered: { label: "Delivered", color: "#22c55e" },
  returned: { label: "Returned", color: "#f97316" },
  cancelled: { label: "Cancelled", color: "#ef4444" },
};

interface Props {
  data: Record<string, number>;
}

export function OrderStatusChart({ data }: Props) {
  const chartData = Object.entries(data)
    .sort(([a], [b]) => {
      const order = ["draft", "submitted", "delivered", "returned", "cancelled"];
      return order.indexOf(a) - order.indexOf(b);
    })
    .map(([status, count]) => ({
      name: STATUS_META[status]?.label ?? status,
      count,
      color: STATUS_META[status]?.color ?? "#94a3b8",
    }));

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Orders by Status</CardTitle>
          <CardDescription>No orders yet</CardDescription>
        </CardHeader>
        <CardContent className="flex h-40 items-center justify-center text-muted-foreground text-sm">
          No dispatch orders found.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders by Status</CardTitle>
        <CardDescription>All-time breakdown across all salesmen</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                fontSize: "12px",
              }}
              formatter={(value) => [value, "Orders"]}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={56}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {chartData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-1.5 text-xs">
              <span
                className="inline-block size-2.5 shrink-0 rounded-sm"
                style={{ background: entry.color }}
              />
              <span className="text-muted-foreground">
                {entry.name}: <span className="font-medium text-foreground">{entry.count}</span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
