import { Metadata } from "next";
import {
  formatContextWindow,
  formatPrice,
  formatPriceUnit,
  getModel,
  getProvider,
  getStatusBadge,
} from "@/lib/data";
import {
  defaultLocale,
  getDictionary,
  getHtmlLang,
  getLanguageAlternates,
  getOgLocale,
  Locale,
} from "@/lib/i18n";

export function getProviderMetadata(
  providerSlug: string,
  locale: Locale = defaultLocale
): Metadata {
  const provider = getProvider(providerSlug);
  if (!provider) return {};
  const t = getDictionary(locale);
  const title = `${provider.displayName} ${t.provider.titleSuffix}`;
  const alternates = getLanguageAlternates(`/${providerSlug}`);
  const description = t.provider.description(
    provider.displayName,
    provider.models.map((model) => model.name).join(", ")
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: getOgLocale(locale),
    },
    alternates: {
      canonical: alternates[getHtmlLang(locale)],
      languages: alternates,
    },
  };
}

export function getModelMetadata(
  providerSlug: string,
  modelId: string,
  locale: Locale = defaultLocale
): Metadata {
  const result = getModel(providerSlug, modelId);
  if (!result) return {};

  const { provider, model } = result;
  const t = getDictionary(locale);
  const priceUnit = formatPriceUnit(model.pricing);
  const status = getStatusBadge(model.status, locale).label;
  const title = `${model.name} - ${t.model.titleSuffix(provider.displayName)}`;
  const alternates = getLanguageAlternates(`/${providerSlug}/${modelId}`);
  const description = t.model.description(
    model.name,
    formatContextWindow(model.contextWindow),
    status,
    formatPrice(model.pricing.input),
    formatPrice(model.pricing.output),
    priceUnit
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: getOgLocale(locale),
    },
    alternates: {
      canonical: alternates[getHtmlLang(locale)],
      languages: alternates,
    },
  };
}
