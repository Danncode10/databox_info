# Databox Cleanup Plan

> Temporary planning file for turning the current DannFlow starter into Databox.
> This file is intentionally separate from `MASTERPLAN.md`; when approved, copy
> Phase 1 tasks into `MASTERPLAN.md` and run `/update-masterplan`.

## Direction

Databox is a local-first computer vision dataset labeling tool. It should open
directly into a dataset chooser, then move into the labeling editor. It is not a
marketing site, public SaaS app, or admin dashboard.

## Product Shape

- First screen: choose, create, or open a local dataset.
- Main workflow: dataset chooser -> editor -> review -> export.
- No landing page.
- No dashboard shell.
- No blog, pricing, leads, bookings, analytics, marketing, or public SEO flow.
- Local filesystem is the primary storage model.
- JSON annotations are the editable source of truth.
- YOLO folders and files are generated during export.

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

- `raw/` stores original imported images and should be treated as the source of
  truth during labeling.
- `annotations/` stores editable JSON annotation files in pixel coordinates.
- `images/train`, `images/val`, `images/test`, `labels/train`,
  `labels/val`, and `labels/test` should be generated or refreshed during YOLO
  export.
- `data.yaml` should be generated from dataset metadata and class definitions.
- `datasets/` should be ignored by Git because it can contain large local image
  data and machine-specific work.

## Cleanup Inventory

Current template areas that do not match Databox:

- `src/app/page.tsx` is a marketing landing page.
- `src/app/dashboard/` is a SaaS admin dashboard.
- `src/app/blog/` and dashboard blog editor are public content features.
- Auth pages and Supabase callback routes are probably unnecessary for local v1.
- `src/components/landing/` is marketing UI.
- `src/components/dashboard/` is SaaS dashboard UI.
- `src/services/blog.ts`, `leads.ts`, `bookings.ts`, `analytics.ts`,
  `gallery.ts`, `notifications.ts`, `services.ts`, and dashboard stats services
  are business-template modules.
- `db/schema/blog.ts` and `db/schema/dashboard.ts` are SaaS/business schema.
- `business.json`, `README.md`, `PROJECT_CONTEXT.md`, and `CLAUDE.md` still
  describe DannFlow/SaaS behavior rather than Databox.
- Supabase, Drizzle, Upstash, and Tiptap dependencies may become removable after
  the storage/auth decision is finalized.

## Phase 1: Cleanup And Reorientation

Goal: remove SaaS assumptions, preserve useful UI primitives, and prepare a
clean local-first foundation for Databox.

- [ ] [P1.1] Freeze current baseline
  - Confirm whether this folder should become a Git repository.
  - If yes, initialize Git and create a baseline commit before deletion work.
  - Record that `Cleanup.md` is the temporary task plan and `MASTERPLAN.md`
    remains untouched for now.

- [ ] [P1.2] Rewrite project context documents for Databox
  - Update README to describe Databox as a local dataset labeling tool.
  - Update PROJECT_CONTEXT with local-first decisions and anti-decisions.
  - Update business/config copy so app metadata says Databox.
  - Keep `MASTERPLAN.md` unchanged until this cleanup plan is approved.

- [ ] [P1.3] Replace app entry flow
  - Replace the landing page with a dataset chooser.
  - Remove marketing sections from the first viewport.
  - Define the desired routes for dataset list, dataset editor, review, and
    export.

- [ ] [P1.4] Remove dashboard-oriented UI
  - Remove or quarantine dashboard shell/tabs.
  - Remove dashboard routes for leads, team, settings, pages, and blog.
  - Keep reusable primitives from `src/components/ui/`.
  - Convert any needed shell/navigation into a compact local app layout.

- [ ] [P1.5] Remove unused business modules
  - Remove blog, leads, bookings, services, gallery, analytics, notifications,
    and dashboard stats services after confirming no remaining imports.
  - Remove related landing/dashboard components.
  - Remove public blog pages and sitemap blog generation.

- [ ] [P1.6] Decide local data layer
  - Decide whether v1 uses plain filesystem JSON only, SQLite, or a small local
    database plus filesystem images.
  - Prefer filesystem JSON first unless query/search needs become complex.
  - Add `datasets/` to `.gitignore`.
  - Add path helpers for safe dataset access.

- [ ] [P1.7] Reassess Supabase and auth
  - Decide whether Supabase/auth are removed for v1.
  - If removed, delete auth routes, Supabase utilities, generated Supabase
    types, Drizzle schema/migrations, and DB scripts in a separate cleanup step.
  - If kept temporarily, isolate them so Databox core does not depend on them.

- [ ] [P1.8] Prune dependencies after code removal
  - Remove Tiptap packages when blog editor is gone.
  - Remove Upstash if production rate limiting is not used.
  - Remove Supabase/Drizzle/Postgres packages only after auth/database removal.
  - Keep Next, React, Tailwind, lucide-react, Sonner, and UI utility packages.

- [ ] [P1.9] Create Databox source folders
  - Add `src/components/databox/`.
  - Add `src/lib/databox/`.
  - Add `src/services/datasets.ts`, `images.ts`, `annotations.ts`, and
    `export-yolo.ts` once the data layer is chosen.
  - Keep business logic outside UI components.

- [ ] [P1.10] Verify cleanup
  - Run lint/typecheck/build after each deletion batch.
  - Search for leftover SaaS words: dashboard, lead, booking, pricing, blog,
    Supabase, Vercel, marketing.
  - Confirm the app starts at dataset chooser with no broken routes/imports.

## Recommended First Task

Start with `[P1.1] Freeze current baseline`, then `[P1.2] Rewrite project
context documents for Databox`.

Why this matters:

The repo currently still teaches future agents that this is a SaaS starter. The
first cleanup pass should change the project identity and create a rollback point
before large deletions. After that, removing routes/components becomes much less
risky.

## Open Decisions

- Should v1 remove Supabase/auth entirely, or keep it temporarily while the local
  filesystem layer is built?
- Should the app support one workspace dataset root only, or allow the user to
  choose any folder on disk?
- Should export overwrite existing YOLO folders, create timestamped exports, or
  ask before replacing generated files?
- Should `data.yaml` live only in the dataset root, or should each export create
  its own `exports/<timestamp>/data.yaml` bundle?

