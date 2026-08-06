import path from "node:path";

export const DATASETS_DIR_NAME = "datasets";

export const DATASET_FOLDERS = {
  raw: "raw",
  annotations: "annotations",
  images: "images",
  labels: "labels",
} as const;

export const DATASET_SPLITS = ["train", "val", "test"] as const;

export type DatasetSplit = (typeof DATASET_SPLITS)[number];

export function getDatasetsRoot(): string {
  const configuredRoot = process.env.DATABOX_DATASETS_DIR?.trim() || DATASETS_DIR_NAME;
  return path.isAbsolute(configuredRoot)
    ? configuredRoot
    : path.join(/* turbopackIgnore: true */ process.cwd(), configuredRoot);
}

export function getDatasetPath(datasetId: string): string {
  const safeId = normalizeDatasetId(datasetId);
  return path.join(getDatasetsRoot(), safeId);
}

export function normalizeDatasetId(value: string): string {
  const trimmed = value.trim().toLowerCase();
  const normalized = trimmed.replace(/[^a-z0-9-_]+/g, "-").replace(/^-+|-+$/g, "");

  if (!normalized) {
    throw new Error("Dataset name must include at least one letter or number.");
  }

  if (normalized.includes("..") || path.isAbsolute(normalized)) {
    throw new Error("Dataset name is not allowed.");
  }

  return normalized;
}
