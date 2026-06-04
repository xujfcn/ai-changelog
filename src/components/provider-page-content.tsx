import Link from "next/link";
import { notFound } from "next/navigation";
import { FlatChangelogEntry, getProvider } from "@/lib/data";
import { ModelCard } from "@/components/model-card";
import { FilterableTimeline } from "@/components/filterable-timeline";
import { defaultLocale, getDictionary, getLocalizedPath, Locale } from "@/lib/i18n";
import { localizeFlatChangelogEntries, localizeModelForDisplay } from "@/lib/localized-content";

export function ProviderPageContent({
  providerSlug,
  locale = defaultLocale,
}: {
  providerSlug: string;
  locale?: Locale;
}) {
  const provider = getProvider(providerSlug);
  if (!provider) notFound();
  const t = getDictionary(locale);

  const localizedModels = provider.models.map((model) =>
    localizeModelForDisplay(model, provider.displayName, locale)
  );
  const activeModels = localizedModels.filter((model) => model.status === "active");
  const deprecatedModels = localizedModels.filter((model) => model.status === "deprecated");

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
  allChanges.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const localizedChanges = localizeFlatChangelogEntries(allChanges, locale);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href={getLocalizedPath(locale)} className="hover:text-foreground">
          {t.common.home}
        </Link>{" "}
        / <span className="text-foreground">{provider.displayName}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: provider.color }} />
          <h1 className="text-3xl md:text-4xl font-bold">{provider.displayName}</h1>
        </div>
        <p className="text-muted-foreground">
          {t.provider.stats(activeModels.length, deprecatedModels.length)} ·{" "}
          <a
            href={provider.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline"
          >
            {t.common.officialWebsite} →
          </a>
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">{t.provider.activeModels}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              providerSlug={provider.provider}
              providerColor={provider.color}
              locale={locale}
            />
          ))}
        </div>
      </section>

      {deprecatedModels.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">{t.provider.deprecatedModels}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deprecatedModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                providerSlug={provider.provider}
                providerColor={provider.color}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold mb-4">{t.provider.changeHistory}</h2>
        <FilterableTimeline entries={localizedChanges} locale={locale} showProviderFilter={false} />
      </section>
    </div>
  );
}
