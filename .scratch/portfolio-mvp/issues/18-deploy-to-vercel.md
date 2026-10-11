# 18 — Deploy to Vercel

**What to build:** Make the repo deployable to Vercel as-is. The Next.js frontend lives at `apps/nextjs` inside a pnpm workspace, so Vercel won't auto-detect the framework at the repo root. Commit a `vercel.json` that points at the app, document the required environment variables, and add a deployment section to the README. The standalone Sanity Studio (`apps/studio`) is NOT touched here — it keeps deploying separately via `sanity deploy` (a permanent arrangement; the idea of embedding it in the Next.js app under `/studio` was dropped).

**Blocked by:** 17 — Final polish

**Status:** ready-for-agent

## Checklist

- [ ] Add a root `vercel.json`:
  ```json
  {
    "framework": "nextjs",
    "rootDirectory": "apps/nextjs"
  }
  ```
- [ ] Confirm the repo builds cleanly from scratch: `pnpm install && pnpm build && pnpm typecheck && pnpm test`.
- [ ] README: add a **Deploying to Vercel** section covering:
  - Import the repo into Vercel; Root Directory is set automatically by `vercel.json` to `apps/nextjs` (per-build "Use a vercel.json" workflow).
  - The environment variables to configure in the Vercel project:
    - `NEXT_PUBLIC_SANITY_PROJECT_ID` (required)
    - `NEXT_PUBLIC_SANITY_DATASET` (required)
    - `SANITY_API_TOKEN` (only if the dataset is private)
    - `RESEND_API_KEY`, `CONTACT_EMAIL` (required for the contact form `/api/contact`); `RESEND_FROM` optional
  - Note: Sanity Studio remains hosted separately at `.sanity.studio` (via `sanity deploy`).
- [ ] Do not add `revalidate`/ISR here — that's ticket 19.

## Notes

- `apps/nextjs/src/pages/index.tsx` uses `getStaticProps` with no `revalidate`: the page is static at deploy time by design until ticket 19 lands.
- `next.config.js` already handles `transpilePackages: ["@portfolio/ui"]` and the Sanity image CDN allowlist — no changes needed.

## Human capstone (not agent work)

Create the Vercel project from this repo, set the env vars above, and confirm the first production deploy renders the site.