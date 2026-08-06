import fs from "node:fs/promises";
import path from "node:path";
import { DATASET_FOLDERS, getDatasetPath, normalizeDatasetId } from "@/lib/databox/paths";

export type DatasetImage = {
  filename: string;
  path: string;
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".bmp"]);

export async function listDatasetImages(datasetId: string): Promise<DatasetImage[]> {
  const id = normalizeDatasetId(datasetId);
  const rawPath = path.join(getDatasetPath(id), DATASET_FOLDERS.raw);
  const entries = await fs.readdir(rawPath, { withFileTypes: true }).catch(() => []);

  return entries
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => ({
      filename: entry.name,
      path: path.join(rawPath, entry.name),
    }))
    .sort((a, b) => a.filename.localeCompare(b.filename));
}
