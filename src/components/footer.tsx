import Link from "next/link";
import { getAllProviders } from "@/lib/data";
import { defaultLocale, getDictionary, getLocalizedPath, Locale } from "@/lib/i18n";

export function Footer({ locale = defaultLocale }: { locale?: Locale }) {
  const providers = getAllProviders();
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href={getLocalizedPath(locale)} className="text-lg font-bold">
              📋 {t.common.siteShortName}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">{t.common.providers}</h3>
            <ul className="space-y-2">
              {providers.map((p) => (
                <li key={p.provider}>
                  <Link
                    href={getLocalizedPath(locale, `/${p.provider}`)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {p.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">{t.common.resources}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getLocalizedPath(locale, "/changelog")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.changelog.heading}
                </Link>
              </li>
              <li>
                <Link
                  href="/feed.xml"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.common.rssFeed}
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.common.sitemap}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">{t.common.apiAccess}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://crazyrouter.com?utm_source=aichangelog&utm_medium=footer&utm_campaign=seo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.common.crazyrouterApi} →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Model Changelog. {t.common.allRightsReserved}
          </p>
          <p className="text-sm text-muted-foreground">
            {t.common.poweredBy}{" "}
            <a
              href="https://crazyrouter.com?utm_source=aichangelog&utm_medium=footer&utm_campaign=seo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              Crazyrouter
            </a>{" "}
            — {t.common.oneApiKey}
          </p>
        </div>
      </div>
    </footer>
  );
}
