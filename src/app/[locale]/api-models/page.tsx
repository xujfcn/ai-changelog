import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiCatalogue } from "@/components/api-catalogue";
import { LocalizedShell } from "@/components/localized-shell";
import { apiText } from "@/lib/crazyrouter";
import { getLanguageAlternates, getLocalizedPath, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: apiText[locale].title, alternates: { canonical: getLocalizedPath(locale, "/api-models"), languages: getLanguageAlternates("/api-models") } };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LocalizedShell locale={locale}><ApiCatalogue locale={locale} /></LocalizedShell>;
}
