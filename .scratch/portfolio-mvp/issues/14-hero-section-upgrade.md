# 14 — Hero section upgrade: 2-column layout, availability indicator, consistent widths

**What to build:** Restructure the hero section into a 2-column layout. Left column: title, subtitle, description, action buttons. Right column: profile picture with an availability status indicator (green/yellow/red dot + label based on Profile.availability). The hero takes full viewport height. The remaining sections below hero use a consistent `max-w-5xl` width constraint.

Keep the existing portfolio badge from the prototype as-is.

**GridCN components:** `hero-section` (already copied from upstream), `signal-indicator`

**Blocked by:** 13 — Schema additions

**Status:** ready-for-agent

- [ ] Restructure hero to 2-column layout (left: title, subtitle, description, buttons; right: avatar + status indicator)
- [ ] Availability status indicator component: green dot + "Ready to work" / yellow + "Small projects only" / red + "Not available" based on `Profile.availability`
- [ ] Hero takes full viewport height (`min-h-screen`)
- [ ] All non-hero sections wrapped in a consistent `max-w-5xl mx-auto` container
- [ ] Keep existing portfolio badge styling as-is
- [ ] Integration test updated with new hero structure
