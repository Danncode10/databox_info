import Link from "next/link";
import { ArrowLeft, Download, Images, SquareDashedMousePointer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DatasetImage } from "@/services/images";
import type { DatasetSummary } from "@/services/datasets";

type DatasetWorkspaceProps = {
  dataset: DatasetSummary;
  images: DatasetImage[];
};

export function DatasetWorkspace({ dataset, images }: DatasetWorkspaceProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex min-h-12 items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Datasets
        </Link>

        <header className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Dataset</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">{dataset.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Review local images, continue labeling, and prepare export files.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:min-w-80">
            <SummaryTile label="Raw images" value={dataset.rawImageCount} icon={Images} />
            <SummaryTile label="Annotations" value={dataset.annotationCount} icon={SquareDashedMousePointer} />
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Raw images</CardTitle>
            </CardHeader>
            <CardContent>
              {images.length === 0 ? (
                <div className="flex min-h-64 items-center justify-center rounded-md border border-dashed border-border bg-muted p-6 text-center text-sm text-muted-foreground">
                  Add images to <span className="mx-1 font-mono text-foreground">datasets/{dataset.id}/raw/</span> to begin labeling.
                </div>
              ) : (
                <div className="grid gap-2">
                  {images.map((image) => (
                    <div key={image.filename} className="flex min-h-12 items-center justify-between rounded-md border border-border px-3 py-2">
                      <span className="font-mono text-sm text-foreground">{image.filename}</span>
                      <span className="text-xs text-muted-foreground">Ready</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Workflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <WorkflowStep label="Editor" value="Bounding-box tool comes after cleanup." />
              <WorkflowStep label="Review" value="Labeled/unlabeled status follows annotation storage." />
              <WorkflowStep label="Export" value="YOLO labels and data.yaml are generated from JSON." />
              <div className="flex min-h-12 items-center gap-2 rounded-md border border-border bg-muted px-3 text-foreground">
                <Download className="h-4 w-4 text-primary" />
                YOLO export planned after Phase 1
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

type SummaryTileProps = {
  label: string;
  value: number;
  icon: typeof Images;
};

function SummaryTile({ label, value, icon: Icon }: SummaryTileProps) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function WorkflowStep({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border p-3">
      <p className="font-medium text-foreground">{label}</p>
      <p className="mt-1 leading-5">{value}</p>
    </div>
  );
}
