export type DataboxClass = {
  id: number;
  name: string;
  color: string;
};

export type BoundingBoxAnnotation = {
  classId: number;
  className: string;
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
};

export type ImageAnnotationFile = {
  image: {
    filename: string;
    width: number;
    height: number;
  };
  annotations: BoundingBoxAnnotation[];
};

export function createEmptyAnnotation(filename: string, width = 0, height = 0): ImageAnnotationFile {
  return {
    image: {
      filename,
      width,
      height,
    },
    annotations: [],
  };
}
