# 17 — Final polish

**What to build:** Catch-all ticket for remaining UI adjustments, responsiveness fixes, edge cases, and any loose ends discovered during implementation. The exact items are TBD — fill in the checklist as you find them.

**Blocked by:** 13 — Schema additions, 14 — Hero section upgrade, 15 — Sections polish, 16 — Contact form with Resend

**Status:** completed

**Branding (swytech.dev):**
- [x] Set the `swytech-dev-logo` icon (added to the root of `apps/nextjs`) as the site favicon
- [x] Place the logo somewhere on the page — contact form and/or footer
- [x] Change the `[ alert ]` badge text in the hero to `[ SWYTECH.DEV ]`

**Borders:**
- [x] Fix border imbalance — hero has a thin border while other sections have heavy glowing borders

**Footer:**
- [x] Rename footer header to `swytech.dev` — the logo would fit here

## Comments

Implemented via commit `1c37ee0`.

- Favicon: `swytech-dev-logo.png` moved to `apps/nextjs/public/` and linked via `<link rel="icon">` in `_document.tsx`.
- Logo placed in the footer brand column (next to `//swytech.dev`) via a new optional `logo` prop on `TronFooter`.
- Hero badge: `AnomalyBanner` gained a `label` prop (default `[ ALERT ]`); the page passes `label="[ SWYTECH.DEV ]"` so the gridcn component stays brand-agnostic.
- Footer header: `TronFooter brand="PORTFOLIO"` → `brand="swytech.dev"` on the home page.
- Border balance: added `[data-slot="tron-hero-section"]` to the `--tron-border-glow` list in `globals.css` so the hero matches the other sections' heavy glowing borders.
- Tests: footer shows `//swytech.dev` + logo image, and hero shows `[ SWYTECH.DEV ]` (TDD at the two agreed seams).
