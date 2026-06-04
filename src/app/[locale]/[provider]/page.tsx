import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedShell } from "@/components/localized-shell";
import { ProviderPageContent } from "@/components/provider-page-content";
import { getAllProviders, getProvider } from "@/lib/data";
import {
  isLocale,
  locales,
  Locale,
} from "@/lib/i18n";
import { getProviderMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllProviders().map((provider) => ({
      locale,
      provider: provider.provider,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; provider: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, provider: providerSlug } = await params;
  if (!isLocale(localeParam)) return {};
  const provider = getProvider(providerSlug);
  if (!provider) return {};
  return getProviderMetadata(provider.provider, localeParam as Locale);
}

export default async function LocalizedProviderPage({
  params,
}: {
  params: Promise<{ locale: string; provider: string }>;
}) {
  const { locale: localeParam, provider } = await params;
  if (!isLocale(localeParam)) notFound();

  return (
    <LocalizedShell locale={localeParam}>
      <ProviderPageContent providerSlug={provider} locale={localeParam} />
    </LocalizedShell>
  );
}
