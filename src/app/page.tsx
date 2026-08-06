import { DatasetChooser } from "@/components/databox/dataset-chooser";
import { listDatasets } from "@/services/datasets";

export default async function Home() {
  const datasets = await listDatasets();

  return <DatasetChooser datasets={datasets} />;
}
