"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { getAllProviders } from "@/lib/data";
import {
  defaultLocale,
  getDictionary,
  getLocalizedPath,
  localeLabels,
  locales,
  Locale,
  stripLocale,
} from "@/lib/i18n";

export function Header({ locale = defaultLocale }: { locale?: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const providers = getAllProviders();
  const pathname = usePathname();
  const t = getDictionary(locale).common;
  const pathWithoutLocale = stripLocale(pathname || "/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center px-4">
        <Link href={getLocalizedPath(locale)} className="mr-6 flex items-center space-x-2">
          <span className="text-lg font-bold">📋 {t.siteShortName}</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {providers.map((p) => (
            <Link
              key={p.provider}
              href={getLocalizedPath(locale, `/${p.provider}`)}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {p.displayName}
            </Link>
          ))}
          <Link
            href={getLocalizedPath(locale, "/changelog")}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t.changelog}
          </Link>
        </nav>
        <div className="flex-1" />
        <label className="sr-only" htmlFor="language-switcher">
          {t.language}
        </label>
        <select
          id="language-switcher"
          className="hidden sm:block rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground"
          value={locale}
          onChange={(event) => {
            window.location.href = getLocalizedPath(event.target.value as Locale, pathWithoutLocale);
          }}
        >
          {locales.map((item) => (
            <option key={item} value={item}>
              {localeLabels[item]}
            </option>
          ))}
        </select>
        <button
          className="ml-2 md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container mx-auto max-w-6xl px-4 py-4 flex flex-col space-y-3">
            {providers.map((p) => (
              <Link
                key={p.provider}
                href={getLocalizedPath(locale, `/${p.provider}`)}
                className="text-sm text-foreground/60 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {p.displayName}
              </Link>
            ))}
            <Link
              href={getLocalizedPath(locale, "/changelog")}
              className="text-sm text-foreground/60 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t.changelog}
            </Link>
            <div className="grid grid-cols-2 gap-2 pt-2 sm:hidden">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={getLocalizedPath(item, pathWithoutLocale)}
                  className={`rounded-md border border-border px-3 py-2 text-sm ${
                    item === locale ? "bg-accent text-foreground" : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {localeLabels[item]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
