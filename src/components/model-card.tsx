import Link from "next/link";
import { Model, formatContextWindow, formatPrice, getStatusBadge } from "@/lib/data";

interface ModelCardProps {
  model: Model;
  providerSlug: string;
  providerColor: string;
}

export function ModelCard({ model, providerSlug, providerColor }: ModelCardProps) {
  const status = getStatusBadge(model.status);

  return (
    <Link
      href={`/${providerSlug}/${model.id}`}
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
          <span className="font-medium text-foreground/70">Context:</span>{" "}
          {formatContextWindow(model.contextWindow)}
        </div>
        <div>
          <span className="font-medium text-foreground/70">Input:</span>{" "}
          {formatPrice(model.pricing.input)}/1M
        </div>
        <div>
          <span className="font-medium text-foreground/70">Output:</span>{" "}
          {formatPrice(model.pricing.output)}/1M
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {model.capabilities.slice(0, 4).map((cap) => (
          <span
            key={cap}
            className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
          >
            {cap}
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
