import { type NextRequest, NextResponse } from "next/server";

import { requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

function toCsv(headers: string[], rows: (string | number | null | undefined)[][]): string {
  const csvEscape = (v: string | number | null | undefined) => {
    if (v == null) return "";
    const s = String(v);
    if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [headers.join(","), ...rows.map((r) => r.map(csvEscape).join(","))];
  return lines.join("\r\n");
}

export async function GET(request: NextRequest) {
  try {
    await requirePermission("reports", "view");
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const type = request.nextUrl.searchParams.get("type");
  const supabase = await createClient();

  if (type === "ledger") {
    const { data, error } = await supabase
      .from("ledger_entries")
      .select(
        "id, created_at, salesman_id, entry_type, amount, method, reference, note, dispatch_order_id, salesmen(name)",
      )
      .order("created_at", { ascending: false });

    if (error) return new NextResponse(error.message, { status: 500 });

    const rows = (data ?? []).map((r) => {
      const sm = r.salesmen as unknown as { name: string } | null | undefined;
      return [
        r.id,
        r.created_at,
        // biome-ignore lint/suspicious/noUnnecessaryConditions: supabase join may return null
        sm?.name ?? "",
        r.entry_type,
        r.amount,
        r.method ?? "",
        r.reference ?? "",
        r.note ?? "",
        r.dispatch_order_id ?? "",
      ];
    });

    const csv = toCsv(
      ["id", "created_at", "salesman", "type", "amount", "method", "reference", "note", "dispatch_order_id"],
      rows,
    );

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="ledger-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  if (type === "orders") {
    const { data, error } = await supabase
      .from("dispatch_orders")
      .select("id, order_number, order_date, status, total_amount, qty_returned, notes, created_at, salesmen(name)")
      .order("order_date", { ascending: false });

    if (error) return new NextResponse(error.message, { status: 500 });

    const rows = (data ?? []).map((r) => {
      const sm = r.salesmen as unknown as { name: string } | null | undefined;
      return [
        r.id,
        r.order_number,
        r.order_date,
        // biome-ignore lint/suspicious/noUnnecessaryConditions: supabase join may return null
        sm?.name ?? "",
        r.status,
        r.total_amount,
        r.qty_returned ?? 0,
        r.notes ?? "",
        r.created_at,
      ];
    });

    const csv = toCsv(
      ["id", "order_number", "order_date", "salesman", "status", "total_amount", "qty_returned", "notes", "created_at"],
      rows,
    );

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="orders-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return new NextResponse("type must be 'ledger' or 'orders'", { status: 400 });
}
