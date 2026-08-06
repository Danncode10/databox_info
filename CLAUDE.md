# CLAUDE.md — Databox

Databox is a local-first computer vision dataset labeling tool built with
Next.js. It runs on localhost and works with dataset folders on the user's own
machine.

## Product Rules

- No landing page.
- No SaaS dashboard.
- No auth, billing, blog, leads, bookings, pricing, analytics, or public
  marketing flow for v1.
- `/` should show the dataset chooser.
- Dataset workflow is chooser -> editor -> review -> export.
- Local filesystem is the primary storage model.
- JSON annotations are the editable source of truth.
- YOLO files are generated during export.

## Dataset Structure

```text
datasets/
  sample-dataset/
    raw/
    annotations/
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

## Architecture

- Use Server Components by default.
- Use Client Components only for interactive editor/tooling surfaces.
- UI components must not contain filesystem logic.
- Local dataset logic belongs in `src/services/`.
- Shared path, validation, annotation, and YOLO helpers belong in
  `src/lib/databox/`.
- Reusable Databox UI belongs in `src/components/databox/`.
- Keep generated dataset files out of Git.

## UI Standards

- Use Tailwind semantic tokens only: `bg-background`, `bg-card`, `bg-muted`,
  `text-foreground`, `text-muted-foreground`, `text-primary`, `border`,
  `border-border`, `border-input`, `bg-primary`, `text-primary-foreground`.
- Use Shadcn-style primitives from `src/components/ui/`.
- Keep tool surfaces calm, compact, and work-focused.
- Labels go above inputs.
- Empty states should explain what local action is needed next.

## Active Plan

`MASTERPLAN.md` is the local source of truth. Phase 1 is cleanup and
reorientation from the DannFlow starter into Databox.

GitHub Project sync target: `Danncode10/7`.
