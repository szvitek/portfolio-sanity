# 09 — Environment config and setup guide

**What to build:** A `.env.example` file documenting all required environment variables (Sanity project ID, dataset, API token, etc.) and a `README.md` at the repo root with setup instructions covering clone, install, environment config, and local development for both `apps/nextjs` and `apps/studio`.

**Blocked by:** 02 — Home page shell + Profile section

**Status:** resolved

- [x] `.env.example` with all required variables and placeholder values
- [x] `README.md` with: project overview, prerequisites, setup steps (clone, install, configure env), running the Studio locally, running the Next.js app locally, and link to the issue tracker convention (`docs/agents/issue-tracker.md`)
- [x] Both `.env.example` and `README.md` committed

## Answer

Created per-app `.env.example` files (`apps/studio/.env.example`, `apps/nextjs/.env.example`) plus a combined root `.env.example` as reference. Added `README.md` with project overview, prerequisites, setup steps, and commands for running both apps. All committed in `b06b07b` and `4466114`.
