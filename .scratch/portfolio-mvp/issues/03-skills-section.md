# 03 — Skills section

**What to build:** The Skills section on the home page, fetching Skills from Sanity and displaying them grouped by category in a looping `LogoCloud` marquee with 48×48 skill icons.

**GridCN components from prototype:** `logo-cloud`, `tag`

**Blocked by:** 02 — Home page shell + Profile section, 10 — Theme system

**Status:** done

- [x] GROQ query for Skills in `packages/sanity/queries/` — already existed
- [x] Install `@thegridcn/logo-cloud` component — already existed as local component
- [x] Skills section using `LogoCloud` with skill icons as marquee items, grouped by category heading
- [x] Skills section added to the home page (second position after Profile)
- [x] Integration test updated with Skills fixture and assertions
