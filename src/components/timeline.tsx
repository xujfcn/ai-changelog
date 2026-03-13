import Link from "next/link";
import { FlatChangelogEntry, formatDate, getChangeTypeBadge } from "@/lib/data";

export function TimelineEntry({ entry }: { entry: FlatChangelogEntry }) {
  const badge = getChangeTypeBadge(entry.type);

  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-3 top-0 h-full w-px bg-border" />
      {/* Timeline dot */}
      <div
        className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full border-2 border-background"
        style={{ backgroundColor: entry.providerColor }}
      />
      <div className="group rounded-lg border border-border/50 bg-card p-4 transition-colors hover:border-border">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground">{formatDate(entry.date)}</span>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
          <Link
            href={`/${entry.providerSlug}`}
            className="text-xs font-medium hover:underline"
            style={{ color: entry.providerColor }}
          >
            {entry.providerName}
          </Link>
        </div>
        <Link
          href={`/${entry.providerSlug}/${entry.modelId}`}
          className="font-semibold text-foreground hover:underline"
        >
          {entry.modelName}
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
      </div>
    </div>
  );
}

export function Timeline({ entries }: { entries: FlatChangelogEntry[] }) {
  return (
    <div className="relative">
      {entries.map((entry, i) => (
        <TimelineEntry key={`${entry.modelId}-${entry.date}-${i}`} entry={entry} />
      ))}
    </div>
  );
}
