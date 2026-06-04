import { Metadata } from "next";
import Link from "next/link";
import { getAllChangelog } from "@/lib/data";
import { FilterableTimeline } from "@/components/filterable-timeline";
import { LocalizedShell } from "@/components/localized-shell";
import { defaultLocale, getDictionary, getLocalizedPath, Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Full Changelog — All AI Model Updates",
  description:
    "Complete changelog of all AI model updates, releases, pricing changes, and deprecations across OpenAI, Anthropic, Google, DeepSeek, Meta, and Mistral.",
  openGraph: {
    title: "AI Model Changelog — Full History",
    description: "Complete history of all AI model updates in one place.",
  },
};

export default function ChangelogPage() {
  return (
    <LocalizedShell locale={defaultLocale}>
      <ChangelogPageContent locale={defaultLocale} />
    </LocalizedShell>
  );
}

export function ChangelogPageContent({ locale = defaultLocale }: { locale?: Locale }) {
  const allChanges = getAllChangelog();
  const t = getDictionary(locale);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href={getLocalizedPath(locale)} className="hover:text-foreground">
          {t.common.home}
        </Link>{" "}
        / <span className="text-foreground">{t.common.changelog}</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{t.changelog.heading}</h1>
          <p className="text-muted-foreground mt-1">
            {t.changelog.count(allChanges.length)}
          </p>
        </div>
        <a
          href="/feed.xml"
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
          </svg>
          {t.common.rssFeed}
        </a>
      </div>

      <FilterableTimeline entries={allChanges} locale={locale} />
    </div>
  );
}
