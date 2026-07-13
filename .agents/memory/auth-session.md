---
name: Auth session shape
description: SessionProfile fields and how to use them in server actions and pages
---

`requirePermission(module, action)` returns a `SessionProfile`:

```ts
{
  userId: string;       // maps to public.profiles(id) — use for created_by FK
  fullName: string;
  email: string;
  isMasterAdmin: boolean;
  permissions: PermissionMap;
}
```

**Why:** Early code used `session.user.id` (Supabase auth shape) but the app wraps sessions in its own SessionProfile via `src/lib/auth/server.ts`. Using the wrong property causes silent null FK inserts.

**How to apply:** In every server action that writes `created_by`, use `session.userId`. For master-admin gates: `if (!session.isMasterAdmin) throw new Error(...)`.
