import Link from "next/link";
import { apiSnapshot, apiText, crazyrouterLink } from "@/lib/crazyrouter";
import { getLocalizedPath, Locale } from "@/lib/i18n";

export function ApiCatalogue({ locale }: { locale: Locale }) {
  const t = apiText[locale];
  return <main className="container mx-auto max-w-6xl px-4 py-8">
    <Link href={getLocalizedPath(locale)} className="text-sm text-muted-foreground">AI Changelog</Link>
    <h1 className="mt-4 text-3xl font-bold">{t.title}</h1>
    <p className="mt-2 text-sm text-muted-foreground">{t.checked}: {apiSnapshot.observedAt}</p>
    <p className="my-4 max-w-3xl text-sm text-muted-foreground">{t.note}</p>
    <a href={crazyrouterLink(locale, `/${locale}/pricing`, "api_catalogue", "catalogue_prices")}>{t.prices} →</a>
    <div className="mt-6 overflow-x-auto"><table className="w-full text-sm">
      <thead><tr className="border-b text-left"><th className="py-3 pr-4">Model</th><th className="pr-4">{t.input}</th><th className="pr-4">{t.output}</th><th>{t.tier}</th></tr></thead>
      <tbody>{apiSnapshot.models.map(model => <tr key={model.model} className="border-b border-border/40">
        <td className="py-3 pr-4"><code>{model.model}</code></td><td className="pr-4">${model.input}</td><td className="pr-4">${model.output}</td><td>{model.tiers[0]?.name || "standard"}</td>
      </tr>)}</tbody>
    </table></div>
  </main>;
}
