import fs from "node:fs/promises";
import path from "node:path";
import type { DataboxClass, ImageAnnotationFile } from "@/lib/databox/annotations";
import { toYoloLine } from "@/lib/databox/yolo";
import { DATASET_FOLDERS, DATASET_SPLITS, getDatasetPath, normalizeDatasetId } from "@/lib/databox/paths";

export async function writeDataYaml(datasetId: string, classes: DataboxClass[]): Promise<void> {
  const id = normalizeDatasetId(datasetId);
  const datasetPath = getDatasetPath(id);
  const names = classes.map((item) => `  ${item.id}: ${item.name}`).join("\n");
  const yaml = [
    `path: ./datasets/${id}`,
    "train: images/train",
    "val: images/val",
    "test: images/test",
    "",
    "names:",
    names,
    "",
  ].join("\n");

  await fs.writeFile(path.join(datasetPath, "data.yaml"), yaml, "utf8");
}

export async function writeYoloLabel(
  datasetId: string,
  split: (typeof DATASET_SPLITS)[number],
  annotation: ImageAnnotationFile,
): Promise<void> {
  const id = normalizeDatasetId(datasetId);
  const labelName = `${path.basename(annotation.image.filename, path.extname(annotation.image.filename))}.txt`;
  const labelPath = path.join(getDatasetPath(id), DATASET_FOLDERS.labels, split, labelName);
  const lines = annotation.annotations.map((box) =>
    toYoloLine(box, annotation.image.width, annotation.image.height),
  );

  await fs.mkdir(path.dirname(labelPath), { recursive: true });
  await fs.writeFile(labelPath, `${lines.join("\n")}${lines.length ? "\n" : ""}`, "utf8");
}
