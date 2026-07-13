import { can, requirePermission } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";

import { Products } from "./_components/products";
import type { ProductRow } from "./_components/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await requirePermission("products", "view");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, sku, barcode, name, unit, active, created_at")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const rows: ProductRow[] = (data ?? []).map((p) => ({
    id: p.id as string,
    sku: p.sku as string | null,
    barcode: p.barcode as string | null,
    name: p.name as string,
    unit: p.unit as string,
    active: p.active as boolean,
    createdAt: p.created_at as string,
  }));

  return (
    <Products
      products={rows}
      canCreate={can(session, "products", "create")}
      canEdit={can(session, "products", "edit")}
    />
  );
}
