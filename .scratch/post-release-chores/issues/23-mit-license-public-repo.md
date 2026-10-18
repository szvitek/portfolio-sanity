# 23 — Add MIT license and public-repo readiness

**What to build:** Prepare the repo to be made public: add an MIT `LICENSE`, clean up the stray 39MB `apps/studio/development.tar.gz` (gitignore + delete), and document the remaining human steps. The actual visibility flip on GitHub is a human capstone.

**Blocked by:** (none)

**Status:** completed

## Checklist

- [x] Add `LICENSE` at the repo root specifying "All Rights Reserved" (copyright holder: Gyula Szvitek, year 2026).
- [x] `.gitignore`: add `apps/studio/development.tar.gz` (and a general `*.tar.gz` rule under apps/studio if appropriate) so the artifact can't be re-committed.
- [x] Confirm no secrets in history (already audited: only `.env.example` files; no tokens ever committed). Note in the ticket that commit-author emails become public once the repo is public.
- [x] Note: `NEXT_PUBLIC_SANITY_PROJECT_ID` is intentionally frontend-readable; `SANITY_API_TOKEN` stays server-side on Vercel and is never in the repo.

## Human capstone (not agent work)

- Flip the repository visibility to **Public** on GitHub (Settings → Danger Zone → Change visibility).
- Optionally add a repository description and topics on the GitHub repo page.

## Comments
