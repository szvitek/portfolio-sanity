# 11 — NavBar + StatusBar page chrome

**What to build:** A sticky navigation bar with `IntersectionObserver`-based active section highlighting, plus `StatusBar` components at the top and bottom of the page. The nav links scroll to each page section (Profile, Skills, Projects, Jobs, Studies, Certifications, Contact).

**GridCN components from prototype:** `status-bar` (top/bottom chrome with decorative elements), `uplink-header` or custom sticky nav with internal `IntersectionObserver` logic.

**Blocked by:** 10 — Theme system

**Status:** ready-for-agent

- [ ] Install `@thegridcn/status-bar` component
- [ ] Sticky NavBar with links to each page section
- [ ] `IntersectionObserver` tracking which section is in view to highlight active nav item
- [ ] `StatusBar` at top of page (above nav) with decorative/chrome elements
- [ ] `StatusBar` at page footer
- [ ] Integration test updated with nav assertion
