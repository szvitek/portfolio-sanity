# Portfolio

A developer portfolio site backed by Sanity CMS. Built as a [pnpm](https://pnpm.io/) monorepo.

## Project structure

```
apps/
  nextjs/      — Next.js frontend (Pages Router)
  studio/      — Sanity Studio v3 CMS
packages/
  sanity/      — Shared Sanity client, schemas, and GROQ queries
  tailwind-config/ — Shared Tailwind CSS preset
  ui/          — Shared React components (ProfileCard, SocialLinkIcon)
```

## Prerequisites

- **Node.js** >= 18
- **pnpm** — install via `npm install -g pnpm` or [corepack](https://nodejs.org/api/corepack.html)

## Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd portfolio-sanity

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp apps/studio/.env.example apps/studio/.env
cp apps/nextjs/.env.example apps/nextjs/.env.local
# Edit both files with your Sanity project ID and dataset
# If your dataset is private, also add a Sanity API token to apps/nextjs/.env.local

A combined `.env.example` is also available at the repo root as a reference.
```

## Running the Studio

```bash
pnpm dev
```

Opens Sanity Studio at `http://localhost:3333`. You must have a Sanity project with the matching dataset to see content.

To publish the Studio for production editing, deploy it to Sanity's hosting with `sanity deploy` (`pnpm --filter @portfolio/studio deploy`). It is then served at a `*.sanity.studio` URL, independent of the Vercel-hosted frontend.

## Running the Next.js app

```bash
pnpm dev:nextjs
```

Opens the frontend at `http://localhost:3000`.

## Other commands

| Command | Description |
|---|---|
| `pnpm build` | Build all packages and apps |
| `pnpm typecheck` | Type-check the entire monorepo |
| `pnpm test` | Run tests (Next.js app) |
| `pnpm test:watch` | Run tests in watch mode |

## Deploying to Vercel

The frontend (`apps/nextjs`) deploys to Vercel; the Sanity Studio is hosted separately (see ["Running the Studio"](#running-the-studio)).

1. Import the repository into Vercel and create a project. The [`vercel.json`](vercel.json) at the repo root sets the framework to Next.js and the root directory to `apps/nextjs`. (You can equally set it manually under Project → Settings → Root Directory.)
2. Configure the environment variables below in the Vercel project (Project → Settings → Environment Variables), using the same values as `apps/nextjs/.env.local`.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | Dataset the frontend reads |
| `SANITY_API_TOKEN` | only if the dataset is private | Server-side, never exposed to the browser |
| `RESEND_API_KEY` | yes (contact form) | Resend API key for `/api/contact` |
| `CONTACT_EMAIL` | yes (contact form) | Where contact submissions are sent |
| `RESEND_FROM` | no | Defaults to `Portfolio Contact <onboarding@resend.dev>` |
| `REVALIDATE_SECRET` | yes (instant content updates) | Guards `/api/revalidate`; also used in the Sanity webhook URL |

### Instant content updates (Sanity webhook)

The home page is statically generated with a 5-minute fallback revalidation. To have Sanity edits appear immediately, add a webhook that pings the revalidation endpoint:

1. Generate a secret and set it as `REVALIDATE_SECRET` in Vercel (e.g. `openssl rand -hex 24`).
2. In the [Sanity Manage Console](https://manage.sanity.io) → your project → **API** → **Webhooks**, create a webhook:
   - **URL:** `https://<your-site>/api/revalidate?secret=<REVALIDATE_SECRET>`
   - **Dataset:** the dataset the frontend reads
   - **Trigger on:** create, update, delete (for Studio-authored edits you can instead use the *publish* action + delete)
   - **HTTP method:** POST
   - **Filter (optional):** scope to the document types the page reads (`profile`, `skill`, `project`, `job`, `study`, `certification`, `backgroundMusic`)

When the webhook fires, the cached page is invalidated and the next visitor request regenerates it.

## Issue tracker

This project uses a local Markdown-based issue tracker. See [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md) for conventions.
