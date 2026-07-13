---
name: Supabase join cast pattern
description: How to safely type joined supabase results without TS/biome errors
---

Supabase's TS inference for joined tables (e.g. `salesmen(name)`) returns `{ name: string } | null` but TypeScript and biome flag the optionality differently depending on query shape.

**Pattern:**

```ts
const sm = r.salesmen as unknown as { name: string } | null | undefined;
// biome-ignore lint/suspicious/noUnnecessaryConditions: supabase join may return null
const name = sm?.name ?? "Unknown";
```

**Why:** Direct destructuring causes TS2339 and biome `noUnnecessaryConditions` warns on the optional chain. The `as unknown as Type | null | undefined` cast + comment suppression is the established project convention.

**How to apply:** Every page.tsx that joins tables with `.select("..., table(col)")` should use this pattern.
