(() => {
  const catalog = window.AMAZONIA_CATALOG || [];

  const detectLocale = () => {
    const htmlLang = (document.documentElement?.lang || "").toLowerCase();
    if (htmlLang.startsWith("en") || window.location?.pathname?.includes("/en/")) return "en";
    if (htmlLang.startsWith("es") || window.location?.pathname?.includes("/es/")) return "es";
    return "pt-BR";
  };

  const locale = detectLocale();
  const i18n = (window.AMAZONIA_CATALOG_I18N && window.AMAZONIA_CATALOG_I18N[locale]) || {
    descriptions: {},
    spatialResolution: {},
    temporalCoverage: {},
    licenses: {}
  };
  const spatialResolutionLabels = i18n.spatialResolution || {};
  const temporalCoverageLabels = i18n.temporalCoverage || {};
  const licenseLabels = i18n.licenses || {};

  // `key` matches record.category/coverage/access/kind exactly as stored in
  // data/catalog.js (the canonical English values required by
  // data/catalog.schema.json) — only `label`/`note` are shown to the user.
  const presentation = window.AMAZONIA_CATEGORY_PRESENTATION || {};
  const categories = Object.entries(presentation).map(([key, item]) => ({
    key,
    ...item,
    ...(item.locales[locale] || item.locales.en || {})
  }));
  const categoryLabels = Object.fromEntries(categories.map((c) => [c.key, c.label]));

  const LOCALE_CONFIG = {
    "pt-BR": {
      coverageLabels: {
        "Pan-Amazon": "Pan-Amazônia",
        "Brazil": "Brasil",
        "Peru": "Peru",
        "Colombia": "Colômbia",
        "Bolivia": "Bolívia",
        "Ecuador": "Equador",
        "Venezuela": "Venezuela",
        "Guyana": "Guiana",
        "Suriname": "Suriname",
        "French Guiana": "Guiana Francesa",
        "Global — subsettable": "Global — recortável"
      },
      accessLabels: {
        "Provider terms apply": "Sujeito aos termos do provedor",
        "Dataset-specific license": "Licença específica do conjunto de dados",
        "Publicly available": "Disponível publicamente"
      },
      compactAccessLabels: {
        "Provider terms apply": "Termos do provedor",
        "Dataset-specific license": "Licença do conjunto",
        "Publicly available": "Acesso público"
      },
      kindLabels: {
        "Dataset": "Conjunto de dados",
        "Data portal": "Portal de dados",
        "Download": "Download",
        "Explorer": "Explorador"
      },
      formatLabels: {
        "Dashboard": "Painel",
        "Graphs/plots": "Gráficos",
        "Interactive visualizations": "Visualizações interativas",
        "PDF reports": "Relatórios PDF",
        "R package": "Pacote R",
        "Web dashboard": "Painel web",
        "Web encyclopedia": "Enciclopédia web",
        "Web map": "Mapa web"
      },
      detailLabels: {
        timeframe: "Período",
        resolution: "Resolução",
        license: "Licença",
        coverage: "Cobertura",
        access: "Acesso",
        accessEvidence: "Ver evidência de acesso",
        review: "Revisão do link",
        methodology: "Documentação",
        sourcePage: "Página da fonte"
      },
      researchLabels: {
        heading: "Caminho orientado",
        topics: "Temas",
        filterTopic: "Filtrar por tema: ",
        clearPath: "Voltar ao diretório completo",
        addPath: "Adicionar estas fontes",
        pathAdded: "Fontes do caminho adicionadas à seleção.",
        pathAlreadyPresent: "As fontes deste caminho já estão na seleção.",
        pathPartiallyAdded: (count) => `${count} ${count === 1 ? "fonte adicionada" : "fontes adicionadas"}; o limite de 6 impediu as demais.`,
        questionPosition: (current, total) => `Caminho ${current} de ${total}.`
      },
      sourceSetLabels: {
        add: "Adicionar",
        added: "Na seleção",
        remove: "Remover",
        removed: (title) => `${title} removida da seleção.`,
        full: "Limite de 6 fontes atingido.",
        count: (sources, areas) => `${sources} ${sources === 1 ? "fonte" : "fontes"} · ${areas} ${areas === 1 ? "área principal" : "áreas principais"}`,
        responsible: "Cruzar fontes não comprova impacto, consentimento ou posse. Consulte os avisos de uso responsável e a documentação de cada fonte.",
        responsibleLabel: "Uso responsável",
        protocol: "Protocolo da fonte",
        communityAuthority: "Autoridade comunitária",
        formats: "Formatos",
        facts: "Dados da fonte",
        moreTopics: (count) => `${count} ${count === 1 ? "tema adicional" : "temas adicionais"}`,
        copySuccess: "Link copiado",
        copyFailure: "Não foi possível copiar",
        reviewed: "Link revisado em",
        emptyCountry: "Ainda não há fonte específica para este país. Tente Pan-Amazônia ou Global — recortável.",
        emptyDefault: "Nenhuma fonte corresponde a esses filtros. Tente uma busca mais ampla."
      },
      selectFallbacks: {
        topic: "Todos os temas",
        role: "Qualquer finalidade",
        mode: "Qualquer tipo",
        time: "Qualquer período"
      },
      sourceCountLabel: (value) => `${value} ${value === 1 ? "fonte" : "fontes"}`,
      moreFilterCountLabel: (activeCount) => activeCount ? `· ${activeCount} ${activeCount === 1 ? "ativo" : "ativos"}` : "",
      csvFilename: "amazoniadb-conjunto-de-fontes.csv",
      domainNavUnavailable: '<p class="empty-state">Os filtros por domínio estão temporariamente indisponíveis. Você ainda pode navegar pelo catálogo completo abaixo.</p>',
      resultCountPartial: (shown, total) => `Mostrando ${shown} de ${total} fontes`,
      resultCountTotal: (total) => `${total} ${total === 1 ? "fonte encontrada" : "fontes encontradas"}`,
      showMoreText: (count) => `Mostrar mais ${count} fontes`,
      openSourceText: "Abrir na fonte",
      openNewTabSr: "(abre em nova aba)",
      methodologySr: (hasMethodology) => `${hasMethodology ? "metodologia" : "página da fonte"}; abre em nova aba`,
      citeText: "Citar",
      citeCopied: "Copiado",
      citeFailed: "Não foi possível copiar",
      reportText: "Reportar problema",
      discoveryText: (title, catLabel, covLabel) => `Mostrando ${title} — uma fonte com link revisado em ${catLabel} · ${covLabel}.`,
      selectionCleared: "Seleção limpa.",
      copyLinkSuccess: "Link copiado",
      copyLinkFailure: "Não foi possível copiar",
      citationFormat: (record, accessedDate) => `"${record.title}." ${record.provider}. Link revisado pela AmazoniaDB em ${record.checked}. Acessado em ${accessedDate}. ${record.url}`,
      reportSubject: (title) => `Problema em uma fonte: ${title}`,
      reportBody: (id, url) => `Entrada: ${id}\nURL: ${url}\n\nTipo de problema (não inclua localizações nem dados sensíveis nesta mensagem):\n[ ] Link\n[ ] Contexto ou metadados\n[ ] Questão territorial ou de direitos\n[ ] Informação sensível\n[ ] Pedido de protocolo, correção ou remoção\n\nDescrição:\n`,
      schemaDescription: "Um diretório enxuto de conjuntos de dados socioambientais da Amazônia, indexados em suas fontes originais.",
      schemaLanguages: ["pt-BR", "en", "es-419"],
      schemaCatalogLanguage: "pt-BR",
      activeFiltersLabel: "Filtros ativos",
      clearAllFilters: "Limpar todos",
      removeFilterAria: (label) => `Remover filtro: ${label}`,
      facetNames: {
        category: "Área",
        coverage: "Cobertura",
        topic: "Tema",
        role: "Finalidade",
        access: "Acesso",
        mode: "Tipo",
        time: "Período",
        sort: "Ordem",
        search: "Busca"
      },
      sortLabels: {
        checked: "Revisão mais recente",
        title: "Título (A–Z)",
        provider: "Provedor (A–Z)"
      }
    },
    en: {
      coverageLabels: {
        "Pan-Amazon": "Pan-Amazon",
        "Brazil": "Brazil",
        "Peru": "Peru",
        "Colombia": "Colombia",
        "Bolivia": "Bolivia",
        "Ecuador": "Ecuador",
        "Venezuela": "Venezuela",
        "Guyana": "Guyana",
        "Suriname": "Suriname",
        "French Guiana": "French Guiana",
        "Global — subsettable": "Global — subsettable"
      },
      accessLabels: {
        "Provider terms apply": "Provider terms apply",
        "Dataset-specific license": "Dataset-specific license",
        "Publicly available": "Publicly available"
      },
      compactAccessLabels: {
        "Provider terms apply": "Provider terms apply",
        "Dataset-specific license": "Dataset-specific license",
        "Publicly available": "Publicly available"
      },
      kindLabels: {
        "Dataset": "Dataset",
        "Data portal": "Data portal",
        "Download": "Download",
        "Explorer": "Explorer"
      },
      formatLabels: {},
      detailLabels: {
        timeframe: "Timeframe",
        resolution: "Resolution",
        license: "License",
        coverage: "Coverage",
        access: "Access",
        accessEvidence: "View access evidence",
        review: "Link review",
        methodology: "Documentation",
        sourcePage: "Source page"
      },
      researchLabels: {
        heading: "Guided path",
        topics: "Topics",
        filterTopic: "Filter by topic: ",
        clearPath: "Return to the full directory",
        addPath: "Add these sources",
        pathAdded: "Path sources added to the set.",
        pathAlreadyPresent: "This path's sources are already in the set.",
        pathPartiallyAdded: (count) => `${count} ${count === 1 ? "source was" : "sources were"} added; the six-source limit prevented the rest.`,
        questionPosition: (current, total) => `Path ${current} of ${total}.`
      },
      sourceSetLabels: {
        add: "Add",
        added: "In set",
        remove: "Remove",
        removed: (title) => `${title} removed from the set.`,
        full: "The six-source limit has been reached.",
        count: (sources, areas) => `${sources} ${sources === 1 ? "source" : "sources"} · ${areas} primary ${areas === 1 ? "area" : "areas"}`,
        responsible: "Cross-referencing sources does not prove impact, consent, or tenure. Read each responsible-use note and the source documentation.",
        responsibleLabel: "Responsible use",
        protocol: "Source protocol",
        communityAuthority: "Community authority",
        formats: "Formats",
        facts: "Source facts",
        moreTopics: (count) => `${count} additional ${count === 1 ? "topic" : "topics"}`,
        copySuccess: "Link copied",
        copyFailure: "Could not copy",
        reviewed: "Link reviewed",
        emptyCountry: "There is no country-specific source here yet. Try Pan-Amazon or Global — subsettable.",
        emptyDefault: "No sources match those filters. Try a broader search."
      },
      selectFallbacks: {
        topic: "All topics",
        role: "Any purpose",
        mode: "Any type",
        time: "Any timeframe"
      },
      sourceCountLabel: (value) => `${value} ${value === 1 ? "source" : "sources"}`,
      moreFilterCountLabel: (activeCount) => activeCount ? `· ${activeCount} active` : "",
      csvFilename: "amazoniadb-source-set.csv",
      domainNavUnavailable: '<p class="empty-state">Area filters are temporarily unavailable. You can still browse the full catalog below.</p>',
      resultCountPartial: (shown, total) => `Showing ${shown} of ${total} sources`,
      resultCountTotal: (total) => `${total} ${total === 1 ? "source found" : "sources found"}`,
      showMoreText: (count) => `Show ${count} more sources`,
      openSourceText: "Open source",
      openNewTabSr: "(opens in a new tab)",
      methodologySr: (hasMethodology) => `${hasMethodology ? "methodology" : "source page"}; opens in a new tab`,
      citeText: "Cite",
      citeCopied: "Copied",
      citeFailed: "Could not copy",
      reportText: "Report an issue",
      discoveryText: (title, catLabel, covLabel) => `Showing ${title} — a reviewed source in ${catLabel} · ${covLabel}.`,
      selectionCleared: "Selection cleared.",
      copyLinkSuccess: "Link copied",
      copyLinkFailure: "Could not copy",
      citationFormat: (record, accessedDate) => `"${record.title}." ${record.provider}. Link reviewed by AmazoniaDB on ${record.checked}. Accessed on ${accessedDate}. ${record.url}`,
      reportSubject: (title) => `Issue with a source: ${title}`,
      reportBody: (id, url) => `Entry: ${id}\nURL: ${url}\n\nType of issue (do not include locations or sensitive data in this message):\n[ ] Link\n[ ] Context or metadata\n[ ] Territorial or rights issue\n[ ] Sensitive information\n[ ] Protocol request, correction, or removal\n\nDescription:\n`,
      schemaDescription: "A lightweight directory of Amazon socioenvironmental datasets, indexed at their original sources.",
      schemaLanguages: ["en", "pt-BR", "es-419"],
      schemaCatalogLanguage: "en",
      activeFiltersLabel: "Active filters",
      clearAllFilters: "Clear all",
      removeFilterAria: (label) => `Remove filter: ${label}`,
      facetNames: {
        category: "Area",
        coverage: "Coverage",
        topic: "Topic",
        role: "Purpose",
        access: "Access",
        mode: "Type",
        time: "Timeframe",
        sort: "Sort",
        search: "Search"
      },
      sortLabels: {
        checked: "Recently reviewed",
        title: "Title (A–Z)",
        provider: "Provider (A–Z)"
      }
    },
    es: {
      coverageLabels: {
        "Pan-Amazon": "Panamazonía",
        "Brazil": "Brasil",
        "Peru": "Perú",
        "Colombia": "Colombia",
        "Bolivia": "Bolivia",
        "Ecuador": "Ecuador",
        "Venezuela": "Venezuela",
        "Guyana": "Guyana",
        "Suriname": "Surinam",
        "French Guiana": "Guayana Francesa",
        "Global — subsettable": "Global — recortable"
      },
      accessLabels: {
        "Provider terms apply": "Sujeto a los términos del proveedor",
        "Dataset-specific license": "Licencia específica del conjunto de datos",
        "Publicly available": "Disponible públicamente"
      },
      compactAccessLabels: {
        "Provider terms apply": "Términos del proveedor",
        "Dataset-specific license": "Licencia del conjunto",
        "Publicly available": "Acceso público"
      },
      kindLabels: {
        "Dataset": "Conjunto de datos",
        "Data portal": "Portal de datos",
        "Download": "Descarga",
        "Explorer": "Explorador"
      },
      formatLabels: {
        "Dashboard": "Panel",
        "Graphs/plots": "Gráficos",
        "Interactive visualizations": "Visualizaciones interactivas",
        "PDF reports": "Informes PDF",
        "R package": "Paquete R",
        "Web dashboard": "Panel web",
        "Web encyclopedia": "Enciclopedia web",
        "Web map": "Mapa web"
      },
      detailLabels: {
        timeframe: "Período",
        resolution: "Resolución",
        license: "Licencia",
        coverage: "Cobertura",
        access: "Acceso",
        accessEvidence: "Ver evidencia de acceso",
        review: "Revisión del enlace",
        methodology: "Documentación",
        sourcePage: "Página de la fuente"
      },
      researchLabels: {
        heading: "Ruta guiada",
        topics: "Temas",
        filterTopic: "Filtrar por tema: ",
        clearPath: "Volver al directorio completo",
        addPath: "Añadir estas fuentes",
        pathAdded: "Fuentes de la ruta añadidas a la selección.",
        pathAlreadyPresent: "Las fuentes de esta ruta ya están en la selección.",
        pathPartiallyAdded: (count) => `Se ${count === 1 ? "añadió 1 fuente" : `añadieron ${count} fuentes`}; el límite de seis impidió añadir las demás.`,
        questionPosition: (current, total) => `Ruta ${current} de ${total}.`
      },
      sourceSetLabels: {
        add: "Añadir",
        added: "En selección",
        remove: "Quitar",
        removed: (title) => `${title} se quitó de la selección.`,
        full: "Se alcanzó el límite de seis fuentes.",
        count: (sources, areas) => `${sources} ${sources === 1 ? "fuente" : "fuentes"} · ${areas} ${areas === 1 ? "área principal" : "áreas principales"}`,
        responsible: "Cruzar fuentes no demuestra impacto, consentimiento ni tenencia. Consulte los avisos de uso responsable y la documentación de cada fuente.",
        responsibleLabel: "Uso responsable",
        protocol: "Protocolo de la fuente",
        communityAuthority: "Autoridad comunitaria",
        formats: "Formatos",
        facts: "Datos de la fuente",
        moreTopics: (count) => `${count} ${count === 1 ? "tema adicional" : "temas adicionales"}`,
        copySuccess: "Enlace copiado",
        copyFailure: "No se pudo copiar",
        reviewed: "Enlace revisado el",
        emptyCountry: "Todavía no hay una fuente específica para este país. Prueba Panamazonía o Global — recortable.",
        emptyDefault: "Ninguna fuente coincide con esos filtros. Prueba una búsqueda más amplia."
      },
      selectFallbacks: {
        topic: "Todos los temas",
        role: "Cualquier finalidad",
        mode: "Cualquier tipo",
        time: "Cualquier período"
      },
      sourceCountLabel: (value) => `${value} ${value === 1 ? "fuente" : "fuentes"}`,
      moreFilterCountLabel: (activeCount) => activeCount ? `· ${activeCount} ${activeCount === 1 ? "activo" : "activos"}` : "",
      csvFilename: "amazoniadb-conjunto-de-fuentes.csv",
      domainNavUnavailable: '<p class="empty-state">Los filtros por dominio no están disponibles en este momento. Puede consultar el catálogo completo abajo.</p>',
      resultCountPartial: (shown, total) => `Mostrando ${shown} de ${total} fuentes`,
      resultCountTotal: (total) => `${total} ${total === 1 ? "fuente encontrada" : "fuentes encontradas"}`,
      showMoreText: (count) => `Mostrar ${count} fuentes más`,
      openSourceText: "Abrir en la fuente",
      openNewTabSr: "(se abre en una nueva pestaña)",
      methodologySr: (hasMethodology) => `${hasMethodology ? "metodología" : "página de la fuente"}; se abre en una nueva pestaña`,
      citeText: "Citar",
      citeCopied: "Copiado",
      citeFailed: "No se pudo copiar",
      reportText: "Reportar un problema",
      discoveryText: (title, catLabel, covLabel) => `Mostrando ${title} — una fuente con enlace revisado en ${catLabel} · ${covLabel}.`,
      selectionCleared: "Selección vaciada.",
      copyLinkSuccess: "Enlace copiado",
      copyLinkFailure: "No se pudo copiar",
      citationFormat: (record, accessedDate) => `"${record.title}." ${record.provider}. Enlace revisado por AmazoniaDB el ${record.checked}. Consultado el ${accessedDate}. ${record.url}`,
      reportSubject: (title) => `Problema con una fuente: ${title}`,
      reportBody: (id, url) => `Entrada: ${id}\nURL: ${url}\n\nTipo de problema (no incluya ubicaciones ni datos sensibles en este mensaje):\n[ ] Enlace\n[ ] Contexto o metadatos\n[ ] Cuestión territorial o de derechos\n[ ] Información sensible\n[ ] Solicitud de protocolo, corrección o retirada\n\nDescripción:\n`,
      schemaDescription: "Un directorio conciso de conjuntos de datos socioambientales de la Amazonía, indexados en sus fuentes originales.",
      schemaLanguages: ["es-419", "pt-BR", "en"],
      schemaCatalogLanguage: "es-419",
      activeFiltersLabel: "Filtros activos",
      clearAllFilters: "Limpiar todos",
      removeFilterAria: (label) => `Quitar filtro: ${label}`,
      facetNames: {
        category: "Área",
        coverage: "Cobertura",
        topic: "Tema",
        role: "Finalidad",
        access: "Acceso",
        mode: "Tipo",
        time: "Período",
        sort: "Orden",
        search: "Búsqueda"
      },
      sortLabels: {
        checked: "Revisión más reciente",
        title: "Título (A–Z)",
        provider: "Proveedor (A–Z)"
      }
    }
  };

  const ui = LOCALE_CONFIG[locale] || LOCALE_CONFIG["pt-BR"];
  const {
    coverageLabels,
    accessLabels,
    compactAccessLabels,
    kindLabels,
    formatLabels,
    detailLabels,
    researchLabels,
    sourceSetLabels
  } = ui;

  const compactLicenseLabels = {
    "Creative Commons Attribution 4.0 International (CC BY 4.0)": "CC BY 4.0",
    "Creative Commons Attribution (version not specified)": "CC BY",
    "Creative Commons Attribution": "CC BY",
    "Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)": "CC BY-SA 4.0",
    "Creative Commons Attribution-ShareAlike (CC BY-SA; version not specified)": "CC BY-SA",
    "NICFI licensing agreement": "NICFI",
    "Licence for Copernicus DEM instance COP-DEM-GLO-30-F Global 30m Full, Free & Open": "COP-DEM GLO-30",
    "Open Data Commons Open Database License (ODbL)": "ODbL"
  };

  const tagPresentation = window.AMAZONIA_TAG_PRESENTATION || { facets: {}, vocabulary: {} };
  const tagVocabulary = tagPresentation.vocabulary || {};
  const topicVocabulary = tagVocabulary.topics || {};
  const modeVocabulary = tagVocabulary.modes || {};
  const timeVocabulary = tagVocabulary.time || {};
  const roleVocabulary = tagVocabulary.roles || {};
  const topicLabels = Object.fromEntries(Object.entries(topicVocabulary).map(([key, copy]) => [key, copy[locale] || copy.en || key]));
  const modeLabels = Object.fromEntries(Object.entries(modeVocabulary).map(([key, copy]) => [key, copy[locale] || copy.en || key]));
  const timeLabels = Object.fromEntries(Object.entries(timeVocabulary).map(([key, copy]) => [key, copy[locale] || copy.en || key]));
  const roleLabels = Object.fromEntries(Object.entries(roleVocabulary).map(([key, copy]) => [key, copy[locale] || copy.en || key]));
  const researchPaths = window.AMAZONIA_RESEARCH_PATHS || [];
  const localized = (copy) => typeof copy === "string" ? copy : copy?.[locale] || copy?.en || "";

  const fold = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();

  const compactFactValue = (value, maxLength = 44) => {
    const shortened = String(value)
      .split(/;\s/)[0]
      .replace(/,\s+(?:sem|sin|without|not)\b.*$/i, "")
      .replace(/\s*\(([^,)]+)[^)]*\)/g, " · $1")
      .replace(/\s+/g, " ")
      .trim();
    if ([...shortened].length <= maxLength) return shortened;
    const candidate = [...shortened].slice(0, maxLength - 1).join("");
    const breakAt = Math.max(candidate.lastIndexOf(" · "), candidate.lastIndexOf(" "));
    const cutAt = breakAt >= Math.floor(maxLength * 0.6) ? breakAt : candidate.length;
    return `${candidate.slice(0, cutAt).replace(/[,\s·]+$/u, "")}…`;
  };

  const detailIcons = Object.freeze({
    timeframe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>',
    resolution: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 5h14v14H5zM12 5v14M5 12h14"/></svg>',
    license: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5M10 14l2 2 4-4"/></svg>',
    coverage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8c-2-2.2-3-4.9-3-8s1-5.8 3-8Z"/></svg>',
    access: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="12" r="3.5"/><path d="M11.5 12H20M17 12v3M14 12v2"/></svg>',
    review: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m8.5 12 2.2 2.2 4.8-4.8"/></svg>'
  });

  const CATALOG_PAGE_SIZE = 12;
  const SOURCE_SET_LIMIT = 6;
  const state = {
    category: "",
    search: "",
    coverage: "",
    topic: "",
    role: "",
    access: "",
    mode: "",
    time: "",
    sort: "",
    source: "",
    path: "",
    selectedIds: [],
    visibleLimit: CATALOG_PAGE_SIZE
  };

  const domainNav = document.getElementById("domain-nav");
  const coverageStrip = document.getElementById("coverage-strip");
  const grid = document.getElementById("dataset-grid");
  const emptyState = document.getElementById("empty-state");
  const resultCount = document.getElementById("result-count");
  const showMorePanel = document.getElementById("catalog-more");
  const showMoreButton = document.getElementById("show-more-sources");
  const count = document.getElementById("dataset-count");
  const search = document.getElementById("search");
  const coverage = document.getElementById("coverage");
  const topic = document.getElementById("topic");
  const role = document.getElementById("role");
  const access = document.getElementById("access");
  const mode = document.getElementById("mode");
  const timeProfile = document.getElementById("time-profile");
  const sortBy = document.getElementById("sort-by");
  const moreFilters = document.getElementById("more-filters");
  const moreFilterCount = document.getElementById("more-filter-count");
  const filters = document.getElementById("filters");
  const clearFiltersButton = document.getElementById("clear-filters");
  const discoverButton = document.getElementById("discover-source");
  const discoveryResult = document.getElementById("discovery-result");
  const researchPathPanel = document.getElementById("research-path-panel");
  const researchPathButton = document.getElementById("open-research-path");
  const researchPathChoice = document.getElementById("research-path-choice");
  const nextResearchPathButton = document.getElementById("next-research-path");
  const researchPathSummary = document.getElementById("research-path-summary");
  const researchPathPosition = document.getElementById("research-path-position");
  const sourceSetPanel = document.getElementById("source-set-panel");
  const sourceSetSummary = document.getElementById("source-set-summary");
  const sourceSetItems = document.getElementById("source-set-items");
  const sourceSetCaution = document.getElementById("source-set-caution");
  const sourceSetStatus = document.getElementById("source-set-status");
  const copySourceSetButton = document.getElementById("copy-source-set");
  const downloadSourceSetButton = document.getElementById("download-source-set");
  const clearSourceSetButton = document.getElementById("clear-source-set");
  const activeFiltersBar = document.getElementById("active-filters");

  count.textContent = String(catalog.length);

  // Restore filter state from the URL (?category=&q=&coverage=&access=) so a
  // filtered view can be bookmarked or shared as a link.
  const initialParams = new URLSearchParams(window.location.search);
  const valuesFromSelect = (select) => new Set(Array.from(select.options, ({ value }) => value).filter(Boolean));
  const populateControlledSelect = (select, vocabulary, labels, fallback) => {
    if (!select) return [];
    const values = Object.keys(vocabulary);
    const defaultOption = select.dataset.defaultOption || fallback;
    select.innerHTML = [`<option value="">${defaultOption}</option>`, ...values.map((value) => `<option value="${value}">${labels[value]}</option>`)].join("");
    if (Array.isArray(select.options)) select.options = ["", ...values].map((value) => ({ value }));
    return values;
  };
  const topicValues = populateControlledSelect(topic, topicVocabulary, topicLabels, ui.selectFallbacks.topic);
  const roleValues = populateControlledSelect(role, roleVocabulary, roleLabels, ui.selectFallbacks.role);
  const modeValues = populateControlledSelect(mode, modeVocabulary, modeLabels, ui.selectFallbacks.mode);
  const timeValues = populateControlledSelect(timeProfile, timeVocabulary, timeLabels, ui.selectFallbacks.time);
  const validCategories = new Set(categories.map((category) => category.key));
  const validCoverage = valuesFromSelect(coverage);
  const validTopics = new Set(topicValues);
  const validRoles = new Set(roleValues);
  const validAccess = valuesFromSelect(access);
  const validModes = new Set(modeValues);
  const validTime = new Set(timeValues);
  const validSort = new Set(["checked", "title", "provider"]);
  const pathsById = new Map(researchPaths.map((path) => [path.id, path]));
  const validParam = (value, allowed) => allowed.has(value) ? value : "";

  state.category = validParam(initialParams.get("category") || "", validCategories);
  state.search = initialParams.get("q") || "";
  state.coverage = validParam(initialParams.get("coverage") || "", validCoverage);
  state.topic = validParam(initialParams.get("topic") || "", validTopics);
  state.role = validParam(initialParams.get("role") || "", validRoles);
  state.access = validParam(initialParams.get("access") || "", validAccess);
  state.mode = validParam(initialParams.get("mode") || "", validModes);
  state.time = validParam(initialParams.get("time") || "", validTime);
  state.sort = validParam(initialParams.get("sort") || "", validSort);
  state.source = initialParams.get("source") || "";
  state.path = pathsById.has(initialParams.get("path")) ? initialParams.get("path") : "";
  state.selectedIds = [...new Set((initialParams.get("set") || "").split(",").filter((id) => catalog.some((record) => record.id === id)))].slice(0, SOURCE_SET_LIMIT);
  if (state.source && !catalog.some((record) => record.id === state.source)) state.source = "";
  if (state.source) {
    state.category = "";
    state.search = "";
    state.coverage = "";
    state.topic = "";
    state.role = "";
    state.access = "";
    state.mode = "";
    state.time = "";
    state.sort = "";
    state.path = "";
  } else if (state.path) {
    state.category = "";
    state.search = "";
    state.coverage = "";
    state.topic = "";
    state.role = "";
    state.access = "";
    state.mode = "";
    state.time = "";
    state.sort = "";
  }
  let starterPathIndex = Math.max(0, researchPaths.findIndex((path) => path.id === state.path));
  search.value = state.search;
  coverage.value = state.coverage;
  if (topic) topic.value = state.topic;
  if (role) role.value = state.role;
  access.value = state.access;
  if (mode) mode.value = state.mode;
  if (timeProfile) timeProfile.value = state.time;
  if (sortBy) sortBy.value = state.sort;

  const syncUrl = () => {
    const params = new URLSearchParams();
    if (state.category) params.set("category", state.category);
    if (state.search) params.set("q", state.search);
    if (state.coverage) params.set("coverage", state.coverage);
    if (state.topic) params.set("topic", state.topic);
    if (state.role) params.set("role", state.role);
    if (state.access) params.set("access", state.access);
    if (state.mode) params.set("mode", state.mode);
    if (state.time) params.set("time", state.time);
    if (state.sort) params.set("sort", state.sort);
    if (state.source) params.set("source", state.source);
    if (state.path) params.set("path", state.path);
    if (state.selectedIds.length) params.set("set", state.selectedIds.join(","));
    const qs = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash);
    syncLanguageLinks();
  };

  const syncLanguageLinks = () => {
    document.querySelectorAll(".lang-switch a").forEach((link) => {
      const baseHref = link.dataset.baseHref || link.getAttribute("href").split(/[?#]/)[0];
      link.dataset.baseHref = baseHref;
      link.href = `${baseHref}${window.location.search}${window.location.hash}`;
    });
  };

  const getScrollBehavior = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const helper = document.createElement("textarea");
        helper.value = text;
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        document.body.appendChild !== undefined && document.body.removeChild(helper);
        return true;
      } catch {
        return false;
      }
    }
  };

  const flashConfirmation = (button, tempLabel, originalLabel) => {
    button.textContent = tempLabel;
    button.classList.add("copied");
    window.clearTimeout(button._flashTimeout);
    button._flashTimeout = window.setTimeout(() => {
      button.textContent = originalLabel;
      button.classList.remove("copied");
    }, 1600);
  };

  const formatDate = (value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(date);
  };

  const getActivePath = () => pathsById.get(state.path) || null;
  const tagLabel = (facet, value) => tagVocabulary[facet]?.[value]?.[locale] || tagVocabulary[facet]?.[value]?.en || value;
  const getSelectedRecords = () => state.selectedIds.map((id) => catalog.find((record) => record.id === id)).filter(Boolean);
  const sourceSetUrl = (sourceId = "") => {
    const url = new URL(window.location.href);
    url.search = "";
    if (state.selectedIds.length) url.searchParams.set("set", state.selectedIds.join(","));
    if (sourceId) url.searchParams.set("source", sourceId);
    url.hash = "catalog";
    return url.href;
  };

  const updateMoreFilterSummary = () => {
    if (!moreFilterCount) return;
    const activeCount = [state.access, state.mode, state.time, state.sort].filter(Boolean).length;
    moreFilterCount.textContent = ui.moreFilterCountLabel(activeCount);
    if (activeCount && moreFilters) moreFilters.open = true;
  };

  const renderCoverageStrip = () => {
    if (!coverageStrip) return;
    const counts = new Map();
    for (const cov of validCoverage) counts.set(cov, 0);
    for (const record of catalog) {
      counts.set(record.coverage, (counts.get(record.coverage) || 0) + 1);
    }
    const orderedCoverage = [...validCoverage].sort((a, b) => (counts.get(b) || 0) - (counts.get(a) || 0));
    coverageStrip.innerHTML = orderedCoverage.map((cov) => {
      const count = counts.get(cov) || 0;
      const label = coverageLabels[cov] || cov;
      return `<button class="coverage-pill" type="button" data-coverage-pill="${escapeHtml(cov)}" aria-pressed="${state.coverage === cov}"><span>${escapeHtml(label)}</span><span class="coverage-pill-count">${count}</span></button>`;
    }).join("");
  };

  const renderActiveFilters = () => {
    if (!activeFiltersBar) return;
    const chips = [];
    if (state.category) {
      chips.push({ facet: "category", label: `${ui.facetNames.category}: ${categoryLabels[state.category] || state.category}` });
    }
    if (state.coverage) {
      chips.push({ facet: "coverage", label: `${ui.facetNames.coverage}: ${coverageLabels[state.coverage] || state.coverage}` });
    }
    if (state.topic) {
      chips.push({ facet: "topic", label: `${ui.facetNames.topic}: ${topicLabels[state.topic] || state.topic}` });
    }
    if (state.role) {
      chips.push({ facet: "role", label: `${ui.facetNames.role}: ${roleLabels[state.role] || state.role}` });
    }
    if (state.access) {
      chips.push({ facet: "access", label: `${ui.facetNames.access}: ${compactAccessLabels[state.access] || state.access}` });
    }
    if (state.mode) {
      chips.push({ facet: "mode", label: `${ui.facetNames.mode}: ${modeLabels[state.mode] || state.mode}` });
    }
    if (state.time) {
      chips.push({ facet: "time", label: `${ui.facetNames.time}: ${timeLabels[state.time] || state.time}` });
    }
    if (state.sort) {
      chips.push({ facet: "sort", label: `${ui.facetNames.sort}: ${ui.sortLabels[state.sort] || state.sort}` });
    }
    if (state.search.trim()) {
      chips.push({ facet: "search", label: `${ui.facetNames.search}: “${state.search.trim()}”` });
    }
    activeFiltersBar.hidden = chips.length === 0;
    if (!chips.length) {
      activeFiltersBar.innerHTML = "";
      return;
    }
    const chipItems = chips.map((chip) => `<button class="active-filter-chip" type="button" data-clear-facet="${escapeHtml(chip.facet)}" aria-label="${escapeHtml(ui.removeFilterAria(chip.label))}"><span>${escapeHtml(chip.label)}</span><span class="chip-close" aria-hidden="true">×</span></button>`).join("");
    activeFiltersBar.innerHTML = `<div class="active-filters-list" role="group" aria-label="${escapeHtml(ui.activeFiltersLabel)}">${chipItems}</div><button class="text-button active-filters-clear" type="button" data-clear-all-facets>${escapeHtml(ui.clearAllFilters)}</button>`;
  };

  const renderSourceSet = () => {
    if (!sourceSetPanel || !sourceSetItems || !sourceSetSummary) return;
    const records = getSelectedRecords();
    sourceSetPanel.hidden = records.length === 0;
    if (!records.length) {
      sourceSetItems.innerHTML = "";
      sourceSetSummary.textContent = "";
      if (sourceSetCaution) sourceSetCaution.hidden = true;
      return;
    }
    const areas = new Set(records.map((record) => record.category));
    sourceSetSummary.textContent = sourceSetLabels.count(records.length, areas.size);
    sourceSetItems.innerHTML = records.map((record) => `
      <div class="source-set-chip">
        <a class="source-set-chip-link" href="${escapeHtml(sourceSetUrl(record.id))}">${escapeHtml(record.title)}</a>
        <button class="source-set-chip-remove" type="button" data-remove-set="${escapeHtml(record.id)}" aria-label="${escapeHtml(`${sourceSetLabels.remove}: ${record.title}`)}"><span aria-hidden="true">×</span></button>
      </div>`).join("");
    if (sourceSetCaution) {
      const needsCare = records.some((record) => record.responsibleUse);
      sourceSetCaution.hidden = !needsCare;
      sourceSetCaution.textContent = needsCare ? sourceSetLabels.responsible : "";
    }
  };

  const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const downloadSourceSet = () => {
    const records = getSelectedRecords();
    if (!records.length) return;
    const exportedAt = new Date().toISOString();
    const setUrl = sourceSetUrl();
    const fields = ["exportedAt", "sourceSetUrl", "id", "title", "description", "provider", "category", "coverage", "kind", "formats", "access", "accessUrl", "temporalCoverage", "spatialResolution", "license", "methodologyUrl", "topics", "modes", "time", "roles", "sourceUrl", "linkChecked", "responsibleUse", "protocolUrl", "communityAuthorityUrl"];
    const rows = records.map((record) => [
      exportedAt,
      setUrl,
      record.id,
      record.title,
      i18n.descriptions[record.id] || record.description,
      record.provider,
      record.category,
      record.coverage,
      record.kind,
      record.formats.join(" | "),
      record.access,
      record.accessUrl,
      temporalCoverageLabels[record.id] || record.temporalCoverage || "",
      spatialResolutionLabels[record.id] || spatialResolutionLabels[record.spatialResolution] || record.spatialResolution || "",
      licenseLabels[record.id] || record.license || "",
      record.methodologyUrl || "",
      (record.tags?.topics || []).join(" | "),
      (record.tags?.modes || []).join(" | "),
      (record.tags?.time || []).join(" | "),
      (record.tags?.roles || []).join(" | "),
      record.url,
      record.checked,
      localized(record.responsibleUse?.note),
      record.responsibleUse?.protocolUrl || "",
      record.responsibleUse?.communityAuthorityUrl || ""
    ]);
    const csv = `\uFEFF${[fields, ...rows].map((row) => row.map(csvCell).join(",")).join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = ui.csvFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(href), 0);
  };

  const renderResearchStarter = () => {
    if (!researchPathChoice || !researchPathButton) return;
    const activePath = researchPaths[starterPathIndex] || researchPaths[0];
    if (!activePath) {
      researchPathChoice.disabled = true;
      researchPathButton.disabled = true;
      nextResearchPathButton?.setAttribute("hidden", "");
      return;
    }
    researchPathChoice.innerHTML = researchPaths.map((path) => `<option value="${escapeHtml(path.id)}">${escapeHtml(localized(path.locales?.shortTitle) || localized(path.locales?.title))}</option>`).join("");
    if (Array.isArray(researchPathChoice.options)) researchPathChoice.options = researchPaths.map((path) => ({ value: path.id }));
    researchPathChoice.value = activePath.id;
    researchPathButton.dataset.path = activePath.id;
    researchPathButton.disabled = false;
    if (researchPathSummary) researchPathSummary.textContent = localized(activePath.locales?.selectorSummary) || localized(activePath.locales?.summary);
    if (researchPathPosition) researchPathPosition.textContent = researchLabels.questionPosition(starterPathIndex + 1, researchPaths.length);
    if (nextResearchPathButton) {
      nextResearchPathButton.disabled = researchPaths.length < 2;
      nextResearchPathButton.hidden = researchPaths.length < 2;
    }
  };

  const renderDomains = () => {
    if (!categories.length) {
      domainNav.innerHTML = ui.domainNavUnavailable;
      return;
    }
    domainNav.innerHTML = categories.map((category) => {
      const sourceCount = catalog.filter((record) => record.category === category.key).length;
      return `
        <button class="domain-button" type="button" data-category="${escapeHtml(category.key)}" data-domain="${escapeHtml(category.id)}" aria-pressed="${state.category === category.key}">
          <span class="domain-icon">${category.icon}</span>
          <span class="domain-copy"><strong>${escapeHtml(category.label)}</strong><span>${escapeHtml(category.note)}</span></span>
          <span class="domain-count">${ui.sourceCountLabel(sourceCount)}</span>
        </button>`;
    }).join("");
  };

  const buildRecordSearchText = (record) => {
    const tagTerms = Object.entries(record.tags || {}).flatMap(([facet, values]) =>
      Array.isArray(values) ? values.flatMap((value) => [value, tagLabel(facet, value)]) : []
    );
    return fold([
      record.title,
      record.provider,
      record.category,
      categoryLabels[record.category],
      record.coverage,
      coverageLabels[record.coverage],
      record.description,
      i18n.descriptions[record.id],
      record.temporalCoverage,
      temporalCoverageLabels[record.id],
      record.spatialResolution,
      spatialResolutionLabels[record.id] || spatialResolutionLabels[record.spatialResolution],
      record.license,
      licenseLabels[record.id],
      ...record.formats,
      ...record.formats.map((format) => formatLabels[format] || format),
      ...tagTerms
    ].join(" "));
  };

  const getVisibleRecords = () => {
    const foldedSearch = fold(state.search.trim());
    const searchTokens = foldedSearch.split(/\s+/).filter(Boolean);
    const activePath = getActivePath();

    // Check if the exact folded phrase occurs in any catalog entry. If not,
    // multi-word queries fall back to matching all individual tokens.
    const hasExactPhraseMatch = !foldedSearch || catalog.some((record) => buildRecordSearchText(record).includes(foldedSearch));

    const records = catalog.filter((record) => {
      const searchText = buildRecordSearchText(record);
      const matchesSearch = !foldedSearch || (
        hasExactPhraseMatch
          ? searchText.includes(foldedSearch)
          : searchTokens.every((token) => searchText.includes(token))
      );

      return (!state.source || record.id === state.source)
        && (!activePath || activePath.records.some((entry) => entry.id === record.id))
        && (!state.category || record.category === state.category)
        && (!state.coverage || record.coverage === state.coverage)
        && (!state.topic || record.tags?.topics?.includes(state.topic))
        && (!state.role || record.tags?.roles?.includes(state.role))
        && (!state.access || record.access === state.access)
        && (!state.mode || record.tags?.modes?.includes(state.mode))
        && (!state.time || record.tags?.time?.includes(state.time))
        && matchesSearch;
    });
    if (activePath) {
      const order = new Map(activePath.records.map((entry, index) => [entry.id, index]));
      return records.sort((a, b) => order.get(a.id) - order.get(b.id));
    }
    if (state.sort === "checked") {
      return [...records].sort((a, b) => b.checked.localeCompare(a.checked) || a.title.localeCompare(b.title, locale));
    }
    if (state.sort === "title") {
      return [...records].sort((a, b) => a.title.localeCompare(b.title, locale));
    }
    if (state.sort === "provider") {
      return [...records].sort((a, b) => a.provider.localeCompare(b.provider, locale) || a.title.localeCompare(b.title, locale));
    }
    return records;
  };

  const renderCatalog = () => {
    const activePath = getActivePath();
    const allRecords = getVisibleRecords();
    const isUnfiltered = !activePath && !state.category && !state.search.trim() && !state.coverage && !state.topic && !state.role && !state.access && !state.mode && !state.time && !state.sort && !state.source;
    const records = isUnfiltered ? allRecords.slice(0, state.visibleLimit) : allRecords;
    resultCount.textContent = isUnfiltered && records.length < allRecords.length
      ? ui.resultCountPartial(records.length, allRecords.length)
      : ui.resultCountTotal(allRecords.length);
    emptyState.hidden = allRecords.length !== 0;
    if (!allRecords.length) {
      emptyState.textContent = ["Colombia", "Bolivia", "Ecuador", "Venezuela", "Guyana", "Suriname", "French Guiana"].includes(state.coverage) ? sourceSetLabels.emptyCountry : sourceSetLabels.emptyDefault;
    }
    if (showMorePanel && showMoreButton) {
      const remaining = allRecords.length - records.length;
      showMorePanel.hidden = remaining <= 0;
      showMoreButton.textContent = ui.showMoreText(Math.min(CATALOG_PAGE_SIZE, remaining));
    }
    renderCoverageStrip();
    renderActiveFilters();
    grid.innerHTML = records.map((record) => {
      const detailItem = (icon, label, value, visibleValue = value, href = "", linkLabel = "") => `<li data-fact="${escapeHtml(icon)}" aria-label="${escapeHtml(`${label}: ${value}`)}"><span class="detail-icon" aria-hidden="true">${detailIcons[icon]}</span><span${visibleValue !== value ? ` title="${escapeHtml(value)}"` : ""}>${href ? `<a class="fact-evidence-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${label}: ${value}. ${linkLabel}`)}">${escapeHtml(visibleValue)}</a>` : escapeHtml(visibleValue)}</span></li>`;
      const reviewDate = formatDate(record.checked);
      const reviewItem = `<li data-fact="review" aria-label="${escapeHtml(`${detailLabels.review}: ${reviewDate}`)}"><span class="detail-icon" aria-hidden="true">${detailIcons.review}</span><span>${escapeHtml(sourceSetLabels.reviewed)} <time datetime="${escapeHtml(record.checked)}">${escapeHtml(reviewDate)}</time></span></li>`;
      const fullLicense = record.license ? licenseLabels[record.id] || record.license : "";
      const temporalValue = record.temporalCoverage ? temporalCoverageLabels[record.id] || record.temporalCoverage : "";
      const resolutionValue = record.spatialResolution ? spatialResolutionLabels[record.id] || spatialResolutionLabels[record.spatialResolution] || record.spatialResolution : "";
      const accessValue = accessLabels[record.access] || record.access;
      const factItems = [
        temporalValue ? detailItem("timeframe", detailLabels.timeframe, temporalValue, compactFactValue(temporalValue)) : "",
        resolutionValue ? detailItem("resolution", detailLabels.resolution, resolutionValue, compactFactValue(resolutionValue)) : "",
        record.license ? detailItem("license", detailLabels.license, fullLicense, compactLicenseLabels[record.license] || fullLicense) : "",
        detailItem("coverage", detailLabels.coverage, coverageLabels[record.coverage] || record.coverage),
        detailItem("access", detailLabels.access, accessValue, compactAccessLabels[record.access] || accessValue, record.accessUrl, detailLabels.accessEvidence),
        reviewItem
      ].filter(Boolean).join("");
      const pathEntry = activePath?.records.find((entry) => entry.id === record.id);
      const pathReason = pathEntry ? `<div class="path-role"><strong>${escapeHtml(localized(pathEntry.role))}</strong><span>${escapeHtml(localized(pathEntry.reason))}</span></div>` : "";
      const allTopics = record.tags?.topics || [];
      const topics = state.topic && allTopics.includes(state.topic) ? [state.topic, ...allTopics.filter((value) => value !== state.topic)].slice(0, 2) : allTopics.slice(0, 2);
      const hiddenTopicCount = allTopics.length - topics.length;
      const topicTags = topics.length ? `<div class="topic-tags" aria-label="${escapeHtml(researchLabels.topics)}">${topics.map((value) => `<button class="topic-tag" type="button" data-topic="${escapeHtml(value)}" aria-label="${escapeHtml(`${researchLabels.filterTopic}${topicLabels[value] || value}`)}">${escapeHtml(topicLabels[value] || value)}</button>`).join("")}${hiddenTopicCount ? `<span class="topic-more" aria-label="${escapeHtml(sourceSetLabels.moreTopics(hiddenTopicCount))}">+${hiddenTopicCount}</span>` : ""}</div>` : "";
      const formats = `<ul class="format-tags" aria-label="${escapeHtml(sourceSetLabels.formats)}">${record.formats.map((format) => `<li>${escapeHtml(formatLabels[format] || format)}</li>`).join("")}</ul>`;
      const responsibleLinks = [
        record.responsibleUse?.protocolUrl ? `<a href="${escapeHtml(record.responsibleUse.protocolUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(sourceSetLabels.protocol)} <span aria-hidden="true">↗</span></a>` : "",
        record.responsibleUse?.communityAuthorityUrl ? `<a href="${escapeHtml(record.responsibleUse.communityAuthorityUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(sourceSetLabels.communityAuthority)} <span aria-hidden="true">↗</span></a>` : ""
      ].filter(Boolean).join("");
      const responsibleUse = record.responsibleUse ? `<details class="responsible-use"><summary>${escapeHtml(sourceSetLabels.responsibleLabel)}</summary><div class="responsible-use-body"><p>${escapeHtml(localized(record.responsibleUse.note))}</p>${responsibleLinks ? `<div class="responsible-links">${responsibleLinks}</div>` : ""}</div></details>` : "";
      const selected = state.selectedIds.includes(record.id);
      const selectionFull = state.selectedIds.length >= SOURCE_SET_LIMIT && !selected;
      const selectionLabel = selectionFull ? `${sourceSetLabels.add}: ${record.title}. ${sourceSetLabels.full}` : `${selected ? sourceSetLabels.remove : sourceSetLabels.add}: ${record.title}`;
      return `
      <article class="dataset-card${state.source === record.id ? " is-discovery" : ""}" data-record-id="${escapeHtml(record.id)}" aria-labelledby="source-${escapeHtml(record.id)}-title"${state.source === record.id ? " tabindex=\"-1\"" : ""}>
        <div class="card-topline">
          <span class="card-classification"><span class="category-label">${escapeHtml(categoryLabels[record.category] || record.category)}</span><span class="source-kind">${escapeHtml(kindLabels[record.kind] || record.kind)}</span></span>
          <button class="source-set-toggle" type="button" data-select-id="${escapeHtml(record.id)}" aria-label="${escapeHtml(selectionLabel)}" aria-pressed="${selected}"${selectionFull ? " disabled" : ""}>${escapeHtml(selected ? sourceSetLabels.added : sourceSetLabels.add)}</button>
        </div>
        <h3 id="source-${escapeHtml(record.id)}-title">${escapeHtml(record.title)}</h3>
        <p class="provider">${escapeHtml(record.provider)}</p>
        <p class="description">${escapeHtml(i18n.descriptions[record.id] || record.description)}</p>
        ${pathReason}
        ${topicTags}
        ${formats}
        <ul class="dataset-facts" aria-label="${escapeHtml(sourceSetLabels.facts)}">${factItems}</ul>
        ${responsibleUse}
        <div class="card-actions">
          <div class="card-links">
            <a class="dataset-link" href="${escapeHtml(record.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(ui.openSourceText)} <span class="sr-only">${escapeHtml(ui.openNewTabSr)}</span></a>
            <a class="methodology-link" href="${escapeHtml(record.methodologyUrl || record.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(record.methodologyUrl ? detailLabels.methodology : detailLabels.sourcePage)} <span class="sr-only">${escapeHtml(ui.methodologySr(Boolean(record.methodologyUrl)))}</span></a>
          </div>
          <div class="card-tools">
            <button class="cite-button" type="button" data-cite-id="${escapeHtml(record.id)}">${escapeHtml(ui.citeText)}</button>
            <button class="cite-button" type="button" data-report-id="${escapeHtml(record.id)}">${escapeHtml(ui.reportText)}</button>
          </div>
        </div>
      </article>`;
    }).join("");
  };

  const renderResearchPath = () => {
    if (!researchPathPanel) return;
    const activePath = getActivePath();
    researchPathPanel.hidden = !activePath;
    if (!activePath) {
      researchPathPanel.innerHTML = "";
      return;
    }
    const copy = activePath.locales || {};
    researchPathPanel.setAttribute("aria-label", researchLabels.heading);
    researchPathPanel.innerHTML = `
      <div>
        <p class="eyebrow">${escapeHtml(researchLabels.heading)}</p>
        <h3>${escapeHtml(localized(copy.title))}</h3>
        <p>${escapeHtml(localized(copy.summary))}</p>
        <p class="research-caution">${escapeHtml(localized(copy.caution))}</p>
      </div>
      <div class="research-path-actions">
        <button class="button button-secondary" type="button" data-add-path>${escapeHtml(researchLabels.addPath)}</button>
        <button class="text-button" type="button" data-clear-path>${escapeHtml(researchLabels.clearPath)}</button>
      </div>`;
  };

  const renderDiscovery = () => {
    if (!discoveryResult) return;
    const record = catalog.find((entry) => entry.id === state.source);
    discoveryResult.hidden = !record;
    if (!record) {
      discoveryResult.textContent = "";
      return;
    }
    const category = categories.find((entry) => entry.key === record.category);
    discoveryResult.textContent = ui.discoveryText(
      record.title,
      category?.label || record.category,
      coverageLabels[record.coverage] || record.coverage
    );
  };

  const updateDiscoverControl = () => {
    if (!discoverButton) return;
    const hasRecords = catalog.length > 0;
    discoverButton.disabled = !hasRecords;
    discoverButton.setAttribute("aria-disabled", String(!hasRecords));
  };

  // Describe the site and its catalog without republishing provider records.
  const injectStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://amazoniadb.org/#website",
          "name": "AmazoniaDB",
          "url": "https://amazoniadb.org/",
          "description": ui.schemaDescription,
          "inLanguage": ui.schemaLanguages
        },
        {
          "@type": "DataCatalog",
          "@id": "https://amazoniadb.org/#catalog",
          "name": "AmazoniaDB",
          "description": ui.schemaDescription,
          "url": "https://amazoniadb.org/",
          "inLanguage": ui.schemaCatalogLanguage,
          "isPartOf": { "@id": "https://amazoniadb.org/#website" }
        }
      ]
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  };

  domainNav.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    state.category = state.category === button.dataset.category ? "" : button.dataset.category;
    state.source = "";
    state.path = "";
    renderDomains();
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    syncUrl();
    document.getElementById("catalog").scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  });

  coverageStrip?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-coverage-pill]");
    if (!button) return;
    const cov = button.dataset.coveragePill;
    state.coverage = state.coverage === cov ? "" : cov;
    coverage.value = state.coverage;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    syncUrl();
  });

  activeFiltersBar?.addEventListener("click", (event) => {
    const clearFacetButton = event.target.closest("button[data-clear-facet]");
    if (clearFacetButton) {
      const facet = clearFacetButton.dataset.clearFacet;
      if (facet === "category") state.category = "";
      else if (facet === "coverage") { state.coverage = ""; coverage.value = ""; }
      else if (facet === "topic") { state.topic = ""; if (topic) topic.value = ""; }
      else if (facet === "role") { state.role = ""; if (role) role.value = ""; }
      else if (facet === "access") { state.access = ""; access.value = ""; }
      else if (facet === "mode") { state.mode = ""; if (mode) mode.value = ""; }
      else if (facet === "time") { state.time = ""; if (timeProfile) timeProfile.value = ""; }
      else if (facet === "sort") { state.sort = ""; if (sortBy) sortBy.value = ""; }
      else if (facet === "search") { state.search = ""; search.value = ""; }
      state.source = "";
      state.path = "";
      renderDomains();
      renderCatalog();
      renderResearchPath();
      renderDiscovery();
      updateDiscoverControl();
      updateMoreFilterSummary();
      syncUrl();
      return;
    }
    if (event.target.closest("button[data-clear-all-facets]")) {
      filters.reset();
    }
  });

  search.addEventListener("input", () => {
    state.search = search.value;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    syncUrl();
  });

  coverage.addEventListener("change", () => {
    state.coverage = coverage.value;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    syncUrl();
  });

  topic?.addEventListener("change", () => {
    state.topic = topic.value;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    syncUrl();
  });

  role?.addEventListener("change", () => {
    state.role = role.value;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    syncUrl();
  });

  access.addEventListener("change", () => {
    state.access = access.value;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    updateMoreFilterSummary();
    syncUrl();
  });

  mode?.addEventListener("change", () => {
    state.mode = mode.value;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    updateMoreFilterSummary();
    syncUrl();
  });

  timeProfile?.addEventListener("change", () => {
    state.time = timeProfile.value;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    updateMoreFilterSummary();
    syncUrl();
  });

  sortBy?.addEventListener("change", () => {
    state.sort = sortBy.value;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    updateMoreFilterSummary();
    syncUrl();
  });

  filters.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  filters.addEventListener("reset", () => {
    window.setTimeout(() => {
      state.search = "";
      state.coverage = "";
      state.topic = "";
      state.role = "";
      state.access = "";
      state.mode = "";
      state.time = "";
      state.sort = "";
      state.category = "";
      state.source = "";
      state.path = "";
      if (topic) topic.value = "";
      if (role) role.value = "";
      if (mode) mode.value = "";
      if (timeProfile) timeProfile.value = "";
      if (sortBy) sortBy.value = "";
      renderDomains();
      renderCatalog();
      renderResearchPath();
      renderDiscovery();
      updateDiscoverControl();
      updateMoreFilterSummary();
      syncUrl();
    }, 0);
  });

  discoverButton?.addEventListener("click", () => {
    const otherRecords = catalog.filter((record) => record.id !== state.source);
    const records = otherRecords.length ? otherRecords : catalog;
    if (!records.length) return;
    const record = records[Math.floor(Math.random() * records.length)];
    state.category = "";
    state.search = "";
    state.coverage = "";
    state.topic = "";
    state.role = "";
    state.access = "";
    state.mode = "";
    state.time = "";
    state.sort = "";
    state.source = record.id;
    state.path = "";
    search.value = "";
    coverage.value = "";
    if (topic) topic.value = "";
    if (role) role.value = "";
    access.value = "";
    if (mode) mode.value = "";
    if (timeProfile) timeProfile.value = "";
    if (sortBy) sortBy.value = "";
    renderDomains();
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    updateMoreFilterSummary();
    syncUrl();
    const card = grid.querySelector(`[data-record-id="${record.id}"]`);
    card?.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
    card?.focus({ preventScroll: true });
  });

  const openResearchPath = (pathId) => {
    if (!pathsById.has(pathId)) return;
    starterPathIndex = researchPaths.findIndex((path) => path.id === pathId);
    state.category = "";
    state.search = "";
    state.coverage = "";
    state.topic = "";
    state.role = "";
    state.access = "";
    state.mode = "";
    state.time = "";
    state.sort = "";
    state.source = "";
    state.path = pathId;
    search.value = "";
    coverage.value = "";
    if (topic) topic.value = "";
    if (role) role.value = "";
    access.value = "";
    if (mode) mode.value = "";
    if (timeProfile) timeProfile.value = "";
    if (sortBy) sortBy.value = "";
    renderDomains();
    renderResearchStarter();
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    updateMoreFilterSummary();
    syncUrl();
    document.getElementById("catalog").scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  };

  researchPathChoice?.addEventListener("change", () => {
    const nextIndex = researchPaths.findIndex((path) => path.id === researchPathChoice.value);
    if (nextIndex < 0) return;
    starterPathIndex = nextIndex;
    renderResearchStarter();
  });
  nextResearchPathButton?.addEventListener("click", () => {
    if (researchPaths.length < 2) return;
    starterPathIndex = (starterPathIndex + 1) % researchPaths.length;
    renderResearchStarter();
  });
  researchPathButton?.addEventListener("click", () => openResearchPath(researchPathButton.dataset.path));
  showMoreButton?.addEventListener("click", () => {
    state.visibleLimit += CATALOG_PAGE_SIZE;
    renderCatalog();
  });
  researchPathPanel?.addEventListener("click", (event) => {
    if (event.target.closest("button[data-add-path]")) {
      const activePath = getActivePath();
      if (!activePath) return;
      const missingIds = activePath.records.map((entry) => entry.id).filter((id) => !state.selectedIds.includes(id));
      const addedIds = missingIds.slice(0, Math.max(0, SOURCE_SET_LIMIT - state.selectedIds.length));
      state.selectedIds = [...state.selectedIds, ...addedIds];
      if (sourceSetStatus) {
        sourceSetStatus.textContent = !missingIds.length
          ? researchLabels.pathAlreadyPresent
          : addedIds.length < missingIds.length
            ? researchLabels.pathPartiallyAdded(addedIds.length)
            : researchLabels.pathAdded;
      }
      renderCatalog();
      renderSourceSet();
      syncUrl();
      return;
    }
    if (event.target.closest("button[data-clear-path]")) {
      state.path = "";
      renderCatalog();
      renderResearchPath();
      syncUrl();
    }
  });

  sourceSetItems?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-remove-set]");
    if (!button) return;
    const removedId = button.dataset.removeSet;
    const removedRecord = catalog.find((record) => record.id === removedId);
    const chipIndex = Array.from(sourceSetItems.querySelectorAll("button[data-remove-set]")).indexOf(button);
    state.selectedIds = state.selectedIds.filter((id) => id !== removedId);
    renderCatalog();
    renderSourceSet();
    syncUrl();
    if (sourceSetStatus) sourceSetStatus.textContent = sourceSetLabels.removed(removedRecord?.title || removedId);
    const remainingChips = Array.from(sourceSetItems.querySelectorAll("button[data-remove-set]"));
    const removedCardButton = Array.from(grid.querySelectorAll("button[data-select-id]")).find((item) => item.dataset.selectId === removedId);
    (remainingChips[chipIndex] || remainingChips[chipIndex - 1] || removedCardButton || grid.querySelector("button[data-select-id]") || clearFiltersButton || search)?.focus();
  });
  clearSourceSetButton?.addEventListener("click", () => {
    state.selectedIds = [];
    if (sourceSetStatus) sourceSetStatus.textContent = ui.selectionCleared;
    renderCatalog();
    renderSourceSet();
    syncUrl();
    (grid.querySelector("button[data-select-id]") || clearFiltersButton || search)?.focus();
  });
  copySourceSetButton?.addEventListener("click", async () => {
    const original = copySourceSetButton.textContent;
    const ok = await copyToClipboard(sourceSetUrl());
    flashConfirmation(copySourceSetButton, ok ? sourceSetLabels.copySuccess : sourceSetLabels.copyFailure, original);
  });
  downloadSourceSetButton?.addEventListener("click", downloadSourceSet);

  const copyLinkButton = document.getElementById("copy-view-link");
  copyLinkButton?.addEventListener("click", async () => {
    const original = copyLinkButton.textContent;
    const ok = await copyToClipboard(window.location.href);
    flashConfirmation(copyLinkButton, ok ? ui.copyLinkSuccess : ui.copyLinkFailure, original);
  });

  grid.addEventListener("click", async (event) => {
    const selectionButton = event.target.closest("button[data-select-id]");
    if (selectionButton) {
      const id = selectionButton.dataset.selectId;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((selectedId) => selectedId !== id);
      } else if (state.selectedIds.length < SOURCE_SET_LIMIT) {
        state.selectedIds = [...state.selectedIds, id];
      } else if (sourceSetStatus) {
        sourceSetStatus.textContent = sourceSetLabels.full;
      }
      renderCatalog();
      renderSourceSet();
      syncUrl();
      Array.from(grid.querySelectorAll("button[data-select-id]")).find((button) => button.dataset.selectId === id)?.focus();
      return;
    }

    const topicButton = event.target.closest("button[data-topic]");
    if (topicButton) {
      state.topic = state.topic === topicButton.dataset.topic ? "" : topicButton.dataset.topic;
      state.source = "";
      state.path = "";
      if (topic) topic.value = state.topic;
      renderCatalog();
      renderResearchPath();
      renderDiscovery();
      updateDiscoverControl();
      syncUrl();
      return;
    }

    const citeButton = event.target.closest("button[data-cite-id]");
    if (citeButton) {
      const record = catalog.find((entry) => entry.id === citeButton.dataset.citeId);
      if (!record) return;
      const citation = ui.citationFormat(record, formatDate(new Date().toISOString().slice(0, 10)));
      const ok = await copyToClipboard(citation);
      flashConfirmation(citeButton, ok ? ui.citeCopied : ui.citeFailed, ui.citeText);
      return;
    }

    const reportButton = event.target.closest("button[data-report-id]");
    if (reportButton) {
      const record = catalog.find((entry) => entry.id === reportButton.dataset.reportId);
      if (!record) return;
      const subject = encodeURIComponent(ui.reportSubject(record.title));
      const body = encodeURIComponent(ui.reportBody(record.id, record.url));
      window.location.href = `mailto:correcoes@amazoniadb.org?subject=${subject}&body=${body}`;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
    const active = document.activeElement;
    const isTyping = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable);
    if (isTyping) return;
    event.preventDefault();
    search.focus();
  });

  renderDomains();
  renderResearchStarter();
  renderCatalog();
  renderResearchPath();
  renderDiscovery();
  renderSourceSet();
  updateDiscoverControl();
  updateMoreFilterSummary();
  syncUrl();
  injectStructuredData();
})();
