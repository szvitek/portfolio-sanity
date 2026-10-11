# 19 — On-demand revalidation via Sanity webhook

**What to build:** Make Sanity content edits appear immediately after deploy. A Sanity webhook (configured in the Manage Console, firing on document publish/unpublish/delete) calls a guarded `/api/revalidate` route, which invalidates the cached home page so the next visit regenerates it. An optional low `revalidate` interval on `getStaticProps` acts as a safety net for missed webhooks — not a polling mechanism.

**Blocked by:** 18 — Deploy to Vercel

**Status:** completed

## Checklist

- [x] Add `apps/nextjs/src/pages/api/revalidate.ts` (Pages Router API route):
  - Only accept `POST`.
  - Guard on a secret: 401 unless `req.query.secret` matches `process.env.REVALIDATE_SECRET` (also 401 if the var is unset).
  - Call `await res.revalidate("/")`.
  - Respond `200` with `{ revalidated: true }`.
- [x] Add a fallback `revalidate: 300` to `getStaticProps` in `apps/nextjs/src/pages/index.tsx` (regenerates at most every 5 minutes even if a webhook never arrives). Keep it modest so edit→publish stays effectively instant via the webhook path.
- [x] Add `REVALIDATE_SECRET` to `apps/nextjs/.env.example` and the root `.env.example` (generated via `openssl rand -hex 24` or similar).
- [x] Tests in `apps/nextjs/__tests__/revalidate.test.tsx`:
  - Missing/incorrect secret → `401`.
  - Correct secret → `res.revalidate("/")` called, `200 { revalidated: true }`.
  - Non-POST method rejected.
- [x] README: document the webhook setup step (human-clicks) — see capstone.

## Webhook setup (human, in Sanity Manage Console)

`https://manage.sanity.io/projects/<projectId>/settings/api/webhooks`:

- **URL:** `https://<your-site>/api/revalidate?secret=<REVALIDATE_SECRET>`
- **Dataset:** the dataset the frontend reads
- **Trigger:** `create`, `update`, `delete` (or publish-action + delete for Studio-authored edits)
- **Filters:** optionally scope to the document types the home page reads (profile, skill, project, job, study, certification, backgroundMusic)
- **HTTP method:** POST (the route requires it)

## Notes

- With this flow, webhook → revalidate happens on the webhook hit, and the new content is served on the **next request** after revalidation; no periodic build required.
- `res.revalidate` is Next.js Pages Router on-demand ISR (available in this Next 15 app). For App Router it would be `revalidatePath` — not applicable here.

## Comments

Implemented. `apps/nextjs/src/pages/api/revalidate.ts` is a Pages Router API route: POST-only (otherwise `405` + `Allow` header), `401` unless `req.query.secret` matches `REVALIDATE_SECRET` (also `401` when unset), then `await res.revalidate("/")` → `200 { revalidated: true }`; revalidation failures return `500`. `getStaticProps` in `pages/index.tsx` gained `revalidate: 300` as a safety net — the production build confirms `/` shows `Revalidate: 5m`. `REVALIDATE_SECRET` added to both `.env.example` files and documented in the README (env table + "Instant content updates" webhook steps, filtering on the real document types `profile`, `skill`, `project`, `job`, `study`, `certification`, `backgroundMusic`).

TDD at the route seam: `__tests__/revalidate.test.tsx` covers non-POST rejection, missing/incorrect/unset secret → `401`, valid secret → `res.revalidate("/")` + `200`, and the `500` error path. Full suite `104` tests pass; `pnpm --filter @portfolio/nextjs typecheck` and `build` green.