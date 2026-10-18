# 20 — Align Sanity dependency family after v6 bump

**What to build:** Complete the Sanity v6 family alignment that the manual bump (`a7c8bde`) left partial. The Studio core (`sanity`) is on `^6.19.0`, but the sibling libraries the frontend and shared package use are still on v3/v6/v1 ranges, the peer-dependency range is stale, and the root Node engine floor is still v18.

**Blocked by:** (none)

**Status:** completed

## Checklist

- [x] `packages/sanity/package.json`:
  - [x] `dependencies["@sanity/client"]`: `^6.24.0` → `^8.9.0`
  - [x] `dependencies["groq"]`: `^3.68.0` → `^6.19.0`
  - [x] `peerDependencies["sanity"]`: `^3.68.0` → `^6.0.0`
- [x] `apps/nextjs/package.json`:
  - [x] `dependencies["@sanity/image-url"]`: `^1.1.0` → `^2.1.1`
- [x] Migrate the `@sanity/image-url` v2 import breakage — v2 removed the `@sanity/image-url/lib/types/types` subpath, so `SanityImageSource` must come from the main entry:
  - [x] `apps/nextjs/src/components/JobCard.tsx`
  - [x] `apps/nextjs/src/components/ProjectCard.tsx`
  - [x] `apps/nextjs/src/components/CertificationCard.tsx`
  - [x] `apps/nextjs/src/lib/skill-groups.ts`
  - [x] `apps/nextjs/src/lib/sanity.ts`
  - In each, change `import type { SanityImageSource } from "@sanity/image-url/lib/types/types"` → `import type { SanityImageSource } from "@sanity/image-url"`.
- [x] Root `package.json`: `engines.node`: `>=18` → `>=22.12` (sanity v6 requirement; Vercel reads this for the Next.js build node version).
- [x] `pnpm install` to refresh the lockfile; confirm `@sanity/client`, `groq`, `@sanity/image-url` resolve to the new majors.
- [x] Verify: `pnpm typecheck && pnpm build && pnpm test` green; `pnpm --filter @portfolio/studio build` green; `pnpm --filter @portfolio/studio dev` boots without the "update available" banner.

## Notes

- `createClient`/`SanityClient` (`@sanity/client`) and the `groq` default export are unchanged across these majors, so `packages/sanity/src/client.ts` and `packages/sanity/src/queries/index.ts` need no edits.
- `sanity` itself stays at `^6.19.0` (already bumped in `a7c8bde`); do not downgrade.
- The `apiVersion: "2024-01-01"` in `packages/sanity/src/client.ts` is fine for client v8; leave as-is.

## Comments

- Implemented in commit `2d28030` on `fix/post-release-chores`: aligned @sanity/client→^8.9.0, groq→^6.19.0, peer sanity→^6.0.0, @sanity/image-url→^2.1.1, engines.node→>=22.12; migrated image-url imports and default export to createImageUrlBuilder. Verified typecheck/build/test/studio build green.
