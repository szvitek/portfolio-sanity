# 07 — Certifications section

**What to build:** The Certifications section on the home page, fetching Certifications from Sanity. Each certification shows thumbnail, title, date earned (year only), and a verification link in a card grid.

**GridCN components from prototype:** `feature-card` (not used — custom CertificationCard used instead, matching JobCard/StudyCard pattern)

**Blocked by:** 02 — Home page shell + Profile section, 10 — Theme system

**Status:** done

- [x] GROQ query for Certifications in `packages/sanity/queries/`
- [x] Certifications section using a grid of CertificationCards with thumbnail, title, date, and verification link
- [x] Certifications section added to the home page (sixth position)
- [x] Integration test updated with Certifications fixture and assertions

**Notes:**
- Issuer field not needed for now — omitted from component and Sanity schema
- Used custom CertificationCard instead of FeatureCard to match existing card patterns
