"use client";

import Link from "next/link";
import { useState } from "react";
import { getAllProviders } from "@/lib/data";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const providers = getAllProviders();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-lg font-bold">📋 AI Changelog</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {providers.map((p) => (
            <Link
              key={p.provider}
              href={`/${p.provider}`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {p.displayName}
            </Link>
          ))}
          <Link
            href="/changelog"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Changelog
          </Link>
        </nav>
        <div className="flex-1" />
        <button
          className="md:hidden p-2"
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
                href={`/${p.provider}`}
                className="text-sm text-foreground/60 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {p.displayName}
              </Link>
            ))}
            <Link
              href="/changelog"
              className="text-sm text-foreground/60 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Changelog
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
