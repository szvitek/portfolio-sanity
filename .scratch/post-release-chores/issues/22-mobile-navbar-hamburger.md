# 22 — Mobile navbar: hamburger menu + overflow fix

**What to build:** Replace the always-visible inline section links in `apps/nextjs/src/components/NavBar.tsx` with a hamburger toggle on mobile, following the Gridcn landing-template pattern: desktop links `hidden md:flex`, a `md:hidden` hamburger button toggling an inline `md:hidden` panel below the nav bar, with `Menu`/`X` from `lucide-react` and close-on-link-click. This also cures the mobile horizontal overflow (the "content occupies ~60% on the left, empty space on the right" symptom), because the 7 inline links (min-content ≈ 720px) no longer force the page wider than the viewport.

**Blocked by:** (none)

**Status:** completed

## Checklist

- [x] `NavBar.tsx`: add `const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)`.
- [x] Desktop links container: `hidden items-center gap-6 md:flex` (replacing the always-visible `flex ... justify-center`).
- [x] Hamburger button: `md:hidden`, `aria-label="Toggle menu"`, toggles state, renders `X` when open / `Menu` when closed.
- [x] Mobile panel: `{mobileMenuOpen && (<div className="border-primary/10 border-t ... md:hidden"> ... links with onClick close ... </div>)}`
- [x] Each mobile link calls `setMobileMenuOpen(false)` on click (anchor navigation).
- [x] Keep the active-section underline, the tracked brand, and the Waveform audio control desktop-only (`hidden md:flex` — already the case for audio).
- [x] Verify the overflow fix: in a mobile viewport (≤430px), `document.documentElement.scrollWidth === window.innerWidth` (no horizontal scroll). Check the production build or dev server.
- [x] Verify: `pnpm --filter @portfolio/nextjs typecheck && pnpm --filter @portfolio/nextjs test` green; NavBar tests (if any) updated.

## Notes

- `Menu` and `X` are already available via `lucide-react` (no new dependency).
- Font-size tweaks on mobile are deliberately deferred — revisit after this lands.
- The `ThemeControls` fixed panel is separate from the navbar and is not part of this change.

## Comments
