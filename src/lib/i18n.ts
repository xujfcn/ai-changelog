import { korean, portuguese } from "./extra-locales";

export const locales = ["en", "zh", "ru", "ja", "ko", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ru: "Русский",
  ja: "日本語",
  ko: "한국어",
  pt: "Português",
};

export type Dictionary = {
  common: {
    siteShortName: string;
    home: string;
    changelog: string;
    providers: string;
    resources: string;
    rssFeed: string;
    sitemap: string;
    apiAccess: string;
    crazyrouterApi: string;
    officialWebsite: string;
    allRightsReserved: string;
    poweredBy: string;
    oneApiKey: string;
    language: string;
    context: string;
    input: string;
    output: string;
    contextWindow: string;
    inputPrice: string;
    outputPrice: string;
    released: string;
    capabilities: string;
    active: string;
    deprecated: string;
    preview: string;
    newRelease: string;
    update: string;
    pricingChange: string;
    deprecation: string;
    allTypes: string;
    newReleases: string;
    updates: string;
    pricingChanges: string;
    deprecations: string;
    allProviders: string;
    noResults: string;
    adjustFilters: string;
    searchPlaceholder: string;
    viewAll: string;
    getStarted: string;
    getApiAccess: string;
  };
  home: {
    title: string;
    description: string;
    heroTitle: string;
    heroSubtitle: string;
    models: string;
    activeModels: string;
    updatesTracked: string;
    recentChanges: string;
    ctaTitle: string;
    ctaBody: string;
    faq: {
      whatQuestion: string;
      whatAnswer: string;
      providersQuestion: string;
      providersAnswer: string;
      frequencyQuestion: string;
      frequencyAnswer: string;
      apiQuestion: string;
      apiAnswer: string;
    };
  };
  changelog: {
    title: string;
    description: string;
    heading: string;
    count: (count: number) => string;
  };
  provider: {
    titleSuffix: string;
    description: (provider: string, models: string) => string;
    activeModels: string;
    deprecatedModels: string;
    changeHistory: string;
    stats: (active: number, deprecated: number) => string;
  };
  model: {
    titleSuffix: (provider: string) => string;
    description: (
      model: string,
      context: string,
      status: string,
      input: string,
      output: string,
      unit: string
    ) => string;
    tryViaApi: (model: string) => string;
    apiBody: (model: string) => string;
    versionHistory: string;
    deprecatedNotice: (date: string) => string;
    migrateNotice: (provider: string) => string;
  };
  footer: {
    tagline: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ko: korean,
  pt: portuguese,
  en: {
    common: {
      siteShortName: "AI Changelog",
      home: "Home",
      changelog: "Changelog",
      providers: "Providers",
      resources: "Resources",
      rssFeed: "RSS Feed",
      sitemap: "Sitemap",
      apiAccess: "API Access",
      crazyrouterApi: "Crazyrouter API",
      officialWebsite: "Official website",
      allRightsReserved: "All rights reserved.",
      poweredBy: "Powered by",
      oneApiKey: "One API key for all these models",
      language: "Language",
      context: "Context",
      input: "Input",
      output: "Output",
      contextWindow: "Context Window",
      inputPrice: "Input Price",
      outputPrice: "Output Price",
      released: "Released",
      capabilities: "Capabilities",
      active: "Active",
      deprecated: "Deprecated",
      preview: "Preview",
      newRelease: "New Release",
      update: "Update",
      pricingChange: "Pricing Change",
      deprecation: "Deprecation",
      allTypes: "All Types",
      newReleases: "New Releases",
      updates: "Updates",
      pricingChanges: "Pricing Changes",
      deprecations: "Deprecations",
      allProviders: "All Providers",
      noResults: "No results found",
      adjustFilters: "Try adjusting your filters or search query",
      searchPlaceholder: "Search models, updates...",
      viewAll: "View all",
      getStarted: "Get Started with Crazyrouter",
      getApiAccess: "Get API Access",
    },
    home: {
      title: "AI Model Changelog - Track every AI model update in one place",
      description:
        "Track version history, updates, deprecations, and pricing changes for all major AI models including OpenAI GPT, Anthropic Claude, Google Gemini, DeepSeek, Meta Llama, and Mistral.",
      heroTitle: "AI Model Changelog",
      heroSubtitle:
        "Track every AI model update in one place: releases, pricing changes, deprecations, and more.",
      models: "Models",
      activeModels: "Active",
      updatesTracked: "Updates Tracked",
      recentChanges: "Recent Changes",
      ctaTitle: "Access all these models with one API key",
      ctaBody:
        "Crazyrouter gives you a single API endpoint to access OpenAI, Anthropic, Google, DeepSeek, Meta, Mistral, and more.",
      faq: {
        whatQuestion: "What is AI Model Changelog?",
        whatAnswer:
          "AI Model Changelog tracks version history, updates, deprecations, and pricing changes for major AI models.",
        providersQuestion: "Which AI model providers are tracked?",
        providersAnswer:
          "We track OpenAI, Anthropic, Google, DeepSeek, Meta, and Mistral.",
        frequencyQuestion: "How often is the AI Model Changelog updated?",
        frequencyAnswer:
          "The changelog is updated as soon as providers announce new models, pricing changes, updates, or deprecations.",
        apiQuestion: "Can I access these AI models through a single API?",
        apiAnswer:
          "Yes. Crazyrouter provides a unified API that lets you access these models with a single API key.",
      },
    },
    changelog: {
      title: "Full Changelog - All AI Model Updates",
      description:
        "Complete changelog of all AI model updates, releases, pricing changes, and deprecations.",
      heading: "Full Changelog",
      count: (count) => `${count} updates tracked across all providers`,
    },
    provider: {
      titleSuffix: "Model Changelog",
      description: (provider, models) =>
        `Track all ${provider} AI model updates, pricing changes, and version history. Includes ${models}.`,
      activeModels: "Active Models",
      deprecatedModels: "Deprecated Models",
      changeHistory: "Change History",
      stats: (active, deprecated) => `${active} active models · ${deprecated} deprecated`,
    },
    model: {
      titleSuffix: (provider) => `${provider} Model Version History`,
      description: (model, context, status, input, output, unit) =>
        `${model} version history, pricing, and updates. Context window: ${context}. Status: ${status}. Input: ${input}/${unit} tokens. Output: ${output}/${unit} tokens.`,
      tryViaApi: (model) => `Try ${model} via Crazyrouter API`,
      apiBody: (model) =>
        `Access ${model} and 100+ other AI models with a single API key.`,
      versionHistory: "Version History",
      deprecatedNotice: (date) => `This model was deprecated on ${date}`,
      migrateNotice: (provider) => `Consider migrating to a newer model from ${provider}.`,
    },
    footer: {
      tagline: "Track every AI model update in one place.",
    },
  },
  zh: {
    common: {
      siteShortName: "AI 更新日志",
      home: "首页",
      changelog: "更新日志",
      providers: "模型厂商",
      resources: "资源",
      rssFeed: "RSS 订阅",
      sitemap: "站点地图",
      apiAccess: "API 接入",
      crazyrouterApi: "Crazyrouter API",
      officialWebsite: "官方网站",
      allRightsReserved: "保留所有权利。",
      poweredBy: "技术支持",
      oneApiKey: "一个 API Key 接入所有这些模型",
      language: "语言",
      context: "上下文",
      input: "输入",
      output: "输出",
      contextWindow: "上下文窗口",
      inputPrice: "输入价格",
      outputPrice: "输出价格",
      released: "发布日期",
      capabilities: "能力",
      active: "可用",
      deprecated: "已弃用",
      preview: "预览",
      newRelease: "新发布",
      update: "更新",
      pricingChange: "价格变更",
      deprecation: "弃用",
      allTypes: "全部类型",
      newReleases: "新发布",
      updates: "更新",
      pricingChanges: "价格变更",
      deprecations: "弃用",
      allProviders: "全部厂商",
      noResults: "未找到结果",
      adjustFilters: "请调整筛选条件或搜索关键词",
      searchPlaceholder: "搜索模型或更新...",
      viewAll: "查看全部",
      getStarted: "开始使用 Crazyrouter",
      getApiAccess: "获取 API 接入",
    },
    home: {
      title: "AI 模型更新日志 - 集中追踪所有 AI 模型更新",
      description:
        "追踪 OpenAI GPT、Anthropic Claude、Google Gemini、DeepSeek、Meta Llama、Mistral 等主流 AI 模型的版本历史、更新、弃用和价格变化。",
      heroTitle: "AI 模型更新日志",
      heroSubtitle: "集中追踪 AI 模型发布、价格变化、弃用和版本更新。",
      models: "模型",
      activeModels: "可用",
      updatesTracked: "已追踪更新",
      recentChanges: "最近更新",
      ctaTitle: "一个 API Key 接入所有这些模型",
      ctaBody:
        "Crazyrouter 提供统一 API 端点，可接入 OpenAI、Anthropic、Google、DeepSeek、Meta、Mistral 等模型。",
      faq: {
        whatQuestion: "AI 模型更新日志是什么？",
        whatAnswer: "它用于追踪主流 AI 模型的版本历史、更新、弃用和价格变化。",
        providersQuestion: "目前追踪哪些 AI 模型厂商？",
        providersAnswer: "目前追踪 OpenAI、Anthropic、Google、DeepSeek、Meta 和 Mistral。",
        frequencyQuestion: "AI 模型更新日志多久更新一次？",
        frequencyAnswer: "厂商发布新模型、价格变化、更新或弃用信息后，我们会尽快更新。",
        apiQuestion: "可以通过单一 API 接入这些模型吗？",
        apiAnswer: "可以。Crazyrouter 提供统一 API，可用一个 API Key 接入这些模型。",
      },
    },
    changelog: {
      title: "完整更新日志 - 所有 AI 模型更新",
      description: "OpenAI、Anthropic、Google、DeepSeek、Meta、Mistral 等模型的完整更新历史。",
      heading: "完整更新日志",
      count: (count) => `已追踪 ${count} 条跨厂商更新`,
    },
    provider: {
      titleSuffix: "模型更新日志",
      description: (provider, models) =>
        `追踪 ${provider} AI 模型的更新、价格变化和版本历史。包含 ${models}。`,
      activeModels: "可用模型",
      deprecatedModels: "已弃用模型",
      changeHistory: "变更历史",
      stats: (active, deprecated) => `${active} 个可用模型 · ${deprecated} 个已弃用`,
    },
    model: {
      titleSuffix: (provider) => `${provider} 模型版本历史`,
      description: (model, context, status, input, output, unit) =>
        `${model} 的版本历史、价格和更新。上下文窗口：${context}。状态：${status}。输入：${input}/${unit} tokens。输出：${output}/${unit} tokens。`,
      tryViaApi: (model) => `通过 Crazyrouter API 试用 ${model}`,
      apiBody: (model) => `使用一个 API Key 接入 ${model} 和 100+ 其他 AI 模型。`,
      versionHistory: "版本历史",
      deprecatedNotice: (date) => `该模型已于 ${date} 弃用`,
      migrateNotice: (provider) => `建议迁移到 ${provider} 的更新模型。`,
    },
    footer: {
      tagline: "集中追踪所有 AI 模型更新。",
    },
  },
  ru: {
    common: {
      siteShortName: "AI Changelog",
      home: "Главная",
      changelog: "Журнал",
      providers: "Провайдеры",
      resources: "Ресурсы",
      rssFeed: "RSS",
      sitemap: "Карта сайта",
      apiAccess: "Доступ к API",
      crazyrouterApi: "Crazyrouter API",
      officialWebsite: "Официальный сайт",
      allRightsReserved: "Все права защищены.",
      poweredBy: "Работает на",
      oneApiKey: "Один API-ключ для всех этих моделей",
      language: "Язык",
      context: "Контекст",
      input: "Ввод",
      output: "Вывод",
      contextWindow: "Окно контекста",
      inputPrice: "Цена ввода",
      outputPrice: "Цена вывода",
      released: "Дата релиза",
      capabilities: "Возможности",
      active: "Активна",
      deprecated: "Устарела",
      preview: "Preview",
      newRelease: "Новый релиз",
      update: "Обновление",
      pricingChange: "Изменение цены",
      deprecation: "Устаревание",
      allTypes: "Все типы",
      newReleases: "Новые релизы",
      updates: "Обновления",
      pricingChanges: "Изменения цен",
      deprecations: "Устаревшие",
      allProviders: "Все провайдеры",
      noResults: "Ничего не найдено",
      adjustFilters: "Измените фильтры или поисковый запрос",
      searchPlaceholder: "Поиск моделей и обновлений...",
      viewAll: "Смотреть все",
      getStarted: "Начать с Crazyrouter",
      getApiAccess: "Получить доступ к API",
    },
    home: {
      title: "AI Model Changelog - все обновления AI-моделей в одном месте",
      description:
        "Отслеживайте историю версий, обновления, устаревание и цены основных AI-моделей OpenAI GPT, Anthropic Claude, Google Gemini, DeepSeek, Meta Llama и Mistral.",
      heroTitle: "AI Model Changelog",
      heroSubtitle:
        "Все обновления AI-моделей в одном месте: релизы, цены, устаревание и история версий.",
      models: "Модели",
      activeModels: "Активные",
      updatesTracked: "Обновлений",
      recentChanges: "Последние изменения",
      ctaTitle: "Один API-ключ для всех этих моделей",
      ctaBody:
        "Crazyrouter дает единый API endpoint для OpenAI, Anthropic, Google, DeepSeek, Meta, Mistral и других моделей.",
      faq: {
        whatQuestion: "Что такое AI Model Changelog?",
        whatAnswer:
          "AI Model Changelog отслеживает историю версий, обновления, устаревание и цены основных AI-моделей.",
        providersQuestion: "Какие провайдеры AI-моделей отслеживаются?",
        providersAnswer: "Мы отслеживаем OpenAI, Anthropic, Google, DeepSeek, Meta и Mistral.",
        frequencyQuestion: "Как часто обновляется журнал?",
        frequencyAnswer:
          "Мы обновляем журнал после официальных анонсов новых моделей, цен, обновлений или устаревания.",
        apiQuestion: "Можно ли получить доступ к этим моделям через один API?",
        apiAnswer:
          "Да. Crazyrouter предоставляет единый API для доступа к этим моделям с одним API-ключом.",
      },
    },
    changelog: {
      title: "Полный журнал - все обновления AI-моделей",
      description: "Полная история релизов, обновлений, цен и устаревания AI-моделей.",
      heading: "Полный журнал",
      count: (count) => `${count} обновлений по всем провайдерам`,
    },
    provider: {
      titleSuffix: "журнал моделей",
      description: (provider, models) =>
        `Отслеживайте обновления, цены и историю версий моделей ${provider}. Включает ${models}.`,
      activeModels: "Активные модели",
      deprecatedModels: "Устаревшие модели",
      changeHistory: "История изменений",
      stats: (active, deprecated) => `${active} активных моделей · ${deprecated} устаревших`,
    },
    model: {
      titleSuffix: (provider) => `история версий модели ${provider}`,
      description: (model, context, status, input, output, unit) =>
        `${model}: история версий, цены и обновления. Окно контекста: ${context}. Статус: ${status}. Ввод: ${input}/${unit} tokens. Вывод: ${output}/${unit} tokens.`,
      tryViaApi: (model) => `Попробовать ${model} через Crazyrouter API`,
      apiBody: (model) => `Доступ к ${model} и 100+ другим AI-моделям с одним API-ключом.`,
      versionHistory: "История версий",
      deprecatedNotice: (date) => `Эта модель устарела ${date}`,
      migrateNotice: (provider) => `Рекомендуется перейти на более новую модель ${provider}.`,
    },
    footer: {
      tagline: "Все обновления AI-моделей в одном месте.",
    },
  },
  ja: {
    common: {
      siteShortName: "AI Changelog",
      home: "ホーム",
      changelog: "更新履歴",
      providers: "プロバイダー",
      resources: "リソース",
      rssFeed: "RSS フィード",
      sitemap: "サイトマップ",
      apiAccess: "API アクセス",
      crazyrouterApi: "Crazyrouter API",
      officialWebsite: "公式サイト",
      allRightsReserved: "All rights reserved.",
      poweredBy: "Powered by",
      oneApiKey: "1つの API キーでこれらのモデルにアクセス",
      language: "言語",
      context: "コンテキスト",
      input: "入力",
      output: "出力",
      contextWindow: "コンテキスト長",
      inputPrice: "入力価格",
      outputPrice: "出力価格",
      released: "リリース日",
      capabilities: "機能",
      active: "有効",
      deprecated: "非推奨",
      preview: "プレビュー",
      newRelease: "新リリース",
      update: "更新",
      pricingChange: "価格変更",
      deprecation: "非推奨",
      allTypes: "すべての種類",
      newReleases: "新リリース",
      updates: "更新",
      pricingChanges: "価格変更",
      deprecations: "非推奨",
      allProviders: "すべてのプロバイダー",
      noResults: "結果が見つかりません",
      adjustFilters: "フィルターまたは検索条件を調整してください",
      searchPlaceholder: "モデルや更新を検索...",
      viewAll: "すべて表示",
      getStarted: "Crazyrouter を始める",
      getApiAccess: "API アクセスを取得",
    },
    home: {
      title: "AI Model Changelog - AI モデル更新を一か所で追跡",
      description:
        "OpenAI GPT、Anthropic Claude、Google Gemini、DeepSeek、Meta Llama、Mistral など主要 AI モデルのバージョン履歴、更新、非推奨、価格変更を追跡します。",
      heroTitle: "AI Model Changelog",
      heroSubtitle: "AI モデルのリリース、価格変更、非推奨、更新履歴を一か所で追跡します。",
      models: "モデル",
      activeModels: "有効",
      updatesTracked: "追跡済み更新",
      recentChanges: "最近の更新",
      ctaTitle: "1つの API キーでこれらのモデルにアクセス",
      ctaBody:
        "Crazyrouter は OpenAI、Anthropic、Google、DeepSeek、Meta、Mistral などにアクセスできる統一 API エンドポイントを提供します。",
      faq: {
        whatQuestion: "AI Model Changelog とは？",
        whatAnswer:
          "主要 AI モデルのバージョン履歴、更新、非推奨、価格変更を追跡するサイトです。",
        providersQuestion: "どの AI モデルプロバイダーを追跡していますか？",
        providersAnswer: "OpenAI、Anthropic、Google、DeepSeek、Meta、Mistral を追跡しています。",
        frequencyQuestion: "どのくらいの頻度で更新されますか？",
        frequencyAnswer:
          "新モデル、価格変更、更新、非推奨が公式発表された後、できるだけ早く反映します。",
        apiQuestion: "これらのモデルを単一 API で利用できますか？",
        apiAnswer:
          "はい。Crazyrouter は 1つの API キーでこれらのモデルを利用できる統一 API を提供します。",
      },
    },
    changelog: {
      title: "完全な更新履歴 - すべての AI モデル更新",
      description: "AI モデルのリリース、更新、価格変更、非推奨の完全な履歴です。",
      heading: "完全な更新履歴",
      count: (count) => `全プロバイダーで ${count} 件の更新を追跡`,
    },
    provider: {
      titleSuffix: "モデル更新履歴",
      description: (provider, models) =>
        `${provider} の AI モデル更新、価格変更、バージョン履歴を追跡します。対象: ${models}。`,
      activeModels: "有効なモデル",
      deprecatedModels: "非推奨モデル",
      changeHistory: "変更履歴",
      stats: (active, deprecated) => `${active} 有効モデル · ${deprecated} 非推奨`,
    },
    model: {
      titleSuffix: (provider) => `${provider} モデルのバージョン履歴`,
      description: (model, context, status, input, output, unit) =>
        `${model} のバージョン履歴、価格、更新。コンテキスト長: ${context}。ステータス: ${status}。入力: ${input}/${unit} tokens。出力: ${output}/${unit} tokens。`,
      tryViaApi: (model) => `Crazyrouter API で ${model} を試す`,
      apiBody: (model) => `${model} と 100+ の AI モデルに 1つの API キーでアクセスできます。`,
      versionHistory: "バージョン履歴",
      deprecatedNotice: (date) => `このモデルは ${date} に非推奨になりました`,
      migrateNotice: (provider) => `${provider} の新しいモデルへの移行を検討してください。`,
    },
    footer: {
      tagline: "AI モデル更新を一か所で追跡します。",
    },
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}

export function getLocalizedPath(locale: Locale, path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return locale === defaultLocale ? normalizedPath : `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function getLanguageAlternates(path = "/"): Record<string, string> {
  return Object.fromEntries(
    [...locales.map((locale) => [getHtmlLang(locale), getLocalizedPath(locale, path)]), ["x-default", getLocalizedPath(defaultLocale, path)]]
  );
}

export function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0])) {
    return `/${parts.slice(1).join("/")}`;
  }
  return pathname || "/";
}

export function getHtmlLang(locale: Locale): string {
  switch (locale) {
    case "zh":
      return "zh-CN";
    case "ru":
      return "ru";
    case "ja":
      return "ja";
    case "ko":
      return "ko";
    case "pt":
      return "pt-BR";
    default:
      return "en";
  }
}

export function getOgLocale(locale: Locale): string {
  switch (locale) {
    case "zh":
      return "zh_CN";
    case "ru":
      return "ru_RU";
    case "ja":
      return "ja_JP";
    case "ko":
      return "ko_KR";
    case "pt":
      return "pt_BR";
    default:
      return "en_US";
  }
}
