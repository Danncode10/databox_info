import fs from "node:fs/promises";
import path from "node:path";
import {
  DATASET_FOLDERS,
  DATASET_SPLITS,
  getDatasetPath,
  getDatasetsRoot,
  normalizeDatasetId,
} from "@/lib/databox/paths";

export type DatasetSummary = {
  id: string;
  name: string;
  rawImageCount: number;
  annotationCount: number;
  updatedAt: string | null;
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".bmp"]);

export async function listDatasets(): Promise<DatasetSummary[]> {
  const root = getDatasetsRoot();
  await fs.mkdir(root, { recursive: true });

  const entries = await fs.readdir(root, { withFileTypes: true });
  const datasets = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => getDatasetSummary(entry.name)),
  );

  return datasets.sort((a, b) => a.name.localeCompare(b.name));
}

export async function createDataset(name: string): Promise<DatasetSummary> {
  const id = normalizeDatasetId(name);
  const datasetPath = getDatasetPath(id);

  await fs.mkdir(path.join(datasetPath, DATASET_FOLDERS.raw), { recursive: true });
  await fs.mkdir(path.join(datasetPath, DATASET_FOLDERS.annotations), { recursive: true });

  for (const split of DATASET_SPLITS) {
    await fs.mkdir(path.join(datasetPath, DATASET_FOLDERS.images, split), { recursive: true });
    await fs.mkdir(path.join(datasetPath, DATASET_FOLDERS.labels, split), { recursive: true });
  }

  return getDatasetSummary(id);
}

export async function getDatasetSummary(datasetId: string): Promise<DatasetSummary> {
  const id = normalizeDatasetId(datasetId);
  const datasetPath = getDatasetPath(id);
  const rawPath = path.join(datasetPath, DATASET_FOLDERS.raw);
  const annotationsPath = path.join(datasetPath, DATASET_FOLDERS.annotations);
  const stat = await fs.stat(datasetPath).catch(() => null);

  return {
    id,
    name: id,
    rawImageCount: await countFiles(rawPath, IMAGE_EXTENSIONS),
    annotationCount: await countFiles(annotationsPath, new Set([".json"])),
    updatedAt: stat?.mtime.toISOString() ?? null,
  };
}

async function countFiles(directory: string, extensions: Set<string>): Promise<number> {
  const entries = await fs.readdir(directory, { withFileTypes: true }).catch(() => []);

  return entries.filter((entry) => {
    if (!entry.isFile()) return false;
    return extensions.has(path.extname(entry.name).toLowerCase());
  }).length;
}
