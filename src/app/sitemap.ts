import { MetadataRoute } from "next";
import { getAllProviders } from "@/lib/data";
import { getLanguageAlternates, getLocalizedPath, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aichangelog.dev";
  const paths = ["/", "/changelog", "/api-models"];

  for (const provider of getAllProviders()) {
    paths.push(`/${provider.provider}`);
    for (const model of provider.models) {
      paths.push(`/${provider.provider}/${model.id}`);
    }
  }

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}${getLocalizedPath(locale, path)}`,
      alternates: { languages: Object.fromEntries(Object.entries(getLanguageAlternates(path)).map(([lang, url]) => [lang, baseUrl + url])) },
      lastModified: new Date(),
      changeFrequency: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1 : 0.7,
    }))
  );
}
