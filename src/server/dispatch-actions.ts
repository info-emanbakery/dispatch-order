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
const upsertItemSchema = z.object({
  orderId: z.uuid(),
  productId: z.uuid(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().min(0),
});

export async function upsertOrderItemAction(input: z.infer<typeof upsertItemSchema>): Promise<ActionResult> {
  try {
    await requirePermission("dispatch", "edit");
    const data = upsertItemSchema.parse(input);
    const supabase = createAdminClient();

    const { data: order } = await supabase.from("dispatch_orders").select("status").eq("id", data.orderId).single();
    if (!order) return { success: false, error: "Order not found." };
    if ((order.status as string) !== "draft") return { success: false, error: "Only draft orders can be modified." };

    // Upsert the line item
    const { error } = await supabase.from("dispatch_items").upsert(
      {
        dispatch_order_id: data.orderId,
        product_id: data.productId,
        quantity: data.quantity,
        unit_price: data.unitPrice,
      },
      { onConflict: "dispatch_order_id,product_id" },
    );
    if (error) return { success: false, error: error.message };

    // Recalculate total
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
export async function submitOrderAction(orderId: string): Promise<ActionResult> {
  try {
    await requirePermission("dispatch", "edit");
    if (!z.uuid().safeParse(orderId).success) return { success: false, error: "Invalid order ID." };
    const supabase = createAdminClient();

    const { data: order } = await supabase
      .from("dispatch_orders")
      .select("status, dispatch_items(id)")
      .eq("id", orderId)
      .single();
    if (!order) return { success: false, error: "Order not found." };
    if ((order.status as string) !== "draft") return { success: false, error: "Only draft orders can be submitted." };
    const items = order.dispatch_items as { id: string }[];
    if (!items || items.length === 0) {
      return { success: false, error: "Cannot submit an empty order. Add at least one product line." };
    }

    // Create ledger debit entry
    const { data: fullOrder } = await supabase
      .from("dispatch_orders")
      .select("salesman_id, total, created_by")
      .eq("id", orderId)
      .single();
    if (!fullOrder) return { success: false, error: "Order not found." };

    const { error: statusErr } = await supabase
      .from("dispatch_orders")
      .update({ status: "submitted" })
      .eq("id", orderId);
    if (statusErr) return { success: false, error: statusErr.message };

    // Record ledger debit
    await supabase.from("ledger_entries").insert({
      salesman_id: fullOrder.salesman_id,
      entry_type: "debit",
      amount: fullOrder.total,
      dispatch_order_id: orderId,
      note: "Dispatch order submitted",
      created_by: fullOrder.created_by,
    });

    revalidatePath("/dashboard/dispatch");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ── Advance order status ──────────────────────────────────────────────────────
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
    await requirePermission("dispatch", "edit");
    const data = advanceSchema.parse(input);
    const supabase = createAdminClient();

    const { data: order } = await supabase.from("dispatch_orders").select("status").eq("id", data.orderId).single();
    if (!order) return { success: false, error: "Order not found." };
    const allowed = VALID_TRANSITIONS[order.status as string] ?? [];
    if (!allowed.includes(data.newStatus)) {
      return { success: false, error: `Cannot transition from '${order.status}' to '${data.newStatus}'.` };
    }

    const { error } = await supabase.from("dispatch_orders").update({ status: data.newStatus }).eq("id", data.orderId);
    if (error) return { success: false, error: error.message };
    revalidatePath("/dashboard/dispatch");
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
