import openaiData from "@/data/models/openai.json";
import anthropicData from "@/data/models/anthropic.json";
import googleData from "@/data/models/google.json";
import deepseekData from "@/data/models/deepseek.json";
import metaData from "@/data/models/meta.json";
import mistralData from "@/data/models/mistral.json";

export interface ChangelogEntry {
  date: string;
  type: "release" | "update" | "pricing" | "deprecation";
  description: string;
}

export interface ModelPricing {
  input: number | null;
  output: number | null;
  unit?: string;
  note?: string;
}

export interface Model {
  id: string;
  name: string;
  status: "active" | "deprecated" | "preview";
  contextWindow: number;
  releaseDate: string;
  deprecationDate?: string;
  description: string;
  pricing: ModelPricing;
  capabilities: string[];
  changelog: ChangelogEntry[];
}

export interface Provider {
  provider: string;
  displayName: string;
  color: string;
  website: string;
  models: Model[];
}

export interface FlatChangelogEntry extends ChangelogEntry {
  providerSlug: string;
  providerName: string;
  providerColor: string;
  modelId: string;
  modelName: string;
}

const allProviders: Provider[] = [
  openaiData as Provider,
  anthropicData as Provider,
  googleData as Provider,
  deepseekData as Provider,
  metaData as Provider,
  mistralData as Provider,
];

export function getAllProviders(): Provider[] {
  return allProviders;
}

export function getProvider(slug: string): Provider | undefined {
  return allProviders.find((p) => p.provider === slug);
}

export function getModel(
  providerSlug: string,
  modelId: string
): { provider: Provider; model: Model } | undefined {
  const provider = getProvider(providerSlug);
  if (!provider) return undefined;
  const model = provider.models.find((m) => m.id === modelId);
  if (!model) return undefined;
  return { provider, model };
}

export function getAllChangelog(): FlatChangelogEntry[] {
  const entries: FlatChangelogEntry[] = [];

  for (const provider of allProviders) {
    for (const model of provider.models) {
      for (const entry of model.changelog) {
        entries.push({
          ...entry,
          providerSlug: provider.provider,
          providerName: provider.displayName,
          providerColor: provider.color,
          modelId: model.id,
          modelName: model.name,
        });
      }
    }
  }

  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return entries;
}

export function getRecentChangelog(limit: number = 20): FlatChangelogEntry[] {
  return getAllChangelog().slice(0, limit);
}

export function formatContextWindow(tokens: number): string {
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(tokens % 1000000 === 0 ? 0 : 1)}M`;
  }
  return `${(tokens / 1000).toFixed(0)}K`;
}

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return "N/A";
  if (price === 0) return "Free";
  return `$${price.toFixed(2)}`;
}

export function formatPriceUnit(pricing: ModelPricing): string {
  return pricing.unit || "1M";
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const providerSlugs = allProviders.map((p) => p.provider);

export function getProviderColor(provider: string): string {
  const p = getProvider(provider);
  return p?.color || "#666";
}

export function getStatusBadge(status: string): { label: string; emoji: string; className: string } {
  switch (status) {
    case "active":
      return { label: "Active", emoji: "✅", className: "bg-green-500/10 text-green-400 border-green-500/20" };
    case "deprecated":
      return { label: "Deprecated", emoji: "⚠️", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" };
    case "preview":
      return { label: "Preview", emoji: "🔬", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
    default:
      return { label: status, emoji: "", className: "bg-gray-500/10 text-gray-400 border-gray-500/20" };
  }
}

export function getChangeTypeBadge(type: string): { label: string; className: string } {
  switch (type) {
    case "release":
      return { label: "New Release", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
    case "update":
      return { label: "Update", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
    case "pricing":
      return { label: "Pricing Change", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
    case "deprecation":
      return { label: "Deprecation", className: "bg-red-500/10 text-red-400 border-red-500/20" };
    default:
      return { label: type, className: "bg-gray-500/10 text-gray-400 border-gray-500/20" };
  }
}
