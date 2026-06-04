import { Metadata } from "next";
import { LocalizedShell } from "@/components/localized-shell";
import { ProviderPageContent } from "@/components/provider-page-content";
import { defaultLocale } from "@/lib/i18n";
import { getProviderMetadata } from "@/lib/metadata";

export const metadata: Metadata = getProviderMetadata("openai", defaultLocale);

export default function ProviderPage() {
  return (
    <LocalizedShell locale={defaultLocale}>
      <ProviderPageContent providerSlug="openai" locale={defaultLocale} />
    </LocalizedShell>
  );
}