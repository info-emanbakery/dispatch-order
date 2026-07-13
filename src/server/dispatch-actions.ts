"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { requirePermission } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/supabase/admin";

type ActionResult = { success: true } | { success: false; error: string };

// ── Create draft order (header only — items added separately) ─────────────────
const createOrderSchema = z.object({
  salesmanId: z.uuid(),
  orderDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().trim().max(1000).optional(),
});

export async function createDispatchOrderAction(
  input: z.infer<typeof createOrderSchema>,
): Promise<ActionResult & { orderId?: string }> {
  try {
    const session = await requirePermission("dispatch", "create");
    const data = createOrderSchema.parse(input);
    const supabase = createAdminClient();

    const { data: row, error } = await supabase
      .from("dispatch_orders")
      .insert({
        salesman_id: data.salesmanId,
        order_date: data.orderDate,
        notes: data.notes ?? null,
        created_by: session.userId,
        status: "draft",
        total: 0,
      })
      .select("id")
      .single();

    if (error) return { success: false, error: error.message };
    revalidatePath("/dashboard/dispatch");
    return { success: true, orderId: row.id as string };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ── Update order header (draft only) ─────────────────────────────────────────
const updateOrderSchema = z.object({
  orderId: z.uuid(),
  salesmanId: z.uuid(),
  orderDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().trim().max(1000).optional(),
});

export async function updateDispatchOrderAction(input: z.infer<typeof updateOrderSchema>): Promise<ActionResult> {
  try {
    await requirePermission("dispatch", "edit");
    const data = updateOrderSchema.parse(input);
    const supabase = createAdminClient();

    const { data: existing } = await supabase.from("dispatch_orders").select("status").eq("id", data.orderId).single();
    if (!existing) return { success: false, error: "Order not found." };
    if ((existing.status as string) !== "draft") return { success: false, error: "Only draft orders can be edited." };

    const { error } = await supabase
      .from("dispatch_orders")
      .update({ salesman_id: data.salesmanId, order_date: data.orderDate, notes: data.notes ?? null })
      .eq("id", data.orderId);

    if (error) return { success: false, error: error.message };
    revalidatePath("/dashboard/dispatch");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ── Upsert line item (draft only) ─────────────────────────────────────────────
// SECURITY: unit_price is fetched server-side from salesman_prices — never trusted from client.
const upsertItemSchema = z.object({
  orderId: z.uuid(),
  productId: z.uuid(),
  quantity: z.number().int().positive(),
});

export async function upsertOrderItemAction(input: z.infer<typeof upsertItemSchema>): Promise<ActionResult> {
  try {
    await requirePermission("dispatch", "edit");
    const data = upsertItemSchema.parse(input);
    const supabase = createAdminClient();
    const todayStr = new Date().toISOString().slice(0, 10);

    // Fetch order status and salesman
    const { data: order } = await supabase
      .from("dispatch_orders")
      .select("status, salesman_id")
      .eq("id", data.orderId)
      .single();
    if (!order) return { success: false, error: "Order not found." };
    if ((order.status as string) !== "draft") return { success: false, error: "Only draft orders can be modified." };

    // Fetch the canonical price from salesman_prices — never trust client-supplied price
    const { data: priceRow } = await supabase
      .from("salesman_prices")
      .select("price")
      .eq("salesman_id", order.salesman_id)
      .eq("product_id", data.productId)
      .is("valid_to", null)
      .lte("valid_from", todayStr)
      .order("valid_from", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!priceRow) {
      return {
        success: false,
        error: "No active price for this product and salesman. Set a price in the Pricing module first.",
      };
    }

    // Upsert line item with the server-authorised price
    const { error } = await supabase.from("dispatch_items").upsert(
      {
        dispatch_order_id: data.orderId,
        product_id: data.productId,
        quantity: data.quantity,
        unit_price: priceRow.price,
      },
      { onConflict: "dispatch_order_id,product_id" },
    );
    if (error) return { success: false, error: error.message };

    await recalcTotal(supabase, data.orderId);
    revalidatePath("/dashboard/dispatch");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ── Remove line item (draft only) ────────────────────────────────────────────
const removeItemSchema = z.object({ itemId: z.uuid(), orderId: z.uuid() });

export async function removeOrderItemAction(input: z.infer<typeof removeItemSchema>): Promise<ActionResult> {
  try {
    await requirePermission("dispatch", "edit");
    const data = removeItemSchema.parse(input);
    const supabase = createAdminClient();

    const { data: order } = await supabase.from("dispatch_orders").select("status").eq("id", data.orderId).single();
    if (!order) return { success: false, error: "Order not found." };
    if ((order.status as string) !== "draft") return { success: false, error: "Only draft orders can be modified." };

    const { error } = await supabase.from("dispatch_items").delete().eq("id", data.itemId);
    if (error) return { success: false, error: error.message };
    await recalcTotal(supabase, data.orderId);
    revalidatePath("/dashboard/dispatch");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ── Submit order (draft → submitted) ─────────────────────────────────────────
// Financial integrity: ledger debit is inserted BEFORE status is flipped.
// If the ledger insert fails the order stays draft and can be retried.
// The status update uses a conditional filter (.eq status = draft) to prevent
// double-submit from creating two debit entries.
export async function submitOrderAction(orderId: string): Promise<ActionResult> {
  try {
    const session = await requirePermission("dispatch", "edit");
    if (!z.uuid().safeParse(orderId).success) return { success: false, error: "Invalid order ID." };
    const supabase = createAdminClient();

    // Fetch order in one query (status + financial fields + items count)
    const { data: order } = await supabase
      .from("dispatch_orders")
      .select("status, salesman_id, total, created_by, dispatch_items(id)")
      .eq("id", orderId)
      .single();
    if (!order) return { success: false, error: "Order not found." };
    if ((order.status as string) !== "draft") return { success: false, error: "Only draft orders can be submitted." };
    const items = order.dispatch_items as { id: string }[];
    if (!items || items.length === 0) {
      return { success: false, error: "Cannot submit an empty order. Add at least one product line." };
    }

    // 1. Insert ledger debit FIRST — if this fails the order stays draft (safe to retry)
    const { error: ledgerErr } = await supabase.from("ledger_entries").insert({
      salesman_id: order.salesman_id,
      entry_type: "debit",
      amount: order.total,
      dispatch_order_id: orderId,
      note: "Dispatch order submitted",
      created_by: order.created_by ?? session.userId,
    });
    if (ledgerErr) return { success: false, error: `Failed to record ledger entry: ${ledgerErr.message}` };

    // 2. Flip status only if still draft (prevents double-submit race creating duplicate debits)
    const { data: updated, error: statusErr } = await supabase
      .from("dispatch_orders")
      .update({ status: "submitted" })
      .eq("id", orderId)
      .eq("status", "draft")
      .select("id")
      .maybeSingle();

    if (statusErr) return { success: false, error: statusErr.message };
    if (!updated) {
      // Status was already changed by a concurrent request — our ledger entry is a duplicate.
      // Roll it back by deleting the entry we just inserted (best-effort cleanup).
      await supabase
        .from("ledger_entries")
        .delete()
        .eq("dispatch_order_id", orderId)
        .eq("entry_type", "debit")
        .eq("note", "Dispatch order submitted")
        .eq("salesman_id", order.salesman_id)
        .eq("amount", order.total);
      return { success: false, error: "Order was already submitted by another session." };
    }

    revalidatePath("/dashboard/dispatch");
    revalidatePath("/dashboard/payments");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ── Advance order status ──────────────────────────────────────────────────────
// Financial integrity: cancelled and returned orders get a compensating credit
// entry to reverse the debit that was created on submission.
const VALID_TRANSITIONS: Record<string, string[]> = {
  submitted: ["delivered", "partial", "returned", "cancelled"],
  partial: ["delivered", "returned"],
  delivered: [],
  returned: [],
  cancelled: [],
};

const advanceSchema = z.object({
  orderId: z.uuid(),
  newStatus: z.enum(["delivered", "partial", "returned", "cancelled"]),
});

export async function advanceOrderStatusAction(input: z.infer<typeof advanceSchema>): Promise<ActionResult> {
  try {
    const session = await requirePermission("dispatch", "edit");
    const data = advanceSchema.parse(input);
    const supabase = createAdminClient();

    const { data: order } = await supabase
      .from("dispatch_orders")
      .select("status, salesman_id, total, created_by")
      .eq("id", data.orderId)
      .single();
    if (!order) return { success: false, error: "Order not found." };
    const allowed = VALID_TRANSITIONS[order.status as string] ?? [];
    if (!allowed.includes(data.newStatus)) {
      return { success: false, error: `Cannot transition from '${order.status}' to '${data.newStatus}'.` };
    }

    // Insert a compensating ledger credit when an order is reversed
    if (data.newStatus === "cancelled" || data.newStatus === "returned") {
      const { error: ledgerErr } = await supabase.from("ledger_entries").insert({
        salesman_id: order.salesman_id,
        entry_type: "credit",
        amount: order.total,
        dispatch_order_id: data.orderId,
        note: `Order ${data.newStatus}`,
        created_by: order.created_by ?? session.userId,
      });
      if (ledgerErr) {
        return { success: false, error: `Failed to record reversal ledger entry: ${ledgerErr.message}` };
      }
    }

    const { error } = await supabase
      .from("dispatch_orders")
      .update({ status: data.newStatus })
      .eq("id", data.orderId);
    if (error) return { success: false, error: error.message };

    revalidatePath("/dashboard/dispatch");
    revalidatePath("/dashboard/payments");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ── Update returned quantity ──────────────────────────────────────────────────
const updateReturnSchema = z.object({
  itemId: z.uuid(),
  orderId: z.uuid(),
  qtyReturned: z.number().int().min(0),
});

export async function updateReturnedQtyAction(input: z.infer<typeof updateReturnSchema>): Promise<ActionResult> {
  try {
    await requirePermission("dispatch", "edit");
    const data = updateReturnSchema.parse(input);
    const supabase = createAdminClient();

    const { data: order } = await supabase.from("dispatch_orders").select("status").eq("id", data.orderId).single();
    if (!order) return { success: false, error: "Order not found." };
    if (!["submitted", "partial"].includes(order.status as string)) {
      return { success: false, error: "Return quantities can only be set on submitted or partial orders." };
    }

    // Validate returned qty does not exceed dispatched qty
    const { data: item } = await supabase
      .from("dispatch_items")
      .select("quantity")
      .eq("id", data.itemId)
      .eq("dispatch_order_id", data.orderId)
      .single();
    if (!item) return { success: false, error: "Item not found on this order." };
    if (data.qtyReturned > (item.quantity as number)) {
      return {
        success: false,
        error: `Returned quantity (${data.qtyReturned}) cannot exceed dispatched quantity (${item.quantity}).`,
      };
    }

    const { error } = await supabase
      .from("dispatch_items")
      .update({ qty_returned: data.qtyReturned })
      .eq("id", data.itemId);
    if (error) return { success: false, error: error.message };
    revalidatePath("/dashboard/dispatch");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ── Internal: recalculate order total ────────────────────────────────────────
async function recalcTotal(supabase: ReturnType<typeof createAdminClient>, orderId: string) {
  const { data: items } = await supabase
    .from("dispatch_items")
    .select("quantity, unit_price")
    .eq("dispatch_order_id", orderId);
  const total = (items ?? []).reduce((sum, i) => sum + (i.quantity as number) * (i.unit_price as number), 0);
  await supabase.from("dispatch_orders").update({ total }).eq("id", orderId);
}
