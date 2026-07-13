# Memory Index

- [Next.js dev preview cross-origin block](nextjs-dev-preview-origins.md) — silent hydration failure in Replit preview; allowedDevOrigins must use REPLIT_DEV_DOMAIN, not `*.replit.dev`.
- [Auth session shape](auth-session.md) — SessionProfile has userId/fullName/email/isMasterAdmin/permissions; use session.userId not session.user.id
- [Supabase join cast pattern](supabase-join-cast.md) — joined rows must be cast as unknown first; biome-ignore comment required
- [DB schema pointers](db-schema.md) — dispatch_items (not order_items); ledger_entries.created_by → profiles(id); salesman_balances view columns
- [Server action patterns](server-action-patterns.md) — always "use server"; requirePermission returns session; createAdminClient() bypasses RLS
- [Git push restriction](git-push-restriction.md) — Main agent blocks ALL git writes; use a project task to force-push to GitHub/trigger Vercel.
