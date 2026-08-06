import { notFound } from "next/navigation";
import { DatasetWorkspace } from "@/components/databox/dataset-workspace";
import { getDatasetSummary } from "@/services/datasets";
import { listDatasetImages } from "@/services/images";

type DatasetPageProps = {
  params: Promise<{
    datasetId: string;
  }>;
};

export default async function DatasetPage({ params }: DatasetPageProps) {
  const { datasetId } = await params;
  const dataset = await getDatasetSummary(datasetId).catch(() => null);

  if (!dataset) {
    notFound();
  }

  const images = await listDatasetImages(dataset.id);

  return <DatasetWorkspace dataset={dataset} images={images} />;
}
