# 12 — Profile hero upgrade (replace plain card with GridCN HeroSection)

**What to build:** Replace the existing plain `ProfileCard` with the GridCN `HeroSection` component (from upstream GitHub — not in the registry), featuring grid background pattern, scanline overlay, radial glow, animated scanline, badge with pulsing dot, subtitle, title with underline accent bars, description, and CTA buttons. Also add the round avatar, social link icons, and CV download button as part of the hero layout.

The `HeroSection` component lives in the upstream repo at `github.com/educlopez/thegridcn-ui` under `src/components/thegridcn/hero-section.tsx`. It is not available via the CLI registry — copy it into `packages/ui/src/components/thegridcn/` or into `apps/nextjs/src/components/thegridcn/`.

**GridCN components from prototype:** `hero-section` (copied from upstream), `button`, `signal-indicator`

**Blocked by:** 10 — Theme system

**Status:** ready-for-agent

- [ ] Copy `hero-section.tsx` and its CSS from upstream GridCN GitHub repo into the project
- [ ] Replace `ProfileCard` with `HeroSection` composed with avatar, title, subtitle, bio, social link icons, CV download button
- [ ] Integration test updated with new hero profile assertions
