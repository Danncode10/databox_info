# MASTERPLAN — Databox

> **Last updated:** 2026-08-06
> **Status:** Phase 1 planning only
> **Owner:** Danncode10
> **GitHub Project:** `Danncode10/7` — `@Danncode10's databox`

---

## Project Summary

Databox is a local-first computer vision dataset labeling tool. It should open
directly into a dataset chooser, then move into the labeling editor. It is not a
landing page, public SaaS app, or admin dashboard.

The first build priority is cleanup: remove DannFlow/SaaS assumptions, preserve
the useful Next.js/Tailwind/Shadcn foundation, and prepare a clean local
filesystem workflow for image datasets, JSON annotations, and YOLO export.

## Product Direction

- First screen: choose, create, or open a local dataset.
- Main workflow: dataset chooser -> editor -> review -> export.
- No landing page.
- No dashboard shell.
- No blog, pricing, leads, bookings, analytics, public SEO, or marketing flow.
- Local filesystem is the primary storage model.
- JSON annotations are the editable source of truth.
- YOLO `images/`, `labels/`, and `data.yaml` are generated during export.

## Target Dataset Structure

```text
datasets/
  sample-dataset/
    raw/
      image_001.jpg
      image_002.jpg
      image_003.jpg
    annotations/
      image_001.json
      image_002.json
      image_003.json
    images/
      train/
      val/
      test/
    labels/
      train/
      val/
      test/
    data.yaml
```

Notes:

- `raw/` stores original imported images and is the source of truth during
  labeling.
- `annotations/` stores editable JSON files with pixel-coordinate boxes.
- `images/train`, `images/val`, `images/test`, `labels/train`,
  `labels/val`, and `labels/test` are generated or refreshed during YOLO export.
- `data.yaml` is generated from dataset metadata and class definitions.
- `datasets/` must be ignored by Git because it can contain large local image
  data and machine-specific work.

---

## PHASE 1: Cleanup And Reorientation

**Goal:** Remove SaaS assumptions, preserve useful UI primitives, and prepare a
clean local-first foundation for Databox.

**Est. time:** 1-2 focused cleanup passes

**Blockers:**

- Decide whether Supabase/auth are removed entirely for v1 or kept temporarily
  while the local filesystem layer is built.
- Decide whether v1 uses plain filesystem JSON only, SQLite, or a small local
  database plus filesystem images.

- [x] [P1.1] Freeze current baseline
  - Goal: Make the current starter state recoverable before large deletion work.
  - Files: `.git/`, `Cleanup.md`, `MASTERPLAN.md`
  - Guardrails: Do not delete code in this task; only confirm source control and
    baseline state.
  - Dependencies: GitHub repository `Danncode10/databox` exists.

- [ ] [P1.2] Rewrite project context documents for Databox
  - Goal: Replace DannFlow/SaaS language with Databox's local labeling-tool
    direction so future agents read the right product intent first.
  - Files: `README.md`, `PROJECT_CONTEXT.md`, `business.json`, `CLAUDE.md`,
    `AGENTS.md`
  - Guardrails: Keep command/agent instructions that are still useful; remove or
    rewrite only stale product assumptions.
  - Dependencies: `[P1.1]`

- [ ] [P1.3] Replace app entry flow with dataset chooser
  - Goal: Make `/` show the Databox dataset chooser instead of a marketing
    landing page.
  - Files: `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/databox/`
  - Guardrails: No landing page, no dashboard route as the primary experience,
    no marketing hero.
  - Dependencies: `[P1.2]`

- [ ] [P1.4] Remove dashboard-oriented UI and routes
  - Goal: Remove or quarantine SaaS dashboard surfaces that do not belong in
    Databox.
  - Files: `src/app/dashboard/`, `src/components/dashboard-shell.tsx`,
    `src/components/dashboard/`, `src/lib/dashboard-features.ts`
  - Guardrails: Preserve reusable UI primitives in `src/components/ui/`; avoid
    deleting anything still imported by the new dataset chooser.
  - Dependencies: `[P1.3]`

- [ ] [P1.5] Remove marketing, blog, and business modules
  - Goal: Delete unused SaaS features after routes no longer depend on them.
  - Files: `src/app/blog/`, `src/components/landing/`, `src/services/blog.ts`,
    `src/services/leads.ts`, `src/services/bookings.ts`,
    `src/services/analytics.ts`, `src/services/gallery.ts`,
    `src/services/notifications.ts`, `src/services/services.ts`,
    `src/services/dashboard-stats.ts`, `src/app/sitemap.ts`
  - Guardrails: Search imports before deletion; keep the app buildable after the
    batch.
  - Dependencies: `[P1.4]`

- [ ] [P1.6] Decide and scaffold local data layer
  - Goal: Establish how Databox reads/writes local datasets before annotation UI
    work begins.
  - Files: `.gitignore`, `src/lib/databox/`, `src/services/datasets.ts`,
    `src/services/images.ts`, `src/services/annotations.ts`
  - Guardrails: Prefer filesystem JSON first unless query/search needs justify a
    database; keep path access safe and scoped to the dataset root.
  - Dependencies: `[P1.3]`

- [ ] [P1.7] Reassess Supabase and auth
  - Goal: Decide whether Supabase/auth remain in v1 or are removed from the
    local-first app.
  - Files: `src/app/login/`, `src/app/auth/`, `src/app/forgot-password/`,
    `src/app/reset-password/`, `src/utils/supabase/`, `src/types/supabase.ts`,
    `db/`, `supabase/`, `scripts/*db*`
  - Guardrails: If removed, delete in a separate verified batch; if kept
    temporarily, isolate it so Databox core does not depend on it.
  - Dependencies: `[P1.6]`

- [ ] [P1.8] Prune dependencies after code removal
  - Goal: Remove packages that only supported deleted SaaS features.
  - Files: `package.json`, `package-lock.json`
  - Guardrails: Remove Tiptap after blog deletion, Upstash after rate-limit
    removal, and Supabase/Drizzle/Postgres only after the auth/database decision
    is complete.
  - Dependencies: `[P1.5]`, `[P1.7]`

- [ ] [P1.9] Create Databox source folders and service boundaries
  - Goal: Put future Databox code in clear locations before feature work starts.
  - Files: `src/components/databox/`, `src/lib/databox/`, `src/services/`
  - Guardrails: UI components do not contain filesystem logic; dataset,
    annotation, image, and export logic live in services/lib helpers.
  - Dependencies: `[P1.6]`

- [ ] [P1.10] Verify cleanup
  - Goal: Confirm the repo is clean, buildable, and no longer presenting itself
    as a SaaS starter.
  - Files: full repo
  - Guardrails: Run lint/typecheck/build after deletion batches; search for stale
    words like `dashboard`, `lead`, `booking`, `pricing`, `blog`, `Supabase`,
    `Vercel`, and `marketing`; document any intentional leftovers.
  - Dependencies: `[P1.2]` through `[P1.9]`

**Acceptance Criteria:**

- [ ] The app starts at a dataset chooser, not a landing page or dashboard.
- [ ] Databox docs describe a local-first labeling tool.
- [ ] `datasets/` is ignored by Git.
- [ ] SaaS routes/components/services are removed or explicitly quarantined.
- [ ] The local data-layer decision is recorded.
- [ ] `npm run lint`, `npx tsc --noEmit`, and `npm run build` are clean or have
  documented pre-existing exceptions.

**Notes:**

- `Cleanup.md` remains the supporting analysis document for Phase 1.
- Future phases should be added only after Phase 1 cleanup clarifies the final
  local data/auth architecture.

---

## FUTURE PHASES

Future phases are intentionally not expanded yet. After Phase 1, add plans for:

- Dataset management
- Image import and metadata extraction
- Bounding-box annotation editor
- Annotation review/status tracking
- YOLO export

---

## Notes

- Use ordered task IDs in every phase task: `[P1.1]`, `[P1.2]`, `[P1.3]`.
- Do not create bare `[P1]` cards.
- Sync target: GitHub Project `Danncode10/7`.
- Run `/update-masterplan --project-owner Danncode10 --project-number 7` after
  future edits to keep the GitHub Project aligned.
