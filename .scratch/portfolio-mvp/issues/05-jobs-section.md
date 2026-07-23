# 05 — Jobs section

**What to build:** The Jobs section on the home page, fetching Jobs from Sanity in chronological order. Each job shows company logo, company name, role, date range, description, a link to the company website, and Skill tags.

**GridCN components from prototype:** `data-card`, `tag`

**Blocked by:** 02 — Home page shell + Profile section, 10 — Theme system

**Status:** ready-for-agent

- [ ] GROQ query for Jobs (chronological order) in `packages/sanity/queries/`
- [ ] Jobs section using stacked `DataCard`s with company logo (48×48), name, role, dates, description, website link, and Skill tags
- [ ] Jobs section added to the home page (fourth position)
- [ ] Integration test updated with Jobs fixture and assertions
