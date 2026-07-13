# Dispatch Order — Studio Admin

A Next.js 15 App Router + shadcn/ui enterprise admin dashboard. Originally from GitHub (`info-emanbakery/dispatch-order`), now developed in Replit and pushed back to GitHub for Vercel auto-deploy.

## Run & Operate

- `npm run dev` — start the dev server (port 3000)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run check` — lint with Biome
- `npm run check:fix` — lint + auto-fix with Biome

## GitHub sync / Vercel deploy

Vercel deploys automatically when GitHub receives a push.

- **Automatic**: `scripts/post-merge.sh` runs after every agent task merge — it installs deps and pushes to GitHub, so Vercel stays in sync with no manual steps.
- **Manual / one-click**: Use the **"Push to GitHub"** workflow in the Replit workspace to push on demand.
- **Script**: `scripts/push-to-github.sh` — standalone push; uses the `GITHUB_PAT` secret for auth.

## Stack

- Next.js 15 (App Router), React 19, TypeScript 5.9
- shadcn/ui + Radix UI + Tailwind CSS v4
- Zustand (state), React Hook Form + Zod (forms/validation)
- Recharts (charts), TanStack Table (data tables)
- Biome (linting/formatting)

## Where things live

- `src/app/` — App Router pages and layouts
- `src/app/(main)/dashboard/` — all dashboard views
- `src/app/(main)/auth/` — login/register pages (v1 & v2 variants)
- `src/components/ui/` — shadcn/ui component library
- `src/navigation/sidebar/sidebar-items.ts` — sidebar nav config
- `src/config/app-config.ts` — app-wide config
- `src/lib/preferences/` — theme/layout preference system
- `src/stores/` — Zustand stores

## Architecture decisions

- App Router route groups: `(main)` for authenticated shell, `(external)` for public pages
- Theme presets (brutalist, soft-pop, tangerine) live in `src/styles/presets/`
- Preferences persisted via cookies (SSR-safe) and localStorage
- `legacy` route group under dashboard contains older dashboard variants (v1)

## Product

Enterprise admin dashboard with multiple dashboard views (analytics, CRM, finance, default), chat interface, auth flows (two visual variants), full sidebar navigation with theme/layout controls, and a rich shadcn/ui component library.

## User preferences

- GitHub repo: https://github.com/info-emanbakery/dispatch-order
- Vercel deployment linked to that GitHub repo — push to GitHub triggers Vercel deploy
- `husky` and `lint-staged` removed from devDependencies (not compatible with Replit git sandbox)
- npm `overrides` added to pin `npm-run-path@^5` and `execa@^8` (Replit firewall blocks v6/v9)

## Gotchas

- **Do not re-add `prepare: "husky"` or `lint-staged`** — git hook tools don't work in Replit's sandbox
- **Keep the `overrides` block in package.json** — `npm-run-path@6.0.0` is blocked by Replit's package firewall; the override pins it to v5 which works
- When pushing back to GitHub: the `overrides` block, removed `prepare` script, and removed `lint-staged` config are Replit-only changes. Restore them in the GitHub version if you need git hooks on other machines
- Run `npm run dev` not `pnpm run dev` — this project uses npm

## Pointers

- Dashboard layouts: `src/app/(main)/dashboard/_components/sidebar/`
- Sidebar nav items: `src/navigation/sidebar/sidebar-items.ts`
- Theme system entry: `src/lib/preferences/theme.ts`
