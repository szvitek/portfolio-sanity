# 04 — Projects section

**What to build:** The Projects section on the home page, fetching Projects from Sanity and rendering featured projects first in a 2-column grid. Each project shows a 600×340 preview image, title, description, Skill tags, and links to live demo and GitHub.

**GridCN components from prototype:** `data-card`, `tag`

**Blocked by:** 02 — Home page shell + Profile section, 10 — Theme system

**Status:** ready-for-agent

- [ ] GROQ query for Projects (featured-first ordering) in `packages/sanity/queries/`
- [ ] Install `@thegridcn/data-card` and `@thegridcn/tag` components
- [ ] Projects section using a 2-column grid of `DataCard`s with image, title, description, Skill tags, and action links
- [ ] Projects section added to the home page (third position)
- [ ] Integration test updated with Projects fixture and assertions
