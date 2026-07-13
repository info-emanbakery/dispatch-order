---
name: Next.js revalidatePath + router.refresh pattern
description: revalidatePath alone never updates the client UI; every client component that calls a server action must also call router.refresh().
---

## The rule

After a successful server action, **always call `router.refresh()`** on the client side. `revalidatePath()` only marks the server-side cache as stale — the client component never re-fetches unless you explicitly tell the router.

**Why:** In Next.js App Router with `force-dynamic` pages, `revalidatePath()` invalidates the cache so that the *next* request gets fresh data, but the currently-mounted client component gets no signal that anything changed. Without `router.refresh()`, the UI appears to do nothing — no new row in the table, no updated badge, no refreshed total — until the user manually reloads.

**How to apply:**

Every `"use client"` component that calls a server action must follow this pattern:

```typescript
const router = useRouter(); // from 'next/navigation'

async function handleAction() {
  const result = await someMutationAction(payload);
  if (result.success) {
    router.refresh(); // re-fetch server component data
    onSuccess();      // close dialog / clear state
  } else {
    toast.error(result.error);
  }
}
```

For local state that mirrors server props (e.g., a dialog showing a sub-list of the currently-selected row), use a `useEffect` with a functional `setState` to re-sync after refresh:

```typescript
// Sync viewOrder from updated orderDetails after router.refresh()
React.useEffect(() => {
  setViewOrder((prev) => {
    if (!prev) return prev;
    const updated = orderDetails.get(prev.id);
    return updated ?? prev;
  });
}, [orderDetails]);
```

The functional `setState` form avoids adding the derived state variable to the dep array (which would cause an infinite loop).
