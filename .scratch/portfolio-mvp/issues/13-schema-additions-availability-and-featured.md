# 13 — Schema additions: Profile availability + Skill featured

**What to build:** Two small schema changes — add an `availability` field to Profile (3 predefined values) and a `featured` boolean to Skill. These enable the hero status indicator and the skills featured filter in subsequent tickets.

**Blocked by:** 10 — Theme system

**Status:** ready-for-agent

- [ ] Add `availability` field to Profile schema: enum with values `"available"` (ready to work / green), `"limited"` (small projects only / yellow), `"unavailable"` (not available / red)
- [ ] Add `featured` boolean field to Skill schema (default false)
- [ ] Update GROQ queries for Profile and Skills if needed to include new fields
- [ ] Update TypeScript types in `packages/sanity` / `apps/nextjs` to reflect new fields
