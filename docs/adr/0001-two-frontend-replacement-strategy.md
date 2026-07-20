# Frontend-replaceable architecture — Next.js first, Astro as post-MVP replacement

The frontend starts as a Next.js app — the developer's comfort zone — with a deliberate plan to rebuild it in Astro as a learning project once the MVP is stable. Both frontends share the same Sanity content, a shared UI package (`packages/ui`), a shared Sanity client library (`packages/sanity`), and a shared Tailwind theme (`packages/tailwind-config`). The shared packages make a future swap feasible without rewriting queries or components from scratch. When Astro is production-ready, it replaces Next.js as the deployed surface; the Next.js app remains in the repo as reference.

This is unusual — maintaining two frontends for an MVP-sized portfolio — but the alternative (rebuild from scratch when learning Astro) wastes more time than maintaining the shared abstraction up front.
