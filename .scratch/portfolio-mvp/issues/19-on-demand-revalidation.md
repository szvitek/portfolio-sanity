# 19 — On-demand revalidation via Sanity webhook

**What to build:** Make Sanity content edits appear immediately after deploy. A Sanity webhook (configured in the Manage Console, firing on document publish/unpublish/delete) calls a guarded `/api/revalidate` route, which invalidates the cached home page so the next visit regenerates it. An optional low `revalidate` interval on `getStaticProps` acts as a safety net for missed webhooks — not a polling mechanism.

**Blocked by:** 18 — Deploy to Vercel

**Status:** ready-for-agent

## Checklist

- [ ] Add `apps/nextjs/src/pages/api/revalidate.ts` (Pages Router API route):
  - Only accept `POST`.
  - Guard on a secret: 401 unless `req.query.secret` matches `process.env.REVALIDATE_SECRET` (also 401 if the var is unset).
  - Call `await res.revalidate("/")`.
  - Respond `200` with `{ revalidated: true }`.
- [ ] Add a fallback `revalidate: 300` to `getStaticProps` in `apps/nextjs/src/pages/index.tsx` (regenerates at most every 5 minutes even if a webhook never arrives). Keep it modest so edit→publish stays effectively instant via the webhook path.
- [ ] Add `REVALIDATE_SECRET` to `apps/nextjs/.env.example` and the root `.env.example` (generated via `openssl rand -hex 24` or similar).
- [ ] Tests in `apps/nextjs/__tests__/revalidate.test.tsx`:
  - Missing/incorrect secret → `401`.
  - Correct secret → `res.revalidate("/")` called, `200 { revalidated: true }`.
  - Non-POST method rejected.
- [ ] README: document the webhook setup step (human-clicks) — see capstone.

## Webhook setup (human, in Sanity Manage Console)

`https://manage.sanity.io/projects/<projectId>/settings/api/webhooks`:

- **URL:** `https://<your-site>/api/revalidate?secret=<REVALIDATE_SECRET>`
- **Dataset:** the dataset the frontend reads
- **Trigger:** `create`, `update`, `delete` (or publish-action + delete for Studio-authored edits)
- **Filters:** optionally scope to the document types the home page reads (profile, skill, project, job, study, certification, music)
- **HTTP method:** POST (the route requires it)

## Notes

- With this flow, webhook → revalidate happens on the webhook hit, and the new content is served on the **next request** after revalidation; no periodic build required.
- `res.revalidate` is Next.js Pages Router on-demand ISR (available in this Next 15 app). For App Router it would be `revalidatePath` — not applicable here.