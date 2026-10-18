# 21 — Add Vercel Analytics to the Next.js app

**What to build:** Wire up Vercel Analytics (cookieless, GDPR-friendly) on the Next.js frontend. Analytics only — Speed Insights is explicitly out of scope.

**Blocked by:** (none)

**Status:** ready-for-agent

## Checklist

- [ ] `pnpm --filter @portfolio/nextjs add @vercel/analytics`
- [ ] `apps/nextjs/src/pages/_app.tsx`: import `{ Analytics } from "@vercel/analytics/react"` and render `<Analytics />` inside the `ThemeProvider` (after `<Component {...pageProps} />` or alongside it).
- [ ] Enable Analytics in the Vercel project dashboard (Project → Analytics → Enable) so the token is provisioned.
- [ ] Verify: `pnpm --filter @portfolio/nextjs typecheck && pnpm --filter @portfolio/nextjs build` green; production deploy shows the Analytics script in the page source and data appears in the Vercel dashboard after a visit.

## Notes

- Pages Router import path is `@vercel/analytics/react` (not the App Router `@vercel/analytics/next`).
- No cookie consent banner needed — Vercel Analytics is cookieless.

## Comments
