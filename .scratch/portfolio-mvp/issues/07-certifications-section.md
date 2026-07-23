# 07 — Certifications section

**What to build:** The Certifications section on the home page, fetching Certifications from Sanity. Each certification shows thumbnail, title, issuer, date earned, and a verification link in a card grid.

**GridCN components from prototype:** `feature-card`

**Blocked by:** 02 — Home page shell + Profile section, 10 — Theme system

**Status:** ready-for-agent

- [ ] GROQ query for Certifications in `packages/sanity/queries/`
- [ ] Install `@thegridcn/feature-card` component
- [ ] Certifications section using a grid of `FeatureCard`s with thumbnail, title, issuer, date, and verification link
- [ ] Certifications section added to the home page (sixth position)
- [ ] Integration test updated with Certifications fixture and assertions
