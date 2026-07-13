"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { requirePermission } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/supabase/admin";

type ActionResult = { success: true } | { success: false; error: string };

const PAYMENT_METHODS = ["cash", "bank_transfer", "cheque", "mobile_wallet", "other"] as const;

const recordPaymentSchema = z.object({
  salesmanId: z.uuid(),
  amount: z
    .string()
    .trim()
    .min(1, "Amount is required.")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, "Amount must be a positive number."),
  method: z.enum(PAYMENT_METHODS).default("cash"),
  reference: z.string().trim().max(100).optional().or(z.literal("")),
  note: z.string().trim().max(500).optional().or(z.literal("")),
});

export type RecordPaymentInput = z.infer<typeof recordPaymentSchema>;

export async function recordPaymentAction(input: RecordPaymentInput): Promise<ActionResult> {
  try {
    const session = await requirePermission("payments", "create");
    const data = recordPaymentSchema.parse(input);
    const supabase = createAdminClient();

    const { error } = await supabase.from("ledger_entries").insert({
      salesman_id: data.salesmanId,
      entry_type: "credit",
      amount: Number(data.amount),
      method: data.method,
      reference: data.reference || null,
      note: data.note || null,
      created_by: session.userId,
    });

    if (error) return { success: false, error: error.message };
    revalidatePath("/dashboard/payments");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
