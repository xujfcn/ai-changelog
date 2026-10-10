import type { Dictionary } from "./i18n";

export const korean: Dictionary = {
  common: {
    siteShortName: "AI 변경 기록", home: "홈", changelog: "변경 기록", providers: "제공업체",
    resources: "자료", rssFeed: "RSS 피드", sitemap: "사이트맵", apiAccess: "API 연결",
    crazyrouterApi: "Crazyrouter API", officialWebsite: "공식 웹사이트", allRightsReserved: "모든 권리 보유.",
    poweredBy: "제공", oneApiKey: "하나의 API 키로 지원 모델에 연결", language: "언어",
    context: "컨텍스트", input: "입력", output: "출력", contextWindow: "컨텍스트 길이",
    inputPrice: "입력 요금", outputPrice: "출력 요금", released: "출시일", capabilities: "기능",
    active: "활성", deprecated: "지원 중단", preview: "미리보기", newRelease: "새 출시",
    update: "업데이트", pricingChange: "요금 변경", deprecation: "지원 중단", allTypes: "모든 유형",
    newReleases: "새 출시", updates: "업데이트", pricingChanges: "요금 변경", deprecations: "지원 중단",
    allProviders: "모든 제공업체", noResults: "결과가 없습니다", adjustFilters: "필터 또는 검색어를 변경하세요",
    searchPlaceholder: "모델, 업데이트 검색...", viewAll: "모두 보기", getStarted: "Crazyrouter 시작하기", getApiAccess: "API 연결 확인",
  },
  home: {
    title: "AI 모델 변경 기록 - 모델 업데이트 모아보기",
    description: "OpenAI, Anthropic, Google, DeepSeek, Meta, Mistral 모델의 버전, 업데이트, 지원 중단 및 요금 변경을 확인하세요.",
    heroTitle: "AI 모델 변경 기록", heroSubtitle: "모델 출시, 요금 변경, 지원 중단 및 업데이트를 한곳에서 확인하세요.",
    models: "모델", activeModels: "활성", updatesTracked: "업데이트", recentChanges: "최근 변경",
    ctaTitle: "하나의 API 키로 지원 모델에 연결",
    ctaBody: "Crazyrouter는 여러 제공업체의 모델을 위한 통합 API를 제공합니다. 현재 모델 목록에서 이용 가능 여부와 요금을 확인하세요.",
    faq: {
      whatQuestion: "AI 모델 변경 기록은 무엇인가요?", whatAnswer: "주요 AI 모델의 버전, 업데이트, 지원 중단 및 요금 변경을 기록합니다.",
      providersQuestion: "어떤 제공업체를 추적하나요?", providersAnswer: "OpenAI, Anthropic, Google, DeepSeek, Meta, Mistral을 추적합니다.",
      frequencyQuestion: "얼마나 자주 업데이트하나요?", frequencyAnswer: "제공업체의 발표와 검증된 변경 사항을 반영합니다.",
      apiQuestion: "하나의 API로 모델을 사용할 수 있나요?", apiAnswer: "Crazyrouter는 지원 모델을 위한 통합 API를 제공합니다. 모든 기록된 모델이 제공되는 것은 아닙니다.",
    },
  },
  changelog: { title: "전체 변경 기록 - AI 모델 업데이트", description: "모델 출시, 업데이트, 요금 변경 및 지원 중단 기록.", heading: "전체 변경 기록", count: count => `${count}개 업데이트 기록` },
  provider: {
    titleSuffix: "모델 변경 기록", description: (provider, models) => `${provider} 모델의 업데이트, 요금 변경 및 버전 기록. 포함 모델: ${models}.`,
    activeModels: "활성 모델", deprecatedModels: "지원 중단 모델", changeHistory: "변경 이력", stats: (active, deprecated) => `활성 ${active}개 · 지원 중단 ${deprecated}개`,
  },
  model: {
    titleSuffix: provider => `${provider} 모델 버전 기록`,
    description: (model, context, status, input, output, unit) => `${model} 버전 기록 및 요금. 컨텍스트: ${context}. 상태: ${status}. 입력: ${input}/${unit} 토큰. 출력: ${output}/${unit} 토큰.`,
    tryViaApi: model => `${model} API 연결 확인`, apiBody: model => `현재 Crazyrouter 목록에서 ${model}의 이용 가능 여부와 요금을 확인하세요.`,
    versionHistory: "버전 기록", deprecatedNotice: date => `이 모델은 ${date}에 지원이 중단되었습니다`, migrateNotice: provider => `${provider}의 최신 모델로 이전을 검토하세요.`,
  },
  footer: { tagline: "AI 모델 업데이트를 한곳에서 확인하세요." },
};

export const portuguese: Dictionary = {
  common: {
    siteShortName: "AI Changelog", home: "Início", changelog: "Histórico", providers: "Provedores", resources: "Recursos",
    rssFeed: "Feed RSS", sitemap: "Mapa do site", apiAccess: "Acesso à API", crazyrouterApi: "API Crazyrouter",
    officialWebsite: "Site oficial", allRightsReserved: "Todos os direitos reservados.", poweredBy: "Disponibilizado por",
    oneApiKey: "Uma chave de API para os modelos disponíveis", language: "Idioma", context: "Contexto", input: "Entrada",
    output: "Saída", contextWindow: "Janela de contexto", inputPrice: "Preço de entrada", outputPrice: "Preço de saída",
    released: "Lançamento", capabilities: "Recursos", active: "Ativo", deprecated: "Descontinuado", preview: "Prévia",
    newRelease: "Lançamento", update: "Atualização", pricingChange: "Alteração de preço", deprecation: "Descontinuação",
    allTypes: "Todos os tipos", newReleases: "Lançamentos", updates: "Atualizações", pricingChanges: "Preços",
    deprecations: "Descontinuações", allProviders: "Todos os provedores", noResults: "Nenhum resultado",
    adjustFilters: "Altere os filtros ou a busca", searchPlaceholder: "Buscar modelos e atualizações...", viewAll: "Ver tudo",
    getStarted: "Começar com Crazyrouter", getApiAccess: "Consultar acesso à API",
  },
  home: {
    title: "Histórico de modelos de IA - Acompanhe as atualizações",
    description: "Acompanhe versões, atualizações, descontinuações e preços dos modelos OpenAI, Anthropic, Google, DeepSeek, Meta e Mistral.",
    heroTitle: "Histórico de modelos de IA", heroSubtitle: "Lançamentos, preços, descontinuações e atualizações em um só lugar.",
    models: "Modelos", activeModels: "Ativos", updatesTracked: "Atualizações", recentChanges: "Alterações recentes",
    ctaTitle: "Uma chave de API para os modelos disponíveis",
    ctaBody: "Crazyrouter oferece uma API unificada para vários provedores. Consulte a disponibilidade e os preços no catálogo atual.",
    faq: {
      whatQuestion: "O que é o AI Model Changelog?", whatAnswer: "Um histórico das versões, atualizações, descontinuações e preços dos principais modelos de IA.",
      providersQuestion: "Quais provedores são acompanhados?", providersAnswer: "OpenAI, Anthropic, Google, DeepSeek, Meta e Mistral.",
      frequencyQuestion: "Quando o histórico é atualizado?", frequencyAnswer: "As atualizações refletem anúncios dos provedores e alterações verificadas.",
      apiQuestion: "Posso usar uma única API?", apiAnswer: "Crazyrouter oferece uma API unificada para os modelos disponíveis. Nem todo modelo deste histórico está disponível no serviço.",
    },
  },
  changelog: { title: "Histórico completo - Atualizações de IA", description: "Lançamentos, atualizações, preços e descontinuações dos modelos de IA.", heading: "Histórico completo", count: count => `${count} atualizações registradas` },
  provider: {
    titleSuffix: "Histórico de modelos", description: (provider, models) => `Atualizações, preços e versões dos modelos ${provider}. Inclui ${models}.`,
    activeModels: "Modelos ativos", deprecatedModels: "Modelos descontinuados", changeHistory: "Histórico de alterações", stats: (active, deprecated) => `${active} ativos · ${deprecated} descontinuados`,
  },
  model: {
    titleSuffix: provider => `Histórico de versões dos modelos ${provider}`,
    description: (model, context, status, input, output, unit) => `${model}: versões e preços. Contexto: ${context}. Status: ${status}. Entrada: ${input}/${unit} tokens. Saída: ${output}/${unit} tokens.`,
    tryViaApi: model => `Consultar acesso a ${model} pela API`, apiBody: model => `Confira a disponibilidade e os preços de ${model} no catálogo atual do Crazyrouter.`,
    versionHistory: "Histórico de versões", deprecatedNotice: date => `Este modelo foi descontinuado em ${date}`, migrateNotice: provider => `Considere migrar para um modelo mais recente de ${provider}.`,
  },
  footer: { tagline: "Acompanhe as atualizações de IA em um só lugar." },
};
