# Memory Index

- [Next.js dev preview cross-origin block](nextjs-dev-preview-origins.md) — silent hydration failure in Replit preview; allowedDevOrigins must use REPLIT_DEV_DOMAIN, not `*.replit.dev`.
- [Auth session shape](auth-session.md) — SessionProfile has userId/fullName/email/isMasterAdmin/permissions; use session.userId not session.user.id
- [Supabase join cast pattern](supabase-join-cast.md) — joined rows must be cast as unknown first; biome-ignore comment required
- [DB schema pointers](db-schema.md) — dispatch_items (not order_items); ledger_entries.created_by → profiles(id); salesman_balances view columns
- [Server action patterns](server-action-patterns.md) — always "use server"; requirePermission returns session; createAdminClient() bypasses RLS
- [Git push restriction](git-push-restriction.md) — Main agent blocks git push; use Node.js https + GITHUB_PAT to call GitHub REST API (create tree → commit → PATCH ref).
- [Next.js revalidatePath + router.refresh pattern](nextjs-refresh-pattern.md) — revalidatePath() only invalidates server cache; client must also call router.refresh() or the UI stays stale.
- [Dispatch financial integrity rules](dispatch-financial-integrity.md) — unit_price must be server-fetched; submit must be conditional+ordered; cancelled/returned need ledger reversal.
