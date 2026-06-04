import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatContextWindow,
  formatDate,
  formatPrice,
  formatPriceUnit,
  getChangeTypeBadge,
  getModel,
  getStatusBadge,
} from "@/lib/data";
import { defaultLocale, getDictionary, getLocalizedPath, Locale } from "@/lib/i18n";

export function ModelPageContent({
  providerSlug,
  modelId,
  locale = defaultLocale,
}: {
  providerSlug: string;
  modelId: string;
  locale?: Locale;
}) {
  const result = getModel(providerSlug, modelId);
  if (!result) notFound();

  const { provider, model } = result;
  const status = getStatusBadge(model.status, locale);
  const priceUnit = formatPriceUnit(model.pricing);
  const t = getDictionary(locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: model.name,
    applicationCategory: "AI Model",
    operatingSystem: "Cloud",
    offers: {
      "@type": "Offer",
      price: model.pricing.input ?? 0,
      priceCurrency: "USD",
      description:
        model.pricing.note ||
        `Per ${priceUnit} input tokens. Output: ${formatPrice(model.pricing.output)}/${priceUnit} tokens.`,
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
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href={getLocalizedPath(locale)} className="hover:text-foreground">
            {t.common.home}
          </Link>
          {" / "}
          <Link href={getLocalizedPath(locale, `/${provider.provider}`)} className="hover:text-foreground">
            {provider.displayName}
          </Link>
          {" / "}
          <span className="text-foreground">{model.name}</span>
        </nav>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div className="h-6 w-6 rounded-md" style={{ backgroundColor: provider.color }} />
            <h1 className="text-3xl md:text-4xl font-bold">{model.name}</h1>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${status.className}`}
            >
              {status.emoji} {status.label}
            </span>
          </div>
          <p className="text-lg text-muted-foreground">{model.description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg border border-border/50 bg-card p-4">
            <div className="text-sm text-muted-foreground mb-1">{t.common.contextWindow}</div>
            <div className="text-xl font-bold">{formatContextWindow(model.contextWindow)}</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card p-4">
            <div className="text-sm text-muted-foreground mb-1">{t.common.inputPrice}</div>
            <div className="text-xl font-bold">
              {formatPrice(model.pricing.input)}
              <span className="text-sm font-normal text-muted-foreground">/{priceUnit}</span>
            </div>
            {model.pricing.note && <div className="mt-1 text-xs text-muted-foreground">{model.pricing.note}</div>}
          </div>
          <div className="rounded-lg border border-border/50 bg-card p-4">
            <div className="text-sm text-muted-foreground mb-1">{t.common.outputPrice}</div>
            <div className="text-xl font-bold">
              {formatPrice(model.pricing.output)}
              <span className="text-sm font-normal text-muted-foreground">/{priceUnit}</span>
            </div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card p-4">
            <div className="text-sm text-muted-foreground mb-1">{t.common.released}</div>
            <div className="text-xl font-bold">{formatDate(model.releaseDate, locale)}</div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3">{t.common.capabilities}</h2>
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

        {model.status === "deprecated" && model.deprecationDate && (
          <div className="mb-8 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
            <p className="text-yellow-400 font-semibold">
              ⚠️ {t.model.deprecatedNotice(formatDate(model.deprecationDate, locale))}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t.model.migrateNotice(provider.displayName)}
            </p>
          </div>
        )}

        <div className="mb-8 rounded-lg border border-border/50 bg-card p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">{t.model.tryViaApi(model.name)}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t.model.apiBody(model.name)}</p>
          <a
            href={`https://crazyrouter.com?utm_source=aichangelog&utm_medium=model&utm_campaign=${model.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            {t.common.getApiAccess} →
          </a>
        </div>

        <section>
          <h2 className="text-xl font-bold mb-4">{t.model.versionHistory}</h2>
          <div className="relative">
            {[...model.changelog]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((entry, i) => {
                const badge = getChangeTypeBadge(entry.type, locale);
                return (
                  <div key={`${entry.date}-${i}`} className="relative pl-8 pb-8 last:pb-0">
                    <div className="absolute left-3 top-0 h-full w-px bg-border" />
                    <div
                      className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full border-2 border-background"
                      style={{ backgroundColor: provider.color }}
                    />
                    <div className="rounded-lg border border-border/50 bg-card p-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground">{formatDate(entry.date, locale)}</span>
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
