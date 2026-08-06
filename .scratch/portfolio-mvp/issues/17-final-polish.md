# 17 — Final polish

**What to build:** Catch-all ticket for remaining UI adjustments, responsiveness fixes, edge cases, and any loose ends discovered during implementation. The exact items are TBD — fill in the checklist as you find them.

**Blocked by:** 13 — Schema additions, 14 — Hero section upgrade, 15 — Sections polish, 16 — Contact form with Resend

**Status:** in progress

**Branding (swytech.dev):**
- [x] Set the `swytech-dev-logo` icon (added to the root of `apps/nextjs`) as the site favicon
- [x] Place the logo somewhere on the page — contact form and/or footer
- [x] Change the `[ alert ]` badge text in the hero to `[ SWYTECH.DEV ]`
- [x] Add the logo + `swytech.dev` to the header (NavBar), pushing the menu items to the right

**Borders:**
- [x] Fix border imbalance — hero has a thin border while other sections have heavy glowing borders

**Footer:**
- [x] Rename footer header to `swytech.dev` — the logo would fit here

**New scope:**
- [ ] Revisit button components — should we use the original GridCN buttons?
- [ ] Finalise the footer
- [ ] Background music feature — store 1+ audio files in Sanity, add the GridCN waveform component

## Comments

Implemented via commit `1c37ee0`.

- Favicon: `swytech-dev-logo.png` moved to `apps/nextjs/public/` and linked via `<link rel="icon">` in `_document.tsx`.
- Logo placed in the footer brand column (next to `//swytech.dev`) via a new optional `logo` prop on `TronFooter`.
- Hero badge: `AnomalyBanner` gained a `label` prop (default `[ ALERT ]`); the page passes `label="[ SWYTECH.DEV ]"` so the gridcn component stays brand-agnostic.
- Footer header: `TronFooter brand="PORTFOLIO"` → `brand="swytech.dev"` on the home page.
- Border balance: added `[data-slot="tron-hero-section"]` to the `--tron-border-glow` list in `globals.css` so the hero matches the other sections' heavy glowing borders.
- Tests: footer shows `//swytech.dev` + logo image, and hero shows `[ SWYTECH.DEV ]` (TDD at the two agreed seams).
- Header: `NavBar` now renders the logo + `swytech.dev` brand linking to `#profile` on the left, and the section menu is pushed to the right (`justify-between`) — commit `d60e7a7`.
