import type { BoundingBoxAnnotation } from "./annotations";

export function toYoloLine(box: BoundingBoxAnnotation, imageWidth: number, imageHeight: number): string {
  if (imageWidth <= 0 || imageHeight <= 0) {
    throw new Error("Image dimensions must be greater than zero for YOLO export.");
  }

  const centerX = ((box.xMin + box.xMax) / 2) / imageWidth;
  const centerY = ((box.yMin + box.yMax) / 2) / imageHeight;
  const width = (box.xMax - box.xMin) / imageWidth;
  const height = (box.yMax - box.yMin) / imageHeight;

  return [
    box.classId,
    centerX.toFixed(6),
    centerY.toFixed(6),
    width.toFixed(6),
    height.toFixed(6),
  ].join(" ");
}
