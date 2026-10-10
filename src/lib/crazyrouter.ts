import snapshot from "@/data/crazyrouter-pricing.json";
import type { Locale } from "./i18n";

export type ApiModel = (typeof snapshot.models)[number];
export const apiSnapshot = snapshot;

export function apiModel(id: string): ApiModel | undefined {
  return snapshot.models.find(model => model.model === id);
}

export function crazyrouterLink(locale: Locale, path: string, campaign: string, placement: string): string {
  const url = new URL(path, "https://crazyrouter.com");
  url.search = new URLSearchParams({ utm_source: "aichangelog", utm_medium: placement.startsWith("footer") ? "footer" : campaign === "cta" ? "homepage" : "model", utm_campaign: campaign, utm_content: `${campaign}__${locale}__${placement}` }).toString();
  return url.toString();
}

export const apiText = {
  en: { catalogue: "Crazyrouter API catalogue", prices: "Crazyrouter prices", vendorPrices: "Provider list prices", checked: "Catalogue checked", note: "USD per 1M tokens, default group. The first context tier is shown; long contexts may cost more. This is a gateway catalogue snapshot, not a provider release announcement.", unavailable: "Not confirmed in the current default-group API catalogue.", sample: "Chat Completions", input: "Input", output: "Output", tier: "Tier", title: "Current API models" },
  zh: { catalogue: "Crazyrouter API 模型目录", prices: "Crazyrouter 价格", vendorPrices: "厂商公开价格", checked: "目录核查时间", note: "USD / 百万 tokens，默认组。展示首个上下文档位，长上下文可能更贵。这是网关目录快照，不是厂商发布公告。", unavailable: "尚未在当前默认组 API 目录中确认。", sample: "Chat Completions", input: "输入", output: "输出", tier: "档位", title: "当前 API 模型" },
  ja: { catalogue: "Crazyrouter API モデル一覧", prices: "Crazyrouter 料金", vendorPrices: "提供元の公開料金", checked: "一覧確認日時", note: "USD / 100万 tokens、デフォルトグループ。最初の料金区分を表示しています。長いコンテキストでは料金が高くなる場合があります。これはゲートウェイの一覧であり、提供元のリリース発表ではありません。", unavailable: "現在のデフォルトグループ API 一覧では未確認です。", sample: "Chat Completions", input: "入力", output: "出力", tier: "料金区分", title: "現在の API モデル" },
  ko: { catalogue: "Crazyrouter API 모델 목록", prices: "Crazyrouter 요금", vendorPrices: "제공업체 공개 요금", checked: "목록 확인 시간", note: "USD / 100만 토큰, 기본 그룹. 첫 요금 구간을 표시합니다. 긴 컨텍스트에는 더 높은 요금이 적용될 수 있습니다. 게이트웨이 목록이며 제공업체의 출시 발표가 아닙니다.", unavailable: "현재 기본 그룹 API 목록에서 확인되지 않았습니다.", sample: "Chat Completions", input: "입력", output: "출력", tier: "요금 구간", title: "현재 API 모델" },
  ru: { catalogue: "Каталог API Crazyrouter", prices: "Цены Crazyrouter", vendorPrices: "Публичные цены поставщика", checked: "Каталог проверен", note: "USD за 1 млн токенов, группа по умолчанию. Показан первый тариф; длинный контекст может стоить дороже. Это снимок каталога шлюза, а не объявление поставщика о выпуске модели.", unavailable: "Наличие в текущем API-каталоге группы по умолчанию не подтверждено.", sample: "Chat Completions", input: "Ввод", output: "Вывод", tier: "Тариф", title: "Текущие модели API" },
  pt: { catalogue: "Catálogo da API Crazyrouter", prices: "Preços Crazyrouter", vendorPrices: "Preços públicos do provedor", checked: "Catálogo verificado", note: "USD por 1 milhão de tokens, grupo padrão. A primeira faixa é exibida; contextos longos podem custar mais. Este é um catálogo do gateway, não um anúncio de lançamento do provedor.", unavailable: "Disponibilidade não confirmada no catálogo atual da API para o grupo padrão.", sample: "Chat Completions", input: "Entrada", output: "Saída", tier: "Faixa", title: "Modelos atuais da API" },
} satisfies Record<Locale, Record<string, string>>;
