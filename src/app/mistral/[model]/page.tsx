import { Metadata } from "next";
import { LocalizedShell } from "@/components/localized-shell";
import { ModelPageContent } from "@/components/model-page-content";
import { getProvider } from "@/lib/data";
import { defaultLocale } from "@/lib/i18n";
import { getModelMetadata } from "@/lib/metadata";

const providerSlug = "mistral";

export function generateStaticParams() {
  const provider = getProvider(providerSlug);
  return provider?.models.map((model) => ({ model: model.id })) || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>;
}): Promise<Metadata> {
  const { model } = await params;
  return getModelMetadata(providerSlug, model, defaultLocale);
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  return (
    <LocalizedShell locale={defaultLocale}>
      <ModelPageContent providerSlug={providerSlug} modelId={model} locale={defaultLocale} />
    </LocalizedShell>
  );
}