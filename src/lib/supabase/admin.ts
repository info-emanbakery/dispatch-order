import { createClient } from "@supabase/supabase-js";

/**
 * Admin client with service_role key — bypasses Row Level Security.
 * Use ONLY in server-side code (API routes, server actions, migrations).
 * Never expose this client to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
