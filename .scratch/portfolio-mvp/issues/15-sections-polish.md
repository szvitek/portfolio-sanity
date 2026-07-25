# 15 — Sections polish: badge grouping, sorting, projects show-all, fallback images

**What to build:** Multiple polish changes across sections:
- **Projects:** 3-column grid (was 2), fixed card image height, "Show all" toggle (initially shows featured only, clicking reveals all), fallback icon/placeholder for missing images
- **Jobs/Studies:** sorted by `startDate` descending (most recent first)
- **Certifications:** sorted by date descending (most recent first)
- **Badges** (on Projects + Jobs): grouped by Skill category, sorted alphabetically within each category, gap between groups
- **Skills carousel:** sorted by name within category; only featured Skills shown (filtered by `Skill.featured`)

**Blocked by:** 13 — Schema additions, 14 — Hero section upgrade

**Status:** ready-for-agent

- [ ] Projects grid: 3 columns, fixed image height on all cards
- [ ] Projects: "Show all" button toggling between featured-only and all projects
- [ ] Fallback placeholder icon for missing project/certification images
- [ ] Jobs sorted by startDate descending (most recent at top)
- [ ] Studies sorted by startDate descending
- [ ] Certifications sorted by date descending
- [ ] Badges on Projects + Jobs grouped by Skill category, sorted alphabetically within group, gap between category groups
- [ ] Skills carousel filtered to featured Skills only, sorted by name within category
- [ ] Integration tests updated for all changes
