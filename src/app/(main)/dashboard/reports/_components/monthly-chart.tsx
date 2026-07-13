"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import type { MonthlyPoint } from "./types";

function formatEGP(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value.toFixed(0);
}

export function MonthlyChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Monthly Dispatch vs Payments (EGP)</CardTitle>
        <CardDescription>Last 12 months. Dispatched = debits; Collected = credits.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} className="stroke-border/50" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickFormatter={formatEGP}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              width={44}
            />
            <Tooltip
              formatter={(value) => [`EGP ${Number(value).toLocaleString("en-EG", { minimumFractionDigits: 2 })}`]}
              labelFormatter={(label) => String(label)}
              contentStyle={{
                borderRadius: "0.5rem",
                fontSize: "0.8125rem",
              }}
            />
            <Legend
              formatter={(v) => (v === "dispatched" ? "Dispatched" : "Collected")}
              iconType="square"
              iconSize={10}
            />
            <Bar dataKey="dispatched" fill="hsl(var(--chart-1, 220 70% 50%))" radius={[4, 4, 0, 0]} maxBarSize={36} />
            <Bar dataKey="collected" fill="hsl(var(--chart-2, 160 60% 45%))" radius={[4, 4, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
