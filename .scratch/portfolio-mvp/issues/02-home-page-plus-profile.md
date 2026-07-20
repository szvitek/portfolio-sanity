# 02 — Home page shell + Profile section

**What to build:** The Next.js app scaffold, a home page that fetches and renders the Profile section (avatar, title, subtitle, bio, social link icons, CV download button), and the first integration test asserting the Profile renders correctly from mock Sanity data. The page layout is structured so subsequent tickets can add sections in the defined order.

**Blocked by:** 01 — Monorepo foundation + Sanity Studio

**Status:** ready-for-agent

- [ ] `apps/nextjs` scaffold with Next.js, TypeScript, Tailwind, GridCN components installed
- [ ] GROQ query for Profile in `packages/sanity/queries/`
- [ ] ProfileCard component in `packages/ui` (avatar, title, subtitle, bio, social icons, CV button)
- [ ] SocialLinkIcon component in `packages/ui` (resolves platform enum to icon)
- [ ] Home page with Profile section rendering in first position
- [ ] Integration test with mock Sanity Profile fixture, asserting Profile content renders on the page
