# Portfolio

A developer portfolio site backed by Sanity CMS. Rendered first by Next.js (the comfort-zone frontend); an Astro-based replacement is a post-MVP learning goal.

## Language

**Profile**:
A singleton Sanity document containing personal bio, avatar, title, subtitle, email, social links, and CV file.
_Avoid_: About, About Me

**Skill**:
A Sanity collection document representing a single technology or tool the developer is proficient in. Has a name, image, and category. Referenced by Profile and Projects for skill badges.
_Avoid_: Technology, tool, stack-item

**Job**:
A Sanity collection document representing a position held at an employer over a date range. References Skills used on the job.
_Avoid_: Experience, work-history, career-entry

**Study**:
A Sanity collection document representing an educational program completed at an institution.
_Avoid_: Education, degree, course

**Certification**:
A Sanity collection document representing a credential earned from an external provider (Coursera, freeCodeCamp, etc.), linkable via URL and optionally displaying a thumbnail.

**Project**:
A Sanity collection document representing a portfolio project, with description, thumbnail, links, and Skill badges. Can be marked as featured.

**Social Link**:
An embedded object on Profile with a platform enum (github, linkedin, email) and a URL. Icons are resolved on the frontend by platform, not stored in Sanity.

**GridCN**:
An external, CLI-installable React component library based on shadcn/ui and Tailwind CSS. Components are added per-app via `pnpm dlx shadcn@latest add @thegridcn/<name>`.
_Avoid_: ShadCN (GridCN is the framework-specific fork used here)
