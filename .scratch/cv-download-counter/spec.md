Status: completed

# CV download counter

## Problem Statement

There is no visibility into how often the CV is downloaded from the portfolio. The site owner wants a simple counter of CV downloads, persisted in Sanity alongside the Profile, incremented whenever a visitor clicks a "Download CV" button.

## Solution

Add a `downloads` number field to the Sanity `profile` schema. Expose it via the profile query and `ProfileData` type. Add a Next.js API route (`/api/cv-download`) that increments the counter using a Sanity write token. Wire both "Download CV" buttons (hero and contact section) to fire a POST to that route on click (fire-and-forget, `keepalive`).

## Out of Scope

- Public display of the count on the page (tracked only).
- Rate limiting / per-visitor dedup.
- Astro frontend parity (separate effort, ADR-0001).

## Comments
