# 01 — CV download counter

**What to build:** Track how many times the CV is downloaded. Add a `downloads` field to the Sanity profile schema, an API route that increments it, and wire the CV download buttons to call that route on click.

**Blocked by:** (none)

**Status:** completed

- [x] Add `downloads` (number, initialValue 0) field to `packages/sanity/src/schemas/profile.ts`
- [x] Include `downloads` in `profileQuery` (`packages/sanity/src/queries/index.ts`)
- [x] Add `downloads?: number` to `ProfileData` (`apps/nextjs/src/lib/sanity.ts`)
- [x] Create `/api/cv-download` route that patches the `profile` document with `inc({ downloads: 1 })` using `SANITY_API_TOKEN`
- [x] Fire-and-forget POST from both CV download buttons (`apps/nextjs/src/pages/index.tsx`)
- [x] Update mock fixture with `downloads`
- [x] Typecheck + tests green

## Comments

Implemented on branch `feat/cv-download-counter`.

- Schema: `downloads` number field with `initialValue: 0` on `profile`.
- Query: `downloads` selected in `profileQuery`.
- API: `apps/nextjs/src/pages/api/cv-download.ts` (POST only; 405 otherwise; 500 on missing token/failure; 200 `{ success: true }` on success). Uses `client.patch("profile").inc({ downloads: 1 }).commit()`.
- UI: `trackCvDownload` helper calls `fetch("/api/cv-download", { method: "POST", keepalive: true })`; attached to both CV anchors' `onClick`.
- Count is tracked only (not displayed publicly).
