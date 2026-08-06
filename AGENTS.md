# Project Rules — Databox

Start here before working in this repository.

Databox is a local-first dataset labeling tool for computer vision. It should
run on localhost, read/write local dataset folders, store editable annotations
as JSON, and export YOLO-ready training files.

## Current Direction

- No landing page.
- No dashboard shell.
- No auth, billing, blog, leads, bookings, pricing, analytics, or marketing
  flow for v1.
- First screen: dataset chooser.
- Main workflow: dataset chooser -> editor -> review -> export.
- Local filesystem is the source of truth.
- `datasets/` is local data and must not be committed.

## Architecture Guardrails

1. UI components do not contain filesystem or export logic.
2. Dataset/image/annotation/export logic lives in `src/services/`.
3. Shared local path, validation, annotation, and YOLO helpers live in
   `src/lib/databox/`.
4. Reusable Databox UI lives in `src/components/databox/`.
5. Prefer Server Components unless browser interactivity is required.
6. Use TypeScript types instead of `any`.

## UI Guardrails

- Tailwind semantic tokens only.
- Use Shadcn-style primitives from `src/components/ui/`.
- No oversized marketing hero or public website composition.
- Tool surfaces should be calm, focused, and efficient for repeated labeling.
- Every interactive element should be comfortably clickable.
- Empty states should explain the next local dataset action.

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

## Planning Workflow

- `MASTERPLAN.md` is the source of truth.
- GitHub Project sync target: `Danncode10/7`.
- Use stable task IDs like `[P1.2]`; never create bare `[P1]` cards.
- When a tracked task is complete, check it in `MASTERPLAN.md` and move the
  matching GitHub Project card to `Done`.

## Verification

For cleanup/code changes, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

If a check cannot run or fails because of unrelated existing debt, document it
clearly before closing the task.
