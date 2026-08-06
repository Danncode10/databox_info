# Databox

Databox is a local-first image annotation studio for building clean,
YOLO-ready computer vision datasets.

It is designed for workstation use: run it on localhost, organize image
datasets on your own machine, draw/edit annotations in the browser, store JSON
as the editable source of truth, and export model-ready YOLO files when the
dataset is ready for training.

## Workflow

```text
Choose or create a dataset
-> import images into raw/
-> draw bounding boxes in the editor
-> save editable JSON annotations
-> review labeling status
-> export YOLO images, labels, and data.yaml
```

## Product Direction

- No landing page.
- No SaaS dashboard.
- No auth, billing, blog, leads, bookings, pricing, analytics, or marketing
  flow for v1.
- First screen is the dataset chooser.
- After choosing a dataset, the app moves into editor/review/export tools.
- Local filesystem data is the source of truth.
- JSON annotations are edited directly by Databox services.
- YOLO files are generated during export.

## Dataset Structure

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

`raw/` stores original images. `annotations/` stores editable JSON annotation
files. The YOLO `images/`, `labels/`, and `data.yaml` outputs are generated or
refreshed during export.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Project Plan

The active plan lives in [MASTERPLAN.md](MASTERPLAN.md). Phase 1 is cleanup and
reorientation from the DannFlow starter into Databox.
