# 02 — Home page shell + Profile section

**What to build:** The Next.js app scaffold, a home page that fetches and renders the Profile section (avatar, title, subtitle, bio, social link icons, CV download button), and the first integration test asserting the Profile renders correctly from mock Sanity data. The page layout is structured so subsequent tickets can add sections in the defined order.

**Blocked by:** 01 — Monorepo foundation + Sanity Studio

**Status:** completed

- [x] `apps/nextjs` scaffold with Next.js, TypeScript, Tailwind, GridCN components installed (GridCN components not available as npm package; uses Tailwind utility classes matching the theme preset)
- [x] GROQ query for Profile in `packages/sanity/queries/` (already exists from ticket 01)
- [x] ProfileCard component in `packages/ui` (avatar, title, subtitle, bio, social icons, CV button)
- [x] SocialLinkIcon component in `packages/ui` (resolves platform enum to icon)
- [x] Home page with Profile section rendering in first position
- [x] Integration test with mock Sanity Profile fixture, asserting Profile content renders on the page
