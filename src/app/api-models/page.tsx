import type { Metadata } from "next";
import { ApiCatalogue } from "@/components/api-catalogue";
import { LocalizedShell } from "@/components/localized-shell";
import { getLanguageAlternates } from "@/lib/i18n";

export const metadata: Metadata = { title: "Current Crazyrouter API models", alternates: { canonical: "/api-models", languages: getLanguageAlternates("/api-models") } };
export default function Page() {
  return <LocalizedShell locale="en"><ApiCatalogue locale="en" /></LocalizedShell>;
}
