# 04 — Projects section

**What to build:** The Projects section on the home page, fetching Projects from Sanity and rendering featured projects first in a 2-column grid. Each project shows a 600×340 preview image, title, description, Skill tags, and links to live demo and GitHub.

**GridCN components from prototype:** `data-card`, `tag` — not used; `ProjectCard` built as custom component matching existing card conventions. Skill badges reuse `skillBadgeClasses()` from JobCard per user request.

**Blocked by:** 02 — Home page shell + Profile section, 10 — Theme system

**Status:** done

- [x] GROQ query for Projects (featured-first ordering) in `packages/sanity/queries/`
- [x] Projects section using a 2-column grid with image, title, description, Skill tags, featured badge, and action links (`ProjectCard` component)
- [x] Projects section added to the home page (third position)
- [x] Integration test updated with Projects fixture and assertions (10 new tests)
- [x] Mock project fallback data in `src/lib/mock-data.ts` used when Sanity has no projects yet
- [x] `isFeatured` boolean already existed in project schema (`featured` field)
