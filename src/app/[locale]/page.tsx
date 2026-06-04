import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePageContent } from "@/app/page";
import { LocalizedShell } from "@/components/localized-shell";
import {
  getDictionary,
  getHtmlLang,
  getLanguageAlternates,
  getOgLocale,
  isLocale,
  locales,
  Locale,
} from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const t = getDictionary(locale);
  const alternates = getLanguageAlternates();

  return {
    title: t.home.title,
    description: t.home.description,
    openGraph: {
      title: t.home.title,
      description: t.home.description,
      locale: getOgLocale(locale),
    },
    alternates: {
      canonical: alternates[getHtmlLang(locale)],
      languages: alternates,
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  return (
    <LocalizedShell locale={localeParam}>
      <HomePageContent locale={localeParam} />
    </LocalizedShell>
  );
}
