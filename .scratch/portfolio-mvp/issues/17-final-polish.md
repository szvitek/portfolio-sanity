# 17 — Final polish

**What to build:** Catch-all ticket for remaining UI adjustments, responsiveness fixes, edge cases, and any loose ends discovered during implementation. The exact items are TBD — fill in the checklist as you find them.

**Blocked by:** 13 — Schema additions, 14 — Hero section upgrade, 15 — Sections polish, 16 — Contact form with Resend

**Status:** resolved

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
- [x] Revisit button components — should we use the original GridCN buttons?
- [x] Skill icons render transparent so each carousel item's category tint shows through
- [x] Hero + contact GitHub/LinkedIn links as outline buttons
- [x] Outline buttons glow only on hover (plain border at rest)
- [x] Navbar: active item keeps a bottom border, other items animate one in on hover
- [x] Brighter text — raised `--foreground` / `--muted-foreground` lightness in `globals.css`
- [x] Finalise the footer
- [x] Background music feature — store 1+ audio files in Sanity, add the GridCN waveform component

## Comments

**Button components (implemented):** Yes — adopt the GridCN button. `pnpm dlx shadcn@latest add @thegridcn/button` resolved to the existing `src/components/ui/button.tsx` (byte-identical, so the CLI skipped writing it). Every `<button>` rendered on the page now uses that `Button` component: the skills filter buttons and projects "Show All/Show Featured" toggle in `pages/index.tsx` (via `variant="outline"`), the ContactForm submit button, and the 10 theme/glow swatches in `ThemeControls.tsx` (via `variant="ghost"`, kept as small round dots). The two "Download CV" anchors are now `<Button asChild><a>` so they inherit the button's styling and focus/disabled behaviour. Existing button visuals were preserved through className overrides (`FILTER_BTN`/`FILTER_ACTIVE`/`FILTER_INACTIVE`/`CATEGORY_BTN`/`CV_BTN` constants). GridCN library components that aren't rendered on the page (cta-banner, tag, chip, newsletter-form, tabs, ThemeDots) still use their own internal buttons. Tests assert `data-slot="button"` on each converted control (TDD at the button seam).

**Button variants (regression fix):** The skills category buttons and the projects toggle were `variant="outline"`, which meant the tron rules in `globals.css` (`[data-tron-intensity] [data-slot="button"][data-variant="outline"]`, 0-3-0 specificity) overrode the per-category Tailwind color classes (`border-sky-500/30`, `text-sky-500/60`, …) whenever glow was on. Switched those buttons to `variant="ghost"` — the tron rules only restyle `default` and `outline`, so the category colors now show through with glow on, and visuals are identical with glow off. The `FILTER_*`/`CATEGORY_BTN` hover overrides were kept because ghost still carries `hover:bg-muted hover:text-primary`. Tests updated to assert `data-variant="ghost"` on the skills "All" button and the projects toggle.

**Semantic color opacity bug (root-cause fix):** The "All"/"Featured" filter buttons had no active background because `bg-primary/20` (and `border-primary/60`) compiled to *nothing*: the `@portfolio/tailwind-config` preset mapped semantic colors (`primary`, `foreground`, `background`, `card`, `border`, `muted`, …) to a raw CSS variable string (`var(--primary)`), and Tailwind 3.4 silently drops the `/XX` opacity variant for those. The same bug silently affected dozens of utilities across the app (`text-foreground/50`, `bg-card/80`, `border-border/30`, the theme-switch intensity dots' `bg-primary/40`/`bg-primary/70`, the default button's `hover:bg-primary/80`, …). Category buttons worked only because `sky/emerald/…` are built-in palette colors. Fixed in the preset by wrapping every semantic color as `oklch(from var(--x) l c h / <alpha-value>)` — the same pattern already used for the numbered `primary-50..700` scale, so no CSS variable or component change was needed. Verified: Tailwind CLI probe + clean `next build` now emit `.bg-primary\/20`, `.border-primary\/60`, etc. (was previously absent from the production CSS). Note: this also restores the *intended* partial-opacity look for anything using semantic-color opacity utilities (they previously fell back to full opacity/transparent).

**Skill icon background (visual fix):** The skill logos in the carousel originally had a hardcoded `bg-background/80` backdrop (added because some logos are too dark), then briefly the category tint (`skillBadgeClasses(category).bg`, e.g. `bg-sky-500/20`). Layering that 20% icon background on top of the carousel item's own 20% tint composites to ~36% — visually indistinguishable from the item's 40% border color. Removed the icon's own background entirely so the item's single tint is all that shows behind the logo; test re-scoped to assert skill icons carry no `bg-*` class.

**Social links as outline buttons:** GitHub and LinkedIn links in the hero and contact sections now render as GridCN `Button asChild variant="outline"` (icon + "GitHub"/"LinkedIn" label) instead of bare icon anchors. Extracted a bare `SocialIcon` (svg-only, no anchor) from `SocialLinkIcon` so it can live inside the button's anchor without nesting `<a>` elements; non-github/linkedin platforms keep the plain `SocialLinkIcon`. Tests: new "renders hero and contact social links as outline buttons" (TDD at the button seam); two project-GitHub tests hardened to match by href instead of bare text since the hero now also shows the word "GitHub".

**Outline button glow (hover-only):** The generic "Button glow" rule in `globals.css` gives *every* `[data-slot="button"]` `box-shadow: var(--tron-border-glow)` at rest. Outline buttons therefore glowed constantly despite the outline rule defining only their border. Added `box-shadow: none` to `[data-variant="outline"]`'s default state so outline buttons keep their border but glow only on hover (the outline `:hover` rule already had its own glow). Confirmed in the compiled production CSS.

**Navbar active/hover underline (gridcn pattern):** The nav section items now follow the gridcn navbar behaviour — each link is `group relative` with an absolutely-positioned `h-px bg-primary` underline span (`absolute inset-x-2 bottom-0 transition-transform`). The active section keeps it visible (`scale-x-100`); the others hide it (`scale-x-0`) and animate it in on hover (`group-hover:scale-x-100`, 150ms transform transition). Pure Tailwind scaleX animation, no custom keyframes — matches the gridcn site exactly (confirmed by inspecting the gridcn homepage markup). TDD: new test asserts every section link carries the underline span, the active (profile) link is `scale-x-100`, and the rest are `scale-x-0 group-hover:scale-x-100`.

**Brighter text (CSS-variable lift):** Secondary text across the page read too dim against the near-black background. Initially tried remapping the `text-foreground/XX` opacity ladder class-by-class (~32 files), but that's a lot of diff for a purely aesthetic change, so it was reverted in favour of a one-file tweak: brightened `--foreground` (`oklch(0.95 …)` → `oklch(0.98 …)`) and `--muted-foreground` (`oklch(0.65 0 0)` → `oklch(0.75 0 0)`, ares `0.6` → `0.7`) in `globals.css`. `--foreground` was already ~95% white, so the headroom is small — the lift is subtler than the class remap would have been (a 50%-alpha utility over L0.06 background can't reach the same composite as raising alpha to 70% even with pure white). Can be fine-tuned per-element afterwards if any spot still reads too dim. Styling-only — no test seam.

**Project card polish (commits `b9de1a0`, `7c64cba`, `07b2409`, `7344406`):** The Projects section cards now fill their grid row (`flex h-full flex-col`) so all cards in a row are equal height, and the action-button row is bottom-anchored with the buttons growing to fill it (`flex-1` — one button spans full width, two split evenly). Description text is `text-justify`. The category-colored skill badges render inside the existing `@thegridcn/marquee` component (`variant="subtle"`, `speed="fast"`, pauses on hover) so they stay on a single line and auto-scroll with fade edges. The earlier word-count clamp with a Read more/less toggle was reverted per user request (`fcf8fd7`) — descriptions render in full.


Implemented via commit `f4a0ea0`.

- Favicon: `swytech-dev-logo.png` moved to `apps/nextjs/public/` and linked via `<link rel="icon">` in `_document.tsx`.
- Logo placed in the footer brand column (next to `//swytech.dev`) via a new optional `logo` prop on `TronFooter`.
- Hero badge: `AnomalyBanner` gained a `label` prop (default `[ ALERT ]`); the page passes `label="[ SWYTECH.DEV ]"` so the gridcn component stays brand-agnostic.
- Footer header: `TronFooter brand="PORTFOLIO"` → `brand="swytech.dev"` on the home page.
- Border balance: added `[data-slot="tron-hero-section"]` to the `--tron-border-glow` list in `globals.css` so the hero matches the other sections' heavy glowing borders.
- Tests: footer shows `//swytech.dev` + logo image, and hero shows `[ SWYTECH.DEV ]` (TDD at the two agreed seams).
- Header: `NavBar` now renders the logo + `swytech.dev` brand linking to `#profile` on the left, and the section menu is pushed to the right (`justify-between`) — commit `d60e7a7`.
