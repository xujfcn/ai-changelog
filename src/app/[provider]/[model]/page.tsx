import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllProviders,
  getModel,
  formatContextWindow,
  formatPrice,
  formatDate,
  getStatusBadge,
  getChangeTypeBadge,
} from "@/lib/data";

export function generateStaticParams() {
  const params: { provider: string; model: string }[] = [];
  for (const provider of getAllProviders()) {
    for (const model of provider.models) {
      params.push({ provider: provider.provider, model: model.id });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provider: string; model: string }>;
}): Promise<Metadata> {
  const { provider: provSlug, model: modelId } = await params;
  const result = getModel(provSlug, modelId);
  if (!result) return {};

  const { provider, model } = result;
  return {
    title: `${model.name} Changelog — ${provider.displayName} Model Version History`,
    description: `${model.name} version history, pricing, and updates. Context window: ${formatContextWindow(model.contextWindow)}. Status: ${model.status}. Input: ${formatPrice(model.pricing.input)}/1M tokens. Output: ${formatPrice(model.pricing.output)}/1M tokens.`,
    openGraph: {
      title: `${model.name} — AI Model Changelog`,
      description: `Track ${model.name} updates, pricing changes, and version history.`,
    },
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ provider: string; model: string }>;
}) {
  const { provider: provSlug, model: modelId } = await params;
  const result = getModel(provSlug, modelId);
  if (!result) notFound();

  const { provider, model } = result;
  const status = getStatusBadge(model.status);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: model.name,
    applicationCategory: "AI Model",
    operatingSystem: "Cloud",
    offers: {
      "@type": "Offer",
      price: model.pricing.input,
      priceCurrency: "USD",
      description: `Per 1M input tokens. Output: $${model.pricing.output}/1M tokens.`,
    },
    author: {
      "@type": "Organization",
      name: provider.displayName,
      url: provider.website,
    },
    datePublished: model.releaseDate,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href={`/${provider.provider}`} className="hover:text-foreground">
            {provider.displayName}
          </Link>
          {" / "}
          <span className="text-foreground">{model.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div
              className="h-6 w-6 rounded-md"
              style={{ backgroundColor: provider.color }}
            />
            <h1 className="text-3xl md:text-4xl font-bold">{model.name}</h1>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${status.className}`}
            >
              {status.emoji} {status.label}
            </span>
          </div>
          <p className="text-lg text-muted-foreground">{model.description}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg border border-border/50 bg-card p-4">
            <div className="text-sm text-muted-foreground mb-1">Context Window</div>
            <div className="text-xl font-bold">{formatContextWindow(model.contextWindow)}</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card p-4">
            <div className="text-sm text-muted-foreground mb-1">Input Price</div>
            <div className="text-xl font-bold">{formatPrice(model.pricing.input)}<span className="text-sm font-normal text-muted-foreground">/1M</span></div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card p-4">
            <div className="text-sm text-muted-foreground mb-1">Output Price</div>
            <div className="text-xl font-bold">{formatPrice(model.pricing.output)}<span className="text-sm font-normal text-muted-foreground">/1M</span></div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card p-4">
            <div className="text-sm text-muted-foreground mb-1">Released</div>
            <div className="text-xl font-bold">{formatDate(model.releaseDate)}</div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3">Capabilities</h2>
          <div className="flex flex-wrap gap-2">
            {model.capabilities.map((cap) => (
              <span
                key={cap}
                className="inline-flex items-center rounded-md border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* Deprecation notice */}
        {model.status === "deprecated" && model.deprecationDate && (
          <div className="mb-8 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
            <p className="text-yellow-400 font-semibold">⚠️ This model was deprecated on {formatDate(model.deprecationDate)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Consider migrating to a newer model from {provider.displayName}.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mb-8 rounded-lg border border-border/50 bg-card p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Try {model.name} via Crazyrouter API</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Access {model.name} and 100+ other AI models with a single API key.
          </p>
          <a
            href={`https://crazyrouter.com?utm_source=aichangelog&utm_medium=model&utm_campaign=${model.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Get API Access →
          </a>
        </div>

        {/* Version History */}
        <section>
          <h2 className="text-xl font-bold mb-4">Version History</h2>
          <div className="relative">
            {[...model.changelog]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((entry, i) => {
                const badge = getChangeTypeBadge(entry.type);
                return (
                  <div key={`${entry.date}-${i}`} className="relative pl-8 pb-8 last:pb-0">
                    <div className="absolute left-3 top-0 h-full w-px bg-border" />
                    <div
                      className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full border-2 border-background"
                      style={{ backgroundColor: provider.color }}
                    />
                    <div className="rounded-lg border border-border/50 bg-card p-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(entry.date)}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{entry.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
}
