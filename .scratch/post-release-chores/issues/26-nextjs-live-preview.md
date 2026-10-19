# 26 — Next.js: Sanity live preview / draft mode

**What to build:** Add draft-mode preview using `next-sanity`: a preview route that enables draft mode with a token, `sanityFetch` with the preview perspective, and a "disable preview" route. Gate on `SANITY_API_TOKEN` (server-side).

**Blocked by:** (none)

**Status:** ready-for-agent

## Checklist

- [ ] Add `/api/draft-mode/enable` and `/api/draft-mode/disable` routes.
- [ ] Switch `getHomePageData` to `sanityFetch` with `perspective: "previewDrafts"` when draft mode is on.
- [ ] Add `SANITY_API_TOKEN` handling (already server-side).
- [ ] Document preview URL in README.

## Notes

- Requires a read token with draft access.
- Keep the 5-minute ISR fallback for production.

## Comments
