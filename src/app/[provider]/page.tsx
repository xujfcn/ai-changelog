import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllProviders,
  getProvider,
  FlatChangelogEntry,
  getStatusBadge,
  formatContextWindow,
  formatPrice,
} from "@/lib/data";
import { ModelCard } from "@/components/model-card";
import { FilterableTimeline } from "@/components/filterable-timeline";

export function generateStaticParams() {
  return getAllProviders().map((p) => ({ provider: p.provider }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provider: string }>;
}): Promise<Metadata> {
  const { provider: slug } = await params;
  const provider = getProvider(slug);
  if (!provider) return {};

  return {
    title: `${provider.displayName} Model Changelog — All ${provider.displayName} AI Model Updates`,
    description: `Track all ${provider.displayName} AI model updates, pricing changes, and version history. Includes ${provider.models.map((m) => m.name).join(", ")}.`,
    openGraph: {
      title: `${provider.displayName} Model Changelog`,
      description: `Track all ${provider.displayName} AI model updates in one place.`,
    },
  };
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider: slug } = await params;
  const provider = getProvider(slug);
  if (!provider) notFound();

  const activeModels = provider.models.filter((m) => m.status === "active");
  const deprecatedModels = provider.models.filter((m) => m.status === "deprecated");

  const allChanges: FlatChangelogEntry[] = [];
  for (const model of provider.models) {
    for (const entry of model.changelog) {
      allChanges.push({
        ...entry,
        providerSlug: provider.provider,
        providerName: provider.displayName,
        providerColor: provider.color,
        modelId: model.id,
        modelName: model.name,
      });
    }
  }
  allChanges.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        /{" "}
        <span className="text-foreground">{provider.displayName}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="h-8 w-8 rounded-lg"
            style={{ backgroundColor: provider.color }}
          />
          <h1 className="text-3xl md:text-4xl font-bold">{provider.displayName}</h1>
        </div>
        <p className="text-muted-foreground">
          {activeModels.length} active models · {deprecatedModels.length} deprecated ·{" "}
          <a
            href={provider.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline"
          >
            Official website →
          </a>
        </p>
      </div>

      {/* Active Models */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Active Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              providerSlug={provider.provider}
              providerColor={provider.color}
            />
          ))}
        </div>
      </section>

      {/* Deprecated Models */}
      {deprecatedModels.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Deprecated Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deprecatedModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                providerSlug={provider.provider}
                providerColor={provider.color}
              />
            ))}
          </div>
        </section>
      )}

      {/* Timeline */}
      <section>
        <h2 className="text-xl font-bold mb-4">Change History</h2>
        <FilterableTimeline
          entries={allChanges}
          showProviderFilter={false}
        />
      </section>
    </div>
  );
}
