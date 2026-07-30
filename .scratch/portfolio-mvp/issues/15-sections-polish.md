# 15 — Sections polish: badge grouping, sorting, projects show-all, GridCN integration, hero UI

**What was built:** Multiple polish changes across sections:

### Projects
- **3-column grid** (was 2), **"Show All" toggle** (initially shows featured only, clicking reveals all)
- Fallback icon/placeholder for missing images
- Enter animation on card reveal

### Jobs
- Sorted by `startDate` descending (most recent first)
- Replaced basic card with **JobCard** using `@thegridcn/circuit-background` (animated)
- **Highlights** rendered via `@thegridcn/changelog` with category badges
- Job schema updated: `highlights` as object array (title, description, category dropdown)

### Studies / Education
- Sorted by `startDate` descending
- Replaced study cards with **Timeline** component
- Studies grouped by institution, sub-items sorted newest-first
- Badges for field names, graduation cap SVG icon, dates pushed right

### Certifications
- Sorted by date descending (most recent first)
- Replaced `CertificationCard` with `@thegridcn/bento-grid` (variant="highlight")
- **Links** added: cards with `url` wrap in `<a target="_blank">` with hover overlay ("View Certificate →")
- Icon container enlarged (`h-12 w-12`), `bg-neutral-100`, image fills container

### Badges (on Projects + Jobs)
- Grouped by Skill category, sorted alphabetically within group, gap between group

### Skills
- Filtered to **featured** Skills only, sorted by name within category
- Filter buttons to switch categories

### Hero Section
- Border sweeps: animated top/bottom sweeps via CSS `::before`/`::after` (transform-based)
- Side borders: gradient fade from corners with gap, theme-aware (`var(--primary-rgb)`)
- Scan line: vertical scan (horizontal line moving up/down) at 7s, confined to content area
- Corner decorations: L-shaped brackets at all four corners
- Grid background: 3D perspective grid
- Scanline overlay: repeating horizontal scan lines
- Radial gradient glow in background

### Theme / UI Polish
- **Boot overlay**: `BootOverlay.tsx` wrapping `BootSequence` on load
- **ThemeControls**: floating theme/intensity controls
- **Footer**: replaced CTABanner+StatusBar with custom `TronFooter` (3-column grid: brand, links, status; square grid pattern background)
- **Contact section**: `#contact` section with `Divider` + `NewsletterForm`
- **Divider component**: fixed `bg-primary/20` → `bg-primary-200` for oklch compatibility; `variant="circuit"` for section headers
- **BentoGrid hover sweep**: CSS-only `::after` pseudo-element, 1.8s linear infinite alternate
- **Scrollbar**: GridCN website styles (thin, primary-colored thumb with glow)
- **Glow effects**: removed pulsing glow animation (`tron-glow-pulse`) from components; kept static box-shadow border glows
- Hero sweeps/side-borders always visible regardless of intensity setting

**Tests:** 63 passing — updated data-slot selectors for new component types

**Status:** done

**Commit:** a2d8eac
