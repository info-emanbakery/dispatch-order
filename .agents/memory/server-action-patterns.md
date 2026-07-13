---
name: Server action patterns
description: Conventions for writing Next.js server actions in this codebase
---

**Standard server action shape:**

```ts
"use server";
import { requirePermission } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function myAction(input: MyInput): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const session = await requirePermission("module", "action");
    const supabase = createAdminClient(); // bypasses RLS
    // ... work ...
    revalidatePath("/dashboard/module");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
```

**Why:** `createAdminClient()` (service-role) is required for server actions because RLS policies use `auth.uid()` which is only set for PostgREST JWT calls, not for server-side Supabase clients. `requirePermission` enforces auth at the application layer instead.

**How to apply:** Use `createClient()` (respects RLS) for read-only server components where possible; use `createAdminClient()` in write server actions. Never call DB functions that rely on `auth.uid()` from server actions — insert directly instead.
