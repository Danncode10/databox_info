# Project Context

## What This App Is

**App name:** Databox

**One-liner:** Local-first image annotation studio for building clean,
YOLO-ready computer vision datasets.

**The problem it solves:**
Computer vision projects need organized image datasets with accurate labels.
Manually managing raw images, editable annotations, train/validation/test
splits, and YOLO export files is error-prone. Databox gives that workflow a
focused local browser UI while keeping dataset files transparent on disk.

## Target Audience

**Primary user:** Researchers, students, hobbyists, and developers labeling
images for object detection models on their own machine.

**What they care most about:**

- Fast local labeling without uploading datasets online.
- Clean reusable dataset folders that can be exported to YOLO.
- Editable JSON annotations before committing to training-format files.

**What they do not care about for v1:**

- Public deployment.
- Multi-user SaaS dashboards.
- Authentication, billing, leads, analytics, marketing pages, or team review.

## Stack Decisions

- Framework: Next.js App Router.
- UI: Tailwind CSS with semantic tokens and small Shadcn-style primitives.
- Storage: local filesystem under `datasets/` for v1.
- Annotation source of truth: JSON files in each dataset's `annotations/`
  folder.
- Export target: YOLO object-detection structure with generated `data.yaml`.
- Database: none for v1 unless the local file workflow proves insufficient.
- Auth: none for v1; this is a localhost workstation tool.

## Design Decisions

- App-first interface, no landing page.
- First screen is the dataset chooser.
- Tool surfaces should be dense, calm, and utilitarian.
- Navigation should support repeated labeling work: datasets, editor, review,
  export.
- Keep all interactive targets comfortable for touch/trackpad use.
- Use semantic Tailwind tokens only.

## Anti-Decisions

- NOT publishing Databox as an online SaaS app in v1.
- NOT adding a public marketing site.
- NOT adding a dashboard shell.
- NOT using Supabase, billing, RLS, or cloud auth for v1.
- NOT storing large datasets in Git.
- NOT making YOLO `.txt` labels the editable source of truth.

## Current Focus

Phase 1: clean up the DannFlow starter into a Databox-ready local app
foundation. Remove unused SaaS modules, replace the home page with a dataset
chooser, scaffold local dataset services, and verify the repo builds cleanly.

*Last updated: 2026-08-06*
