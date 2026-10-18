# 24 — Setup and verify the Sanity revalidation webhook

**What to build:** Nothing in code — `/api/revalidate` is already implemented and tested (issue 19). This ticket tracks the remaining human configuration and an end-to-end verification.

**Blocked by:** (none)

**Status:** ready-for-human

## Checklist (human)

- [ ] Generate a secret: `openssl rand -hex 24`.
- [ ] Set it as `REVALIDATE_SECRET` in the Vercel project (Project → Settings → Environment Variables).
- [ ] In Sanity Manage Console → your project → API → Webhooks, create a webhook:
  - URL: `https://<your-site>/api/revalidate?secret=<REVALIDATE_SECRET>`
  - Dataset: the dataset the frontend reads
  - Trigger: create, update, delete (or publish-action + delete)
  - HTTP method: POST
  - Filter (optional): scope to `profile`, `skill`, `project`, `job`, `study`, `certification`, `backgroundMusic`
- [ ] Verify end-to-end: publish an edit in Sanity Studio, then confirm the site reflects it on the next request (and that a missed webhook still self-heals via the 5-minute `revalidate: 300` fallback).

## Notes

- Code side is complete (issue 19): `apps/nextjs/src/pages/api/revalidate.ts` (POST-only, secret-guarded, calls `res.revalidate("/")`), plus the 5-minute fallback revalidation on `getStaticProps`.

## Comments
