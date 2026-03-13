import Link from "next/link";
import { getAllProviders } from "@/lib/data";

export function Footer() {
  const providers = getAllProviders();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-bold">
              📋 AI Changelog
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Track every AI model update in one place.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Providers</h3>
            <ul className="space-y-2">
              {providers.map((p) => (
                <li key={p.provider}>
                  <Link
                    href={`/${p.provider}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {p.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/changelog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Full Changelog
                </Link>
              </li>
              <li>
                <Link
                  href="/feed.xml"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  RSS Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">API Access</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://crazyrouter.com?utm_source=aichangelog&utm_medium=footer&utm_campaign=seo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Crazyrouter API →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Model Changelog. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <a
              href="https://crazyrouter.com?utm_source=aichangelog&utm_medium=footer&utm_campaign=seo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              Crazyrouter
            </a>{" "}
            — One API key for all these models
          </p>
        </div>
      </div>
    </footer>
  );
}
