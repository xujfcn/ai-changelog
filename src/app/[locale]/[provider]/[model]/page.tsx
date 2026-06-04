import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedShell } from "@/components/localized-shell";
import { ModelPageContent } from "@/components/model-page-content";
import { getAllProviders, getModel } from "@/lib/data";
import {
  isLocale,
  locales,
  Locale,
} from "@/lib/i18n";
import { getModelMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllProviders().flatMap((provider) =>
      provider.models.map((model) => ({
        locale,
        provider: provider.provider,
        model: model.id,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; provider: string; model: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, provider: providerSlug, model: modelId } = await params;
  if (!isLocale(localeParam)) return {};
  const result = getModel(providerSlug, modelId);
  if (!result) return {};
  return getModelMetadata(providerSlug, modelId, localeParam as Locale);
}

export default async function LocalizedModelPage({
  params,
}: {
  params: Promise<{ locale: string; provider: string; model: string }>;
}) {
  const { locale: localeParam, provider, model } = await params;
  if (!isLocale(localeParam)) notFound();

  return (
    <LocalizedShell locale={localeParam}>
      <ModelPageContent providerSlug={provider} modelId={model} locale={localeParam} />
    </LocalizedShell>
  );
}
