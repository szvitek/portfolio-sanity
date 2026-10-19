# 25 — Next.js: optimize Sanity images with next/image

**What to build:** Replace raw `<img>` tags that use `urlFor(...).url()` with `next/image`, using the Sanity image URL as `src` and explicit width/height (or `fill` where appropriate). Configure `images.remotePatterns` for `cdn.sanity.io` (already present). Optionally use `next-sanity`'s `useNextSanityImage` in client components.

**Blocked by:** (none)

**Status:** ready-for-agent

## Checklist

- [ ] Avatar in hero uses `next/image` with 120×120.
- [ ] Skill badges (16×16 / 32×32) use `next/image`.
- [ ] Project thumbnails (600×340) use `next/image`.
- [ ] Certification thumbnails (48×48) use `next/image`.
- [ ] Job logos (96×96) use `next/image`.
- [ ] Tests updated for `next/image` (still renders `img` with alt).

## Notes

- Keep `urlFor` from `@/lib/sanity` for URL generation.
- `cdn.sanity.io` already allowed in `next.config.js`.

## Comments
