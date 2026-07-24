# 06 — Studies section

**What to build:** The Studies section on the home page, fetching Studies from Sanity in chronological order. Each study shows institution, field of study, date range, and description in a stacked card layout.

**GridCN components from prototype:** `data-card`

**Blocked by:** 02 — Home page shell + Profile section, 10 — Theme system

**Status:** done

- [x] GROQ query for Studies (chronological order) in `packages/sanity/queries/`
- [x] Studies section using stacked `StudyCard`s with institution, field, dates, and description
- [x] Studies section added to the home page (fifth position)
- [x] Integration test updated with Studies fixture and assertions
