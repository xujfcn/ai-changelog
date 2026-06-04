import { MetadataRoute } from "next";
import { getAllProviders } from "@/lib/data";
import { getLocalizedPath, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aichangelog.com";
  const paths = ["/", "/changelog"];

  for (const provider of getAllProviders()) {
    paths.push(`/${provider.provider}`);
    for (const model of provider.models) {
      paths.push(`/${provider.provider}/${model.id}`);
    }
  }

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}${getLocalizedPath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1 : 0.7,
    }))
  );
}
