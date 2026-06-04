import Link from "next/link";
import { getAllProviders, getRecentChangelog } from "@/lib/data";
import { FilterableTimeline } from "@/components/filterable-timeline";
import { LocalizedShell } from "@/components/localized-shell";
import { defaultLocale, getDictionary, getLocalizedPath, Locale } from "@/lib/i18n";
import { localizeFlatChangelogEntries } from "@/lib/localized-content";

export function FAQSchema({ locale = defaultLocale }: { locale?: Locale }) {
  const t = getDictionary(locale).home.faq;
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t.whatQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: t.whatAnswer,
        },
      },
      {
        "@type": "Question",
        name: t.providersQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: t.providersAnswer,
        },
      },
      {
        "@type": "Question",
        name: t.frequencyQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: t.frequencyAnswer,
        },
      },
      {
        "@type": "Question",
        name: t.apiQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: t.apiAnswer,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
    />
  );
}

export default function HomePage() {
  return (
    <LocalizedShell locale={defaultLocale}>
      <HomePageContent locale={defaultLocale} />
    </LocalizedShell>
  );
}

export function HomePageContent({ locale = defaultLocale }: { locale?: Locale }) {
  const providers = getAllProviders();
  const recentChanges = localizeFlatChangelogEntries(getRecentChangelog(30), locale);
  const t = getDictionary(locale);

  const stats = {
    providers: providers.length,
    models: providers.reduce((acc, p) => acc + p.models.length, 0),
    activeModels: providers.reduce(
      (acc, p) => acc + p.models.filter((m) => m.status === "active").length,
      0
    ),
    changes: providers.reduce(
      (acc, p) =>
        acc + p.models.reduce((a, m) => a + m.changelog.length, 0),
      0
    ),
  };

  return (
    <>
      <FAQSchema locale={locale} />
      {/* Hero */}
      <section className="border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {t.home.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t.home.heroSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {providers.map((p) => (
              <Link
                key={p.provider}
                href={getLocalizedPath(locale, `/${p.provider}`)}
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: p.color }}
                />
                {p.displayName}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="rounded-lg border border-border/50 bg-card p-4">
              <div className="text-2xl font-bold">{stats.providers}</div>
              <div className="text-sm text-muted-foreground">{t.common.providers}</div>
            </div>
            <div className="rounded-lg border border-border/50 bg-card p-4">
              <div className="text-2xl font-bold">{stats.models}</div>
              <div className="text-sm text-muted-foreground">{t.home.models}</div>
            </div>
            <div className="rounded-lg border border-border/50 bg-card p-4">
              <div className="text-2xl font-bold">{stats.activeModels}</div>
              <div className="text-sm text-muted-foreground">{t.home.activeModels}</div>
            </div>
            <div className="rounded-lg border border-border/50 bg-card p-4">
              <div className="text-2xl font-bold">{stats.changes}</div>
              <div className="text-sm text-muted-foreground">{t.home.updatesTracked}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Changes */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t.home.recentChanges}</h2>
          <Link
            href={getLocalizedPath(locale, "/changelog")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.common.viewAll} →
          </Link>
        </div>
        <FilterableTimeline entries={recentChanges} locale={locale} />
      </section>

      {/* CTA */}
      <section className="border-t border-border/40">
        <div className="container mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t.home.ctaTitle}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t.home.ctaBody}
          </p>
          <a
            href="https://crazyrouter.com?utm_source=aichangelog&utm_medium=homepage&utm_campaign=cta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            {t.common.getStarted} →
          </a>
        </div>
      </section>
    </>
  );
}
