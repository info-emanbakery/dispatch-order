---
name: Next.js dev preview cross-origin block
description: Why forms silently do native GET submits in the Replit preview and how allowedDevOrigins must be configured
---

# Next.js 16 dev blocks Replit preview origins

**Rule:** `next.config.mjs` must include `allowedDevOrigins` built from `process.env.REPLIT_DEV_DOMAIN` (and `REPLIT_DOMAINS`). Simple wildcards like `*.replit.dev` are NOT enough — the preview domain has multiple labels (`<id>.<cluster>.replit.dev`) and `*` matches only one label.

**Why:** Next.js dev blocks cross-origin requests to `/_next/*` resources by default. When blocked, the browser never loads JS chunks, React never hydrates, and forms fall back to native GET submission (symptom: URL gains `?email=...&password=...` query params on submit, no error shown). The only diagnostic signal is a `⚠ Blocked cross-origin request to Next.js dev resource` warning in the dev-server terminal log — browser-side it fails silently.

**How to apply:** If any page in the Replit preview appears unresponsive to clicks/submits while curl/SSR works fine, check the workflow log for the blocked-origin warning before debugging app code. Dev-only issue; production builds are unaffected.
