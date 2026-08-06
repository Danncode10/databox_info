import Link from "next/link";
import { FolderOpen, Images, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DatasetSummary } from "@/services/datasets";

type DatasetChooserProps = {
  datasets: DatasetSummary[];
};

export function DatasetChooser({ datasets }: DatasetChooserProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-border pb-6">
          <p className="text-sm font-medium text-primary">Databox</p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-normal text-foreground">
                Choose dataset
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Open a local dataset, inspect labeling progress, and continue annotation work.
              </p>
            </div>
            <div className="rounded-md border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
              Local folder: <span className="font-mono text-foreground">datasets/</span>
            </div>
          </div>
        </header>

        {datasets.length === 0 ? (
          <Card className="border-dashed">
            <CardHeader className="items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-primary">
                <FolderOpen className="h-6 w-6" />
              </div>
              <CardTitle>No datasets found</CardTitle>
              <CardDescription>
                Create a folder under <span className="font-mono text-foreground">datasets/</span> with
                a <span className="font-mono text-foreground">raw/</span> folder to begin.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {datasets.map((dataset) => (
              <Link key={dataset.id} href={`/datasets/${dataset.id}`} className="block">
                <Card className="h-full transition-colors hover:border-primary">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-muted text-primary">
                      <FolderOpen className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{dataset.name}</CardTitle>
                    <CardDescription>
                      {dataset.updatedAt
                        ? `Updated ${new Date(dataset.updatedAt).toLocaleDateString()}`
                        : "Local dataset folder"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3 text-sm">
                    <DatasetMetric icon={Images} label="Images" value={dataset.rawImageCount} />
                    <DatasetMetric icon={Tag} label="Annotations" value={dataset.annotationCount} />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

type DatasetMetricProps = {
  icon: typeof Images;
  label: string;
  value: number;
};

function DatasetMetric({ icon: Icon, label, value }: DatasetMetricProps) {
  return (
    <div className="rounded-md border border-border bg-muted p-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <p className="mt-2 text-xl font-semibold text-foreground">{value}</p>
    </div>
  );
}
