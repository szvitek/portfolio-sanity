# 04 — Projects section

**What to build:** The Projects section on the home page, fetching Projects from Sanity and rendering featured projects first. Each project shows thumbnail, title, description, Skill badges, and links to live demo and GitHub.

**Blocked by:** 02 — Home page shell + Profile section

**Status:** ready-for-agent

- [ ] GROQ query for Projects (featured-first ordering) in `packages/sanity/queries/`
- [ ] ProjectCard component in `packages/ui` (thumbnail, title, description, badges, live/GitHub links)
- [ ] ProjectGrid component in `packages/ui`
- [ ] Projects section added to the home page (third position)
- [ ] Integration test updated with Projects fixture and assertions
