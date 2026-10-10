import Link from "next/link";
import { apiSnapshot, apiText, crazyrouterLink } from "@/lib/crazyrouter";
import { getLocalizedPath, Locale } from "@/lib/i18n";

const benchmarkNotes: Record<Locale, string> = {
  en: "10 Chinese tasks, three rounds per model. Different upstream routes; cache and thinking modes were not fully controlled.",
  zh: "10 类中文任务，每模型各 3 轮。上游路径不同，缓存与思考模式未完全控制。",
  ja: "中国語の10課題を各モデルで3回実測。上流経路が異なり、キャッシュと思考モードは完全には制御されていません。",
  ko: "중국어 과제 10종을 모델별 3회 실측했습니다. 서로 다른 경로를 사용했으며 캐시와 사고 모드는 완전히 통제되지 않았습니다.",
  ru: "10 задач на китайском, по три запуска для каждой модели. Маршруты различались; кеш и режим размышления не были полностью контролируемыми.",
  pt: "10 tarefas em chinês, três rodadas por modelo. Rotas diferentes; cache e modos de raciocínio não foram totalmente controlados. Relatório em inglês.",
};

export function ApiCatalogue({ locale }: { locale: Locale }) {
  const t = apiText[locale];
  return <main className="container mx-auto max-w-6xl px-4 py-8">
    <Link href={getLocalizedPath(locale)} className="text-sm text-muted-foreground">AI Changelog</Link>
    <h1 className="mt-4 text-3xl font-bold">{t.title}</h1>
    <p className="mt-2 text-sm text-muted-foreground">{t.checked}: {apiSnapshot.observedAt}</p>
    <p className="my-4 max-w-3xl text-sm text-muted-foreground">{t.note}</p>
    <a href={crazyrouterLink(locale, `/${locale}/pricing`, "api_catalogue", "catalogue_prices")}>{t.prices} →</a>
    <section className="mt-5 border-t border-border/40 pt-4">
      <a href={crazyrouterLink(locale, `/${locale === "pt" ? "en" : locale}/blog/claude-haiku-5-5-vs-deepseek-v4-1-flash-everyday-benchmark-2026-${locale === "pt" ? "en" : locale}`, "haiku55_deepseek41flash_benchmark", "benchmark_report")}>
        Claude Haiku 5.5 vs DeepSeek V4.1 Flash →
      </a>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">2026-10-09 · {benchmarkNotes[locale]}</p>
    </section>
    <div className="mt-6 overflow-x-auto"><table className="w-full text-sm">
      <thead><tr className="border-b text-left"><th className="py-3 pr-4">Model</th><th className="pr-4">{t.input}</th><th className="pr-4">{t.output}</th><th>{t.tier}</th></tr></thead>
      <tbody>{apiSnapshot.models.map(model => <tr key={model.model} className="border-b border-border/40">
        <td className="py-3 pr-4"><code>{model.model}</code></td><td className="pr-4">${model.input}</td><td className="pr-4">${model.output}</td><td>{model.tiers[0]?.name || "standard"}</td>
      </tr>)}</tbody>
    </table></div>
  </main>;
}
