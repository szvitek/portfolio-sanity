Status: ready-for-agent

# Portfolio MVP

## Problem Statement

I am a developer with a portfolio of work, a career history, educational background, credentials, and a set of technical Skills. I have no public face for any of this — no single place where a recruiter, collaborator, or curious visitor can learn who I am, what I do, and what I've built. I need a clean, modern portfolio site that presents all of this in one place, and I need to be able to update its content without touching code.

## Solution

A developer portfolio site powered by Sanity CMS (content management) and rendered by a Next.js frontend. Content entry happens in the Sanity Studio; the frontend fetches and displays it. The site is a single-page layout with stacked sections: Profile → Skills → Projects → Jobs → Studies → Certifications. I (the owner) manage all content through Sanity's studio. A contact feature allows visitors to reach me.

## User Stories

1. As a visitor, I want to see a hero section with the developer's name, title, and bio, so that I can immediately understand who they are and what they do.
2. As a visitor, I want to see a list of the developer's technical Skills with category grouping and visual icons, so that I can quickly assess their expertise areas.
3. As a visitor, I want to see the developer's featured Projects first, so that I can see their best work prominently.
4. As a visitor, I want to browse all Projects with title, description, thumbnail, and tech badges, so that I can understand what they've built.
5. As a visitor, I want to click through to a Project's live demo and source code, so that I can see the work in action and examine the code.
6. As a visitor, I want to see the developer's Job history in chronological order, so that I can understand their professional trajectory.
7. As a visitor, I want to see the company name, role, dates, description, website link, and Skills used for each Job.
8. As a visitor, I want to see the developer's Studies in chronological order, so that I can understand their educational background.
9. As a visitor, I want to see the institution, field of study, and date range for each Study.
10. As a visitor, I want to see the developer's Certifications with title, issuer, date earned, and link to verify, so that I can validate their credentials.
11. As a visitor, I want to see social links (GitHub, LinkedIn, Email) so that I can connect with the developer on other platforms.
12. As a visitor, I want to download the developer's CV as a PDF, so that I can save their professional profile.
13. As a visitor, I want to send a message to the developer via a contact form or email link, so that I can reach out about opportunities or collaboration.
14. As the site owner, I want to edit my Profile (bio, avatar, title, subtitle, social links, CV) through the Sanity Studio, so that I can update my information without code changes.
15. As the site owner, I want to add, edit, reorder, and remove Skills with images and categories through the Studio, so that my Skills section stays current.
16. As the site owner, I want to add, edit, reorder, and remove Projects with all their fields through the Studio, so that my portfolio grows with my work.
17. As the site owner, I want to mark Projects as featured so that the best ones appear first, so that visitors see my strongest work prominently.
18. As the site owner, I want to add, edit, reorder, and remove Jobs with all their fields and Skill references through the Studio, so that my career history stays accurate.
19. As the site owner, I want to add, edit, reorder, and remove Studies through the Studio, so that my education history stays accurate.
20. As the site owner, I want to add, edit, reorder, and remove Certifications through the Studio, so that my credentials stay current.
21. As the site owner, I want to upload my CV as a file in Sanity attached to my Profile, so that visitors always download the latest version.
22. As the site owner, I want the site to be performant and statically rendered where possible, so that visitors get fast load times.
23. As a developer building the site, I want the Sanity schemas and GROQ queries in a shared package, so that future frontends (Astro) can reuse them without duplication.
24. As a developer building the site, I want shared UI components in a dedicated package, so that the Next.js app and any future frontend consume the same visual elements.
25. As a developer building the site, I want shared Tailwind theme tokens in a dedicated package, so that both frontends maintain visual consistency.

## Implementation Decisions

### Monorepo structure

The project uses a pnpm-workspace monorepo with three app packages and three library packages:

- **apps/studio** — The Sanity Studio, deployed separately. Contains no custom logic beyond the schema definitions imported from `packages/sanity`.
- **apps/nextjs** — The primary frontend. Uses GridCN components, fetches data from Sanity via GROQ queries exported from `packages/sanity`.
- **apps/astro** — Not built in this MVP. Created later as a learning project to replace Next.js.
- **packages/sanity** — Shared Sanity code: document schemas, GROQ query strings/functions, TypeScript types generated from the schema, and a configured Sanity client.
- **packages/ui** — Shared React components. Each component is a composition of GridCN primitives. Both frontends install this package.
- **packages/tailwind-config** — Shared Tailwind CSS configuration with the GridCN theme tokens (OKLCH color palette, spacing scale, typography).

### Sanity document schemas

Six document/object types. Each collection document uses `order` for manual sorting and `publishedAt` for display ordering.

**Profile** (singleton, `singleton` plugin):
- `title` (string) — name / display heading
- `subtitle` (string) — tagline / role
- `bio` (portable text) — full bio with rich formatting
- `avatar` (image)
- `email` (string) — used for contact mailto fallback
- `cv` (file) — PDF upload
- `socialLinks` (array of Social Link objects)

**Social Link** (embedded object):
- `platform` (string, predefined list: `github`, `linkedin`, `email`)
- `url` (string)

**Skill** (collection):
- `name` (string)
- `image` (image) — icon/logo
- `category` (string, predefined list: Frontend, Backend, DevOps, Languages, Tools, Databases)

**Job** (collection):
- `company` (string)
- `role` (string)
- `startDate` (date)
- `endDate` (date, optional)
- `description` (portable text or plain text)
- `website` (url)
- `skills` (array of references to Skill)
- `order` (number)

**Study** (collection):
- `institution` (string)
- `field` (string)
- `startDate` (date)
- `endDate` (date)
- `description` (text)
- `order` (number)

**Certification** (collection):
- `name` (string)
- `date` (date)
- `url` (url)
- `thumbnail` (image)
- `order` (number)

**Project** (collection):
- `title` (string)
- `description` (portable text or plain text)
- `thumbnail` (image)
- `skills` (array of references to Skill — one-directional badges)
- `liveUrl` (url)
- `githubUrl` (url)
- `featured` (boolean)
- `order` (number)

### Data fetching

GROQ queries live in `packages/sanity/queries/`. The Next.js frontend uses `getStaticProps` to fetch data at build time (ISR where updates are needed). Each section of the page queries its own document type. A single page query fetches all data needed for the home page in one request where possible.

### Frontend page structure

Single page, sections rendered in order:
1. Profile hero (avatar, title, subtitle, bio, social links, CV download)
2. Skills (carousel or grid, grouped by category)
3. Projects (featured first, then all, with badges)
4. Jobs (chronological, with Skill badges and company links)
5. Studies (chronological)
6. Certifications (grid with thumbnails and verification links)
7. Contact (mailto fallback initially; form backend deferred)

### Component inventory (packages/ui)

- `ProfileCard` — hero section with avatar, name, tagline, social icons, CV button
- `SkillCarousel` / `SkillGrid` — category-grouped skill display
- `ProjectCard` — thumbnail, title, description, badges, action links
- `ProjectGrid` — grid layout for projects, featured first
- `JobTimeline` — chronological timeline of Job entries
- `StudyList` — chronological list of Studies
- `CertificationCard` — thumbnail, title, issuer, date, link
- `CertificationGrid` — grid layout for certifications
- `SocialLinkIcon` — resolves platform enum to icon component
- `SkillBadge` — small badge with Skill name and icon
- `ContactSection` — mailto link or form depending on backend decision

## Testing Decisions

### What makes a good test

Tests validate that each page section renders correctly given known Sanity data. They do not test Sanity itself (the Studio validates schemas), nor do they test individual GridCN components (that library is trusted). Tests focus on the composition: GROQ query shape → component rendering.

### Testing seam

A single page-level integration seam. Each page (initially just the home page) gets a test that:
1. Mocks the Sanity client at the module boundary
2. Feeds a fixture matching the GROQ query return shape
3. Renders the full page via Next.js's render utility
4. Asserts key content (titles, badges, links, images) appears in the rendered output

The mock replaces `packages/sanity`'s client export with a test double. Fixtures live alongside the test file, shaped to match the GROQ query response.

### Modules tested

- Next.js page components (the single-page home route)
- Shared page-section components in `packages/ui` via their usage in pages

No separate component-level tests — page-level coverage exercises all components in their real arrangement.

### Prior art

No prior tests exist in this repository. This spec establishes the pattern.

## Out of Scope

- The Astro frontend — not built in this MVP; created later as a separate effort.
- The contact form backend — deferred; the MVP uses a mailto link. Resend, Sanity submissions, or a serverless function are evaluated separately.
- Dark mode / theme switching — not specified; the GridCN theme tokens can support it later without schema changes.
- Blog / writing section — not requested; may be added as a future feature.
- Analytics — not specified; can be added independently.
- SEO meta tags beyond basics — deferred; the Next.js app gets minimal `next/head` metadata.
- Accessibility auditing — follow GridCN's defaults; no custom a11y work in scope.
- Mobile responsiveness — assumed via Tailwind responsive utilities and GridCN defaults; no custom responsive design work.
- Search or filtering — not needed for a single-page portfolio of this size.
- Multi-language / i18n — not needed.

## Further Notes

- The contact form backend decision is deferred. When chosen, it should be added to Profile (e.g., a `contactEmail` field for Resend, or a reference to a form backend config document) and the ContactSection component updated accordingly.
- Sanity schema changes (adding a field, renaming a category) are expected and easy — they require a schema change in `packages/sanity` and a corresponding update to the GROQ query and component props. No migration scripts are needed for additive changes.
- ADR-0001 documents the two-frontend replacement strategy (Next.js → Astro). The shared package structure (`packages/sanity`, `packages/ui`, `packages/tailwind-config`) is designed to make that transition feasible.
