# 01 — Monorepo foundation + Sanity Studio

**What to build:** The entire project scaffold — pnpm workspace, TypeScript configs, `packages/tailwind-config` with GridCN theme tokens, `packages/sanity` with all six Sanity document schemas (Profile, Skill, Job, Study, Certification, Project plus the Social Link embedded object), and `apps/studio` running the Sanity Studio with those schemas imported. After this ticket, content can be entered in the Studio, and the shared package structure is ready for frontend tickets to consume.

**Blocked by:** None — can start immediately.

**Status:** completed

- [x] pnpm workspace root with `pnpm-workspace.yaml`, root `package.json`, `.gitignore`, root `tsconfig.json`
- [x] `packages/tailwind-config` — GridCN theme tokens (OKLCH palette, spacing, typography config as Tailwind preset)
- [x] `packages/sanity` — all document schemas: Profile (singleton), Skill, Job, Study, Certification, Project, plus Social Link embedded object, with a configured Sanity client and GROQ query stubs
- [x] `apps/studio` — Sanity Studio app importing schemas from `packages/sanity`, deployable independently
- [x] TypeScript shared config that all packages extend
