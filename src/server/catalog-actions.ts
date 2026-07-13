"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { can, getSessionProfile } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type ActionResult = { success: true } | { success: false; error: string };

function firstZodError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input.";
}

// ─── Auto-code generation ────────────────────────────────────────────────────

async function nextSalesmanCode(): Promise<string> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("salesmen")
    .select("code")
    .like("code", "SLM-%")
    .order("code", { ascending: false })
    .limit(1);

  if (!data || data.length === 0) return "SLM-001";
  const last = (data[0]?.code as string | null) ?? "SLM-000";
  const num = parseInt(last.replace("SLM-", ""), 10);
  return `SLM-${String(num + 1).padStart(3, "0")}`;
}

async function nextProductCode(): Promise<string> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("products")
    .select("code")
    .like("code", "PRD-%")
    .order("code", { ascending: false })
    .limit(1);

  if (!data || data.length === 0) return "PRD-001";
  const last = (data[0]?.code as string | null) ?? "PRD-000";
  const num = parseInt(last.replace("PRD-", ""), 10);
  return `PRD-${String(num + 1).padStart(3, "0")}`;
}

// ─── Salesmen ────────────────────────────────────────────────────────────────

const createSalesmanSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  area: z.string().trim().max(100).optional().or(z.literal("")),
  iqamaNumber: z.string().trim().max(30).optional().or(z.literal("")),
  vehicleNumber: z.string().trim().max(30).optional().or(z.literal("")),
});

const updateSalesmanSchema = createSalesmanSchema.extend({
  salesmanId: z.uuid(),
  code: z.string().trim().max(20).optional().or(z.literal("")),
});

const toggleActiveSchema = z.object({
  id: z.uuid(),
  active: z.boolean(),
});

export async function createSalesmanAction(input: z.infer<typeof createSalesmanSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "salesmen", "create")) {
    return { success: false, error: "You don't have permission to create salesmen." };
  }
  const parsed = createSalesmanSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const { name, phone, area, iqamaNumber, vehicleNumber } = parsed.data;
  const code = await nextSalesmanCode();
  const admin = createAdminClient();
  const { error } = await admin.from("salesmen").insert({
    code,
    name,
    phone: phone ?? null,
    area: area ?? null,
    iqama_number: iqamaNumber ?? null,
    vehicle_number: vehicleNumber ?? null,
    active: true,
    created_by: session.userId,
  });
  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard/salesmen");
  return { success: true };
}

export async function updateSalesmanAction(input: z.infer<typeof updateSalesmanSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "salesmen", "edit")) {
    return { success: false, error: "You don't have permission to edit salesmen." };
  }
  const parsed = updateSalesmanSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const { salesmanId, code, name, phone, area, iqamaNumber, vehicleNumber } = parsed.data;
  const admin = createAdminClient();
  const { error } = await admin
    .from("salesmen")
    .update({
      code: code || undefined,
      name,
      phone: phone ?? null,
      area: area ?? null,
      iqama_number: iqamaNumber ?? null,
      vehicle_number: vehicleNumber ?? null,
    })
    .eq("id", salesmanId);
  if (error) {
    const friendly = error.message.toLowerCase().includes("unique")
      ? "A salesman with this code already exists."
      : error.message;
    return { success: false, error: friendly };
  }
  revalidatePath("/dashboard/salesmen");
  return { success: true };
}

export async function setSalesmanActiveAction(input: z.infer<typeof toggleActiveSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "salesmen", "edit")) {
    return { success: false, error: "You don't have permission to edit salesmen." };
  }
  const parsed = toggleActiveSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const admin = createAdminClient();
  const { error } = await admin.from("salesmen").update({ active: parsed.data.active }).eq("id", parsed.data.id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard/salesmen");
  return { success: true };
}

// ─── Products ────────────────────────────────────────────────────────────────

const PRODUCT_CATEGORIES = ["Chapathi", "Shami", "Labanani", "Samooli", "Felafil", "Abu Navas", "Burger", "Hub", "Other"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

const createProductSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(150),
  sku: z.string().trim().max(50).optional().or(z.literal("")),
  barcode: z.string().trim().max(50).optional().or(z.literal("")),
  unit: z.string().trim().min(1, "Unit is required.").max(20).default("pcs"),
  category: z.string().trim().max(50).optional().or(z.literal("")),
});

const updateProductSchema = createProductSchema.extend({
  productId: z.uuid(),
});

export async function createProductAction(input: z.infer<typeof createProductSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "products", "create")) {
    return { success: false, error: "You don't have permission to create products." };
  }
  const parsed = createProductSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const { sku, barcode, name, unit, category } = parsed.data;
  const code = await nextProductCode();
  const admin = createAdminClient();
  const { error } = await admin.from("products").insert({
    code,
    sku: sku || code, // fall back to code as sku if not provided
    barcode: barcode ?? null,
    name,
    unit,
    category: category || null,
    active: true,
    created_by: session.userId,
  });
  if (error) {
    const friendly = error.message.toLowerCase().includes("unique")
      ? "A product with this SKU or code already exists."
      : error.message;
    return { success: false, error: friendly };
  }
  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function updateProductAction(input: z.infer<typeof updateProductSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "products", "edit")) {
    return { success: false, error: "You don't have permission to edit products." };
  }
  const parsed = updateProductSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const { productId, sku, barcode, name, unit, category } = parsed.data;
  const admin = createAdminClient();
  const { error } = await admin
    .from("products")
    .update({ sku: sku ?? null, barcode: barcode ?? null, name, unit, category: category ?? null })
    .eq("id", productId);
  if (error) {
    const friendly = error.message.toLowerCase().includes("unique")
      ? "A product with this SKU or barcode already exists."
      : error.message;
    return { success: false, error: friendly };
  }
  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function setProductActiveAction(input: z.infer<typeof toggleActiveSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "products", "edit")) {
    return { success: false, error: "You don't have permission to edit products." };
  }
  const parsed = toggleActiveSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const admin = createAdminClient();
  const { error } = await admin.from("products").update({ active: parsed.data.active }).eq("id", parsed.data.id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard/products");
  return { success: true };
}

export { PRODUCT_CATEGORIES };

// ─── Pricing (direct audit-log style — used by the Pricing page) ──────────────

const upsertPriceSchema = z.object({
  salesmanId: z.uuid(),
  productId: z.uuid(),
  price: z.number().positive("Price must be greater than 0."),
  validFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format."),
  validTo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format.")
    .optional()
    .or(z.literal("")),
});

const updatePriceSchema = upsertPriceSchema.extend({
  priceId: z.uuid(),
});

export async function createPriceAction(input: z.infer<typeof upsertPriceSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "pricing", "create")) {
    return { success: false, error: "You don't have permission to create price entries." };
  }
  const parsed = upsertPriceSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const { salesmanId, productId, price, validFrom, validTo } = parsed.data;
  const admin = createAdminClient();
  const { error } = await admin.from("salesman_prices").insert({
    salesman_id: salesmanId,
    product_id: productId,
    price,
    valid_from: validFrom,
    valid_to: validTo ?? null,
    created_by: session.userId,
  });
  if (error) {
    const friendly = error.message.toLowerCase().includes("overlap")
      ? "A price entry for this salesman and product already exists for the selected validity period."
      : error.message;
    return { success: false, error: friendly };
  }
  revalidatePath("/dashboard/pricing");
  return { success: true };
}

export async function updatePriceAction(input: z.infer<typeof updatePriceSchema>): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session || !can(session, "pricing", "edit")) {
    return { success: false, error: "You don't have permission to edit price entries." };
  }
  const parsed = updatePriceSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstZodError(parsed.error) };

  const { priceId, price, validFrom, validTo } = parsed.data;
  const admin = createAdminClient();
  const { error } = await admin
    .from("salesman_prices")
    .update({ price, valid_from: validFrom, valid_to: validTo ?? null })
    .eq("id", priceId);
  if (error) {
    const friendly = error.message.toLowerCase().includes("overlap")
      ? "The updated validity window overlaps with another price entry for this salesman and product."
      : error.message;
    return { success: false, error: friendly };
  }
  revalidatePath("/dashboard/pricing");
  return { success: true };
}
