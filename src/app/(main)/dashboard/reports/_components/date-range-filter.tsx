"use client";

import * as React from "react";

import { format, startOfMonth, startOfYear, subMonths } from "date-fns";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PRESETS = [
  {
    label: "This month",
    from: () => format(startOfMonth(new Date()), "yyyy-MM-dd"),
    to: () => format(new Date(), "yyyy-MM-dd"),
  },
  {
    label: "Last 3 months",
    from: () => format(subMonths(new Date(), 3), "yyyy-MM-dd"),
    to: () => format(new Date(), "yyyy-MM-dd"),
  },
  {
    label: "This year",
    from: () => format(startOfYear(new Date()), "yyyy-MM-dd"),
    to: () => format(new Date(), "yyyy-MM-dd"),
  },
  {
    label: "All time",
    from: () => "2000-01-01",
    to: () => format(new Date(), "yyyy-MM-dd"),
  },
];

export function DateRangeFilter({ from, to }: { from: string; to: string }) {
  const router = useRouter();
  const pathname = usePathname();

  function apply(newFrom: string, newTo: string) {
    if (!newFrom || !newTo) return;
    const p = new URLSearchParams({ from: newFrom, to: newTo });
    router.push(`${pathname}?${p.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map((p) => {
        const pFrom = p.from();
        const pTo = p.to();
        const isActive = from === pFrom && to === pTo;
        return (
          <Button
            key={p.label}
            size="sm"
            variant={isActive ? "default" : "outline"}
            className={cn("h-7 px-2.5 text-xs", !isActive && "text-muted-foreground")}
            onClick={() => apply(pFrom, pTo)}
          >
            {p.label}
          </Button>
        );
      })}
      <div className="flex items-center gap-1.5">
        <Input
          type="date"
          className="h-7 w-32 text-xs"
          value={from}
          max={to}
          onChange={(e) => { if (e.target.value) apply(e.target.value, to); }}
        />
        <span className="text-muted-foreground text-xs">–</span>
        <Input
          type="date"
          className="h-7 w-32 text-xs"
          value={to}
          min={from}
          onChange={(e) => { if (e.target.value) apply(from, e.target.value); }}
        />
      </div>
    </div>
  );
}
