import fs from "node:fs/promises";
import path from "node:path";
import type { ImageAnnotationFile } from "@/lib/databox/annotations";
import { DATASET_FOLDERS, getDatasetPath, normalizeDatasetId } from "@/lib/databox/paths";

export async function readAnnotation(
  datasetId: string,
  filename: string,
): Promise<ImageAnnotationFile | null> {
  const annotationPath = getAnnotationPath(datasetId, filename);
  const raw = await fs.readFile(annotationPath, "utf8").catch(() => null);

  if (!raw) return null;
  return JSON.parse(raw) as ImageAnnotationFile;
}

export async function writeAnnotation(datasetId: string, annotation: ImageAnnotationFile): Promise<void> {
  const annotationPath = getAnnotationPath(datasetId, annotation.image.filename);
  await fs.mkdir(path.dirname(annotationPath), { recursive: true });
  await fs.writeFile(annotationPath, `${JSON.stringify(annotation, null, 2)}\n`, "utf8");
}

function getAnnotationPath(datasetId: string, filename: string): string {
  const id = normalizeDatasetId(datasetId);
  const baseName = path.basename(filename, path.extname(filename));
  return path.join(getDatasetPath(id), DATASET_FOLDERS.annotations, `${baseName}.json`);
}
