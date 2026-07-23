# 03 — Skills section

**What was built:** The Skills section on the home page with a single `LogoCloud` marquee of all skills, category filter buttons above it, and per-category color coding.

**GridCN components used:** `logo-cloud`

**Blocked by:** 02 — Home page shell + Profile section, 10 — Theme system

**Status:** done

**Changes:**

- [x] GROQ query for Skills in `packages/sanity/queries/` — already existed
- [x] Skills section using `LogoCloud` with 32×32 skill icons, `bg-background/80` so dark icons are visible
- [x] Single marquee (not one per category) — skills distinguished by per-category color tokens (sky/emerald/purple/amber/rose/cyan)
- [x] Category filter buttons above the marquee — outline when inactive, filled with category color when active; "All" uses primary theme
- [x] `LogoCloud` component extended with per-item `className` support (`LogoItem` interface)
- [x] Skills section added to the home page (second position after Profile)
- [x] Integration test updated with Skills fixture and assertions, including filter interaction test
