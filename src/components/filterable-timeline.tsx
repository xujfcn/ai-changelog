"use client";

import { useState, useMemo } from "react";
import { FlatChangelogEntry, getAllProviders } from "@/lib/data";
import { Timeline } from "./timeline";

interface FilterableTimelineProps {
  entries: FlatChangelogEntry[];
  showProviderFilter?: boolean;
  showTypeFilter?: boolean;
  showSearch?: boolean;
}

export function FilterableTimeline({
  entries,
  showProviderFilter = true,
  showTypeFilter = true,
  showSearch = true,
}: FilterableTimelineProps) {
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const providers = getAllProviders();
  const changeTypes = [
    { value: "all", label: "All Types" },
    { value: "release", label: "New Releases" },
    { value: "update", label: "Updates" },
    { value: "pricing", label: "Pricing Changes" },
    { value: "deprecation", label: "Deprecations" },
  ];

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      if (providerFilter !== "all" && entry.providerSlug !== providerFilter) return false;
      if (typeFilter !== "all" && entry.type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          entry.modelName.toLowerCase().includes(q) ||
          entry.description.toLowerCase().includes(q) ||
          entry.providerName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [entries, providerFilter, typeFilter, search]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {showSearch && (
          <input
            type="text"
            placeholder="Search models, updates..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        {showProviderFilter && (
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
          >
            <option value="all">All Providers</option>
            {providers.map((p) => (
              <option key={p.provider} value={p.provider}>
                {p.displayName}
              </option>
            ))}
          </select>
        )}
        {showTypeFilter && (
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {changeTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        )}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No results found</p>
          <p className="text-sm mt-1">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <Timeline entries={filtered} />
      )}
    </div>
  );
}
