import Link from "next/link";
import { Model, formatContextWindow, formatPrice, formatPriceUnit, getStatusBadge } from "@/lib/data";
import { defaultLocale, getDictionary, getLocalizedPath, Locale } from "@/lib/i18n";
import { localizeCapability } from "@/lib/localized-content";

interface ModelCardProps {
  model: Model;
  providerSlug: string;
  providerColor: string;
  locale?: Locale;
}

export function ModelCard({
  model,
  providerSlug,
  providerColor,
  locale = defaultLocale,
}: ModelCardProps) {
  const status = getStatusBadge(model.status, locale);
  const t = getDictionary(locale).common;

  return (
    <Link
      href={getLocalizedPath(locale, `/${providerSlug}/${model.id}`)}
      className="group block rounded-lg border border-border/50 bg-card p-4 transition-all hover:border-border hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-foreground group-hover:underline">{model.name}</h3>
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${status.className}`}
        >
          {status.emoji} {status.label}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{model.description}</p>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <div>
          <span className="font-medium text-foreground/70">{t.context}:</span>{" "}
          {formatContextWindow(model.contextWindow)}
        </div>
        <div>
          <span className="font-medium text-foreground/70">{t.input}:</span>{" "}
          {formatPrice(model.pricing.input)}/{formatPriceUnit(model.pricing)}
        </div>
        <div>
          <span className="font-medium text-foreground/70">{t.output}:</span>{" "}
          {formatPrice(model.pricing.output)}/{formatPriceUnit(model.pricing)}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {model.capabilities.slice(0, 4).map((cap) => (
          <span
            key={cap}
            className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
          >
            {localizeCapability(cap, locale)}
          </span>
        ))}
        {model.capabilities.length > 4 && (
          <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
            +{model.capabilities.length - 4}
          </span>
        )}
      </div>
      <div
        className="mt-3 h-0.5 w-full rounded-full opacity-30"
        style={{ backgroundColor: providerColor }}
      />
    </Link>
  );
}
