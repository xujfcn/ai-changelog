import { ChangelogEntry, FlatChangelogEntry, Model, formatContextWindow } from "@/lib/data";
import { defaultLocale, Locale } from "@/lib/i18n";

const capabilityLabels: Record<Locale, Record<string, string>> = {
  en: {},
  zh: {
    audio: "音频",
    classification: "分类",
    code: "代码",
    embeddings: "向量嵌入",
    "extended-thinking": "扩展思考",
    "fill-in-middle": "代码补全",
    "formal-methods": "形式化方法",
    "function-calling": "函数调用",
    "json-mode": "JSON 模式",
    multilingual: "多语言",
    personalization: "个性化",
    reasoning: "推理",
    realtime: "实时交互",
    retrieval: "检索",
    security: "安全",
    speech: "语音",
    text: "文本",
    "text-to-speech": "文本转语音",
    thinking: "思考",
    "tool-use": "工具调用",
    video: "视频",
    vision: "视觉",
    "web-search": "网页搜索",
  },
  ru: {
    audio: "аудио",
    classification: "классификация",
    code: "код",
    embeddings: "эмбеддинги",
    "extended-thinking": "расширенное рассуждение",
    "fill-in-middle": "дополнение кода",
    "formal-methods": "формальные методы",
    "function-calling": "вызов функций",
    "json-mode": "JSON-режим",
    multilingual: "многоязычность",
    personalization: "персонализация",
    reasoning: "рассуждение",
    realtime: "реальное время",
    retrieval: "поиск",
    security: "безопасность",
    speech: "речь",
    text: "текст",
    "text-to-speech": "синтез речи",
    thinking: "мышление",
    "tool-use": "использование инструментов",
    video: "видео",
    vision: "зрение",
    "web-search": "веб-поиск",
  },
  ja: {
    audio: "音声",
    classification: "分類",
    code: "コード",
    embeddings: "埋め込み",
    "extended-thinking": "拡張思考",
    "fill-in-middle": "コード補完",
    "formal-methods": "形式手法",
    "function-calling": "関数呼び出し",
    "json-mode": "JSON モード",
    multilingual: "多言語",
    personalization: "パーソナライズ",
    reasoning: "推論",
    realtime: "リアルタイム",
    retrieval: "検索",
    security: "セキュリティ",
    speech: "音声",
    text: "テキスト",
    "text-to-speech": "テキスト読み上げ",
    thinking: "思考",
    "tool-use": "ツール利用",
    video: "動画",
    vision: "画像理解",
    "web-search": "ウェブ検索",
  },
};

export function localizeCapability(capability: string, locale: Locale = defaultLocale): string {
  if (locale === defaultLocale) return capability;
  return capabilityLabels[locale][capability] || capability;
}

export function getLocalizedModelDescription(
  model: Model,
  providerName: string,
  locale: Locale = defaultLocale
): string {
  if (locale === defaultLocale) return model.description;

  const context = formatContextWindow(model.contextWindow);
  const capabilities = model.capabilities
    .slice(0, 5)
    .map((capability) => localizeCapability(capability, locale))
    .join(locale === "ru" ? ", " : "、");

  switch (locale) {
    case "zh":
      return `${model.name} 是 ${providerName} 的 AI 模型，支持${capabilities}，上下文窗口为 ${context}。适合需要稳定模型能力、价格信息和版本追踪的场景。`;
    case "ru":
      return `${model.name} — AI-модель ${providerName} с контекстом ${context}. Поддерживает: ${capabilities}. Подходит для задач, где важны возможности модели, цена и история версий.`;
    case "ja":
      return `${model.name} は ${providerName} の AI モデルです。${context} のコンテキスト長に対応し、${capabilities} を利用できます。モデル機能、価格、更新履歴を確認する用途に適しています。`;
    default:
      return model.description;
  }
}

export function localizeModelForDisplay(
  model: Model,
  providerName: string,
  locale: Locale = defaultLocale
): Model {
  if (locale === defaultLocale) return model;
  return {
    ...model,
    description: getLocalizedModelDescription(model, providerName, locale),
    capabilities: model.capabilities.map((capability) => localizeCapability(capability, locale)),
    changelog: model.changelog.map((entry) => ({
      ...entry,
      description: localizeChangelogDescription(entry, model.name, locale),
    })),
  };
}

export function localizeFlatChangelogEntries(
  entries: FlatChangelogEntry[],
  locale: Locale = defaultLocale
): FlatChangelogEntry[] {
  if (locale === defaultLocale) return entries;
  return entries.map((entry) => ({
    ...entry,
    description: localizeChangelogDescription(entry, entry.modelName, locale),
  }));
}

export function localizeChangelogDescription(
  entry: Pick<ChangelogEntry, "type" | "description">,
  modelName: string,
  locale: Locale = defaultLocale
): string {
  if (locale === defaultLocale) return entry.description;

  const pricing = parsePricing(entry.description);
  const date = parseDate(entry.description);

  if (pricing) {
    switch (locale) {
      case "zh":
        return `${modelName} 的 API 价格更新为输入 ${pricing.input}/100万 tokens、输出 ${pricing.output}/100万 tokens。`;
      case "ru":
        return `Цена API для ${modelName}: ввод ${pricing.input} за 1 млн tokens, вывод ${pricing.output} за 1 млн tokens.`;
      case "ja":
        return `${modelName} の API 価格は入力 ${pricing.input}/100万 tokens、出力 ${pricing.output}/100万 tokens に更新されました。`;
    }
  }

  switch (entry.type) {
    case "release":
      switch (locale) {
        case "zh":
          return `${modelName} 发布，模型信息、能力和版本记录已加入追踪。`;
        case "ru":
          return `${modelName} выпущена; сведения о модели, возможностях и версии добавлены в журнал.`;
        case "ja":
          return `${modelName} がリリースされ、モデル情報、機能、バージョン履歴の追跡に追加されました。`;
      }
      break;
    case "update":
      switch (locale) {
        case "zh":
          return `${modelName} 获得更新，模型能力、可用性或版本信息已同步。`;
        case "ru":
          return `${modelName} обновлена; сведения о возможностях, доступности или версии синхронизированы.`;
        case "ja":
          return `${modelName} が更新され、機能、提供状況、またはバージョン情報を反映しました。`;
      }
      break;
    case "pricing":
      switch (locale) {
        case "zh":
          return `${modelName} 的价格信息已更新。`;
        case "ru":
          return `Информация о ценах для ${modelName} обновлена.`;
        case "ja":
          return `${modelName} の価格情報が更新されました。`;
      }
      break;
    case "deprecation":
      switch (locale) {
        case "zh":
          return date
            ? `${modelName} 的弃用计划已更新，相关日期为 ${date}。`
            : `${modelName} 的弃用或迁移信息已更新。`;
        case "ru":
          return date
            ? `План устаревания ${modelName} обновлен; связанная дата: ${date}.`
            : `Информация об устаревании или миграции ${modelName} обновлена.`;
        case "ja":
          return date
            ? `${modelName} の非推奨予定が更新されました。関連日: ${date}。`
            : `${modelName} の非推奨または移行情報が更新されました。`;
      }
      break;
  }

  return entry.description;
}

function parsePricing(text: string): { input: string; output: string } | null {
  const matches = text.match(/\$\d+(?:\.\d+)?/g);
  if (!matches || matches.length < 2) return null;
  return { input: matches[0], output: matches[1] };
}

function parseDate(text: string): string | null {
  return text.match(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/)?.[0] || null;
}
