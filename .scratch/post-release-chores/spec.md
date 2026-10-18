Status: ready-for-agent

# Post-release chores

## Problem Statement

The Portfolio MVP is deployed to Vercel (issues 18 and 19 complete), but a handful of follow-up tasks surfaced after the first production deploy: the Sanity dependency family is only partially bumped to v6, the mobile layout has horizontal overflow, there is no analytics, the repo is still private, and the Sanity revalidation webhook is not yet configured. These are tracked here as separate tickets.

## Solution

A set of independent, small tickets covering: completing the Sanity v6 family alignment, adding Vercel Analytics, fixing the mobile navbar (which also cures the horizontal-overflow layout issue), adding an MIT license and public-repo readiness, and setting up/verifying the Sanity revalidation webhook.

## Out of Scope

- Font-size tweaks on mobile — deferred; revisit after the mobile navbar fix lands.
- Speed Insights (Vercel) — explicitly declined; Analytics only.
- Astro frontend — separate effort (ADR-0001).

## Comments
