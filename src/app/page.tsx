import Link from "next/link";
import { getAllProviders, getRecentChangelog } from "@/lib/data";
import { FilterableTimeline } from "@/components/filterable-timeline";

function FAQSchema() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is AI Model Changelog?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI Model Changelog tracks version history, updates, deprecations, and pricing changes for all major AI models from providers like OpenAI, Anthropic, Google, DeepSeek, Meta, and Mistral.",
        },
      },
      {
        "@type": "Question",
        name: "Which AI model providers are tracked?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We track OpenAI (GPT-5, GPT-4o, o3), Anthropic (Claude Opus 4, Sonnet, Haiku), Google (Gemini), DeepSeek (V3, R1), Meta (Llama 4), and Mistral (Large, Codestral).",
        },
      },
      {
        "@type": "Question",
        name: "How often is the AI Model Changelog updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The changelog is updated as soon as providers announce new models, pricing changes, updates, or deprecations. We aim to reflect changes within 24 hours of official announcements.",
        },
      },
      {
        "@type": "Question",
        name: "Can I access these AI models through a single API?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Crazyrouter provides a unified API that lets you access all these models with a single API key. Visit crazyrouter.com to get started.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
    />
  );
}

export default function HomePage() {
  const providers = getAllProviders();
  const recentChanges = getRecentChangelog(30);

  const stats = {
    providers: providers.length,
    models: providers.reduce((acc, p) => acc + p.models.length, 0),
    activeModels: providers.reduce(
      (acc, p) => acc + p.models.filter((m) => m.status === "active").length,
      0
    ),
    changes: providers.reduce(
      (acc, p) =>
        acc + p.models.reduce((a, m) => a + m.changelog.length, 0),
      0
    ),
  };

  return (
    <>
      <FAQSchema />
      {/* Hero */}
      <section className="border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            AI Model Changelog
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Track every AI model update in one place — releases, pricing changes,
            deprecations, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {providers.map((p) => (
              <Link
                key={p.provider}
                href={`/${p.provider}`}
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: p.color }}
                />
                {p.displayName}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="rounded-lg border border-border/50 bg-card p-4">
              <div className="text-2xl font-bold">{stats.providers}</div>
              <div className="text-sm text-muted-foreground">Providers</div>
            </div>
            <div className="rounded-lg border border-border/50 bg-card p-4">
              <div className="text-2xl font-bold">{stats.models}</div>
              <div className="text-sm text-muted-foreground">Models</div>
            </div>
            <div className="rounded-lg border border-border/50 bg-card p-4">
              <div className="text-2xl font-bold">{stats.activeModels}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="rounded-lg border border-border/50 bg-card p-4">
              <div className="text-2xl font-bold">{stats.changes}</div>
              <div className="text-sm text-muted-foreground">Updates Tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Changes */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Changes</h2>
          <Link
            href="/changelog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </Link>
        </div>
        <FilterableTimeline entries={recentChanges} />
      </section>

      {/* CTA */}
      <section className="border-t border-border/40">
        <div className="container mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Access all these models with one API key
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Crazyrouter gives you a single API endpoint to access OpenAI, Anthropic, Google, DeepSeek, Meta, Mistral, and more.
          </p>
          <a
            href="https://crazyrouter.com?utm_source=aichangelog&utm_medium=homepage&utm_campaign=cta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Get Started with Crazyrouter →
          </a>
        </div>
      </section>
    </>
  );
}
