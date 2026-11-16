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
        questionPosition: (current, total) => `Caminho ${current} de ${total}.`,
        comparabilitySummary: "Comparabilidade metodológica e limites"
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
      bibtexFilename: "amazoniadb-fontes.bib",
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
      },
      blueprintLabels: {
        tabGroupLabel: "Roteiros de investigação",
        pipelineHeading: "Circuito de investigação em fontes complementares",
        rosettaHeading: "Pedra de Roseta metodológica — como comparar sem distorcer",
        synthesisLabel: "Regra de síntese",
        openInDirectory: "Filtrar diretório por este roteiro",
        stagePathSources: "Adicionar roteiro à seleção",
        downloadPathBibtex: "Baixar BibTeX do roteiro",
        sourcesCount: (n) => `${n} fontes`
      },
      mapLabels: {
        eyebrow: "Cartografia Pan-Amazônica",
        title: "Explore a bacia e as 9 jurisdições no mapa",
        clickMapHint: "Clique em um país no mapa ou nos filtros abaixo para recortar o diretório.",
        clearTerritory: "Ver toda a bacia",
        basinOverviewTitle: "Visão Pan-Amazônica integrada",
        basinOverviewNote: "100 fontes auditadas distribuídas pelos 9 países e territórios da bacia, camadas regionais pan-amazônicas e bases globais recortáveis.",
        jurisdictionSources: (n) => `${n} ${n === 1 ? "fonte nacional específica" : "fontes nacionais específicas"}`,
        plusBasinAndGlobal: (pan, glob) => `+ ${pan} fontes Pan-Amazônia e ${glob} Globais recortáveis aplicáveis ao território`,
        domainBreakdown: "Distribuição por área de conhecimento",
        primaryInstitutions: "Principais instituições e publicadores indexados",
        basinContourLabel: "Limite da Bacia / Pan-Amazônia"
      },
      matrixLabels: {
        eyebrow: "Arquitetura de observação socioambiental",
        title: "Matriz Escala × Tempo",
        subtitle: "Cruzamento entre a frequência temporal de atualização e o modo de observação das fontes visíveis. Células vazias revelam lacunas observacionais no recorte atual.",
        axisCorner: "Cadência \\ Modo",
        coverageStat: (filled, total, count) => `${count} ${count === 1 ? "fonte plotada" : "fontes plotadas"} · ${filled} de ${total} células Escala × Tempo preenchidas (${total - filled} lacunas neste recorte)`,
        emptyCell: "Sem fonte neste cruzamento",
        switchBackToCards: "Voltar para a grade de cartões",
        rows: [
          { key: "near-real-time", label: "Tempo quase real e alertas", sub: "Diário / semanal / orbital" },
          { key: "annual", label: "Séries anuais", sub: "Consolidação anual" },
          { key: "historical-series", label: "Séries históricas", sub: "Multidecadal / contínua" },
          { key: "periodic-census", label: "Censos e levantamentos", sub: "Decenal / periódico" },
          { key: "current-reference", label: "Referência cadastral atual", sub: "Limites e malhas vigentes" }
        ],
        cols: [
          { key: "remote-sensing", keys: ["remote-sensing"], label: "Satélite e sensoriamento" },
          { key: "field-monitoring", keys: ["field-monitoring"], label: "Estações e parcelas de campo" },
          { key: "territorial-boundary", keys: ["territorial-boundary"], label: "Limites territoriais e fundiários" },
          { key: "census-survey", keys: ["census-survey"], label: "Censos e indicadores" },
          { key: "registry-archive", keys: ["administrative-registry", "document-archive"], label: "Registros públicos e acervos" }
        ]
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
        questionPosition: (current, total) => `Path ${current} of ${total}.`,
        comparabilitySummary: "Methodological comparability & limits"
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
      bibtexFilename: "amazoniadb-sources.bib",
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
      },
      blueprintLabels: {
        tabGroupLabel: "Investigation blueprints",
        pipelineHeading: "Complementary multi-source investigation circuit",
        rosettaHeading: "Methodological Rosetta Stone — how to compare without conflating",
        synthesisLabel: "Synthesis rule",
        openInDirectory: "Filter directory to this blueprint",
        stagePathSources: "Add blueprint to selection",
        downloadPathBibtex: "Download blueprint BibTeX",
        sourcesCount: (n) => `${n} sources`
      },
      mapLabels: {
        eyebrow: "Pan-Amazon Cartography",
        title: "Explore the basin and all 9 jurisdictions on the map",
        clickMapHint: "Click any jurisdiction on the map or a pill below to filter the directory.",
        clearTerritory: "Show full basin",
        basinOverviewTitle: "Integrated Pan-Amazon overview",
        basinOverviewNote: "100 audited sources spanning all 9 Amazonian jurisdictions, basin-wide pan-Amazon layers, and subsettable global baselines.",
        jurisdictionSources: (n) => `${n} jurisdiction-specific ${n === 1 ? "source" : "sources"}`,
        plusBasinAndGlobal: (pan, glob) => `+ ${pan} Pan-Amazon and ${glob} subsettable Global sources applicable here`,
        domainBreakdown: "Breakdown by area of knowledge",
        primaryInstitutions: "Primary indexed institutions & publishers",
        basinContourLabel: "Basin boundary / Pan-Amazon"
      },
      matrixLabels: {
        eyebrow: "Socioenvironmental observation architecture",
        title: "Scale × Time Observatory Matrix",
        subtitle: "Cross-tabulation of update cadence against observation mode for the active filter. Empty cells reveal observational blind spots in the current slice.",
        axisCorner: "Cadence \\ Mode",
        coverageStat: (filled, total, count) => `${count} ${count === 1 ? "source plotted" : "sources plotted"} · ${filled} of ${total} Scale × Time cells covered (${total - filled} blind spots in this view)`,
        emptyCell: "No source in this intersection",
        switchBackToCards: "Return to card grid",
        rows: [
          { key: "near-real-time", label: "Near-real-time & alerts", sub: "Daily / weekly / orbital" },
          { key: "annual", label: "Annual series", sub: "Yearly consolidation" },
          { key: "historical-series", label: "Historical series", sub: "Multi-decade / continuous" },
          { key: "periodic-census", label: "Periodic censuses & surveys", sub: "Decennial / multi-year" },
          { key: "current-reference", label: "Current reference baselines", sub: "Active boundaries & registries" }
        ],
        cols: [
          { key: "remote-sensing", keys: ["remote-sensing"], label: "Satellite & remote sensing" },
          { key: "field-monitoring", keys: ["field-monitoring"], label: "Stations & field plots" },
          { key: "territorial-boundary", keys: ["territorial-boundary"], label: "Territorial & tenure boundaries" },
          { key: "census-survey", keys: ["census-survey"], label: "Censuses & indicators" },
          { key: "registry-archive", keys: ["administrative-registry", "document-archive"], label: "Public registries & archives" }
        ]
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
        questionPosition: (current, total) => `Ruta ${current} de ${total}.`,
        comparabilitySummary: "Comparabilidad metodológica y límites"
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
      bibtexFilename: "amazoniadb-fuentes.bib",
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
      },
      blueprintLabels: {
        tabGroupLabel: "Rutas de investigación",
        pipelineHeading: "Circuito de investigación con fuentes complementarias",
        rosettaHeading: "Piedra Rosetta metodológica — cómo comparar sin distorsionar",
        synthesisLabel: "Regla de síntesis",
        openInDirectory: "Filtrar directorio por esta ruta",
        stagePathSources: "Añadir ruta a la selección",
        downloadPathBibtex: "Descargar BibTeX de la ruta",
        sourcesCount: (n) => `${n} fuentes`
      },
      mapLabels: {
        eyebrow: "Cartografía Panamazónica",
        title: "Explora la cuenca y las 9 jurisdicciones en el mapa",
        clickMapHint: "Haz clic en un país del mapa o en los filtros inferiores para recortar el directorio.",
        clearTerritory: "Ver toda la cuenca",
        basinOverviewTitle: "Visión Panamazónica integrada",
        basinOverviewNote: "100 fuentes auditadas distribuidas en los 9 países y territorios de la cuenca, capas regionales panamazónicas y bases globales recortables.",
        jurisdictionSources: (n) => `${n} ${n === 1 ? "fuente nacional específica" : "fuentes nacionales específicas"}`,
        plusBasinAndGlobal: (pan, glob) => `+ ${pan} fuentes de Panamazonía y ${glob} Globales recortables aplicables al territorio`,
        domainBreakdown: "Distribución por área de conocimiento",
        primaryInstitutions: "Principales instituciones y proveedores indexados",
        basinContourLabel: "Límite de la cuenca / Panamazonía"
      },
      matrixLabels: {
        eyebrow: "Arquitectura de observación socioambiental",
        title: "Matriz Escala × Tiempo",
        subtitle: "Cruce entre la frecuencia temporal de actualización y el modo de observación de las fuentes visibles. Las celdas vacías revelan vacíos de observación en el recorte actual.",
        axisCorner: "Cadencia \\ Modo",
        coverageStat: (filled, total, count) => `${count} ${count === 1 ? "fuente trazada" : "fuentes trazadas"} · ${filled} de ${total} celdas Escala × Tiempo cubiertas (${total - filled} vacíos en este recorte)`,
        emptyCell: "Sin fuente en esta intersección",
        switchBackToCards: "Volver a la cuadrícula de tarjetas",
        rows: [
          { key: "near-real-time", label: "Tiempo casi real y alertas", sub: "Diario / semanal / orbital" },
          { key: "annual", label: "Series anuales", sub: "Consolidación anual" },
          { key: "historical-series", label: "Series históricas", sub: "Multidecadal / continua" },
          { key: "periodic-census", label: "Censos y encuestas periódicas", sub: "Decenal / periódico" },
          { key: "current-reference", label: "Referencia catastral vigente", sub: "Límites y registros actuales" }
        ],
        cols: [
          { key: "remote-sensing", keys: ["remote-sensing"], label: "Satélite y teledetección" },
          { key: "field-monitoring", keys: ["field-monitoring"], label: "Estaciones y parcelas de campo" },
          { key: "territorial-boundary", keys: ["territorial-boundary"], label: "Límites territoriales y tenencia" },
          { key: "census-survey", keys: ["census-survey"], label: "Censos e indicadores" },
          { key: "registry-archive", keys: ["administrative-registry", "document-archive"], label: "Registros públicos y archivos" }
        ]
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
    sourceSetLabels,
    blueprintLabels,
    mapLabels,
    matrixLabels
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
    view: "cards",
    selectedIds: [],
    visibleLimit: CATALOG_PAGE_SIZE
  };

  const domainNav = document.getElementById("domain-nav");
  const coverageStrip = document.getElementById("coverage-strip");
  const researchBlueprint = document.getElementById("research-blueprint");
  const viewToggle = document.getElementById("view-toggle");
  const observatoryMatrix = document.getElementById("observatory-matrix");
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
  const downloadSourceSetBibtexButton = document.getElementById("download-source-set-bibtex");
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
  const validView = new Set(["cards", "matrix"]);
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
  state.view = validParam(initialParams.get("view") || "", validView) || "cards";
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
    if (state.view === "matrix") params.set("view", "matrix");
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

  const MAP_TERRITORIES = Object.freeze([
    {
      key: "Venezuela",
      code: "VE",
      labelX: 264,
      labelY: 78,
      d: "M 154,28 L 235,32 L 325,44 L 356,74 L 332,108 L 308,136 L 268,148 L 252,145 L 246,105 L 192,66 Z"
    },
    {
      key: "Colombia",
      code: "CO",
      labelX: 158,
      labelY: 118,
      d: "M 92,140 L 82,92 L 106,38 L 154,28 L 192,66 L 246,105 L 252,145 L 222,162 L 198,206 L 178,204 L 132,156 Z"
    },
    {
      key: "Ecuador",
      code: "EC",
      labelX: 92,
      labelY: 178,
      d: "M 64,145 L 92,140 L 132,156 L 126,184 L 96,216 L 68,205 L 58,172 Z"
    },
    {
      key: "Peru",
      code: "PE",
      labelX: 145,
      labelY: 274,
      d: "M 68,205 L 96,216 L 126,184 L 132,156 L 178,204 L 198,206 L 188,248 L 222,295 L 226,338 L 196,380 L 142,342 L 88,274 L 52,226 Z"
    },
    {
      key: "Bolivia",
      code: "BO",
      labelX: 298,
      labelY: 354,
      d: "M 222,295 L 266,278 L 324,306 L 372,334 L 388,378 L 342,414 L 254,418 L 226,338 Z"
    },
    {
      key: "Guyana",
      code: "GY",
      labelX: 372,
      labelY: 102,
      d: "M 356,74 L 386,62 L 404,95 L 398,138 L 366,142 L 348,118 L 332,108 Z"
    },
    {
      key: "Suriname",
      code: "SR",
      labelX: 424,
      labelY: 112,
      d: "M 404,95 L 444,88 L 448,128 L 398,138 Z"
    },
    {
      key: "French Guiana",
      code: "GF",
      labelX: 468,
      labelY: 108,
      d: "M 444,88 L 478,94 L 484,126 L 448,128 Z"
    },
    {
      key: "Brazil",
      code: "BR",
      labelX: 398,
      labelY: 234,
      d: "M 484,126 L 524,148 L 588,176 L 596,245 L 552,324 L 468,368 L 388,378 L 372,334 L 324,306 L 266,278 L 222,295 L 188,248 L 198,206 L 222,162 L 252,145 L 268,148 L 308,136 L 332,108 L 348,118 L 366,142 L 398,138 L 448,128 Z"
    }
  ]);

  const renderCoverageStrip = () => {
    if (!coverageStrip) return;
    const counts = new Map();
    for (const cov of validCoverage) counts.set(cov, 0);
    for (const record of catalog) {
      counts.set(record.coverage, (counts.get(record.coverage) || 0) + 1);
    }
    const orderedCoverage = [...validCoverage].sort((a, b) => (counts.get(b) || 0) - (counts.get(a) || 0));
    const pillsMarkup = orderedCoverage.map((cov) => {
      const count = counts.get(cov) || 0;
      const label = coverageLabels[cov] || cov;
      return `<button class="coverage-pill" type="button" data-coverage-pill="${escapeHtml(cov)}" aria-pressed="${state.coverage === cov}"><span>${escapeHtml(label)}</span><span class="coverage-pill-count">${count}</span></button>`;
    }).join("");

    const mapPathsMarkup = MAP_TERRITORIES.map((territory) => {
      const count = counts.get(territory.key) || 0;
      const isSelected = state.coverage === territory.key;
      const density = count >= 15 ? "high" : count >= 6 ? "medium" : "base";
      const label = coverageLabels[territory.key] || territory.key;
      return `
        <g class="map-jurisdiction${isSelected ? " is-selected" : ""}" data-map-territory="${escapeHtml(territory.key)}" data-density="${density}" role="button" tabindex="0" aria-pressed="${isSelected}" aria-label="${escapeHtml(`${label}: ${count}`)}">
          <path class="map-polygon" d="${territory.d}"/>
          <g class="map-badge" transform="translate(${territory.labelX}, ${territory.labelY})">
            <rect x="-24" y="-11" width="48" height="22" rx="6"/>
            <text x="0" y="4" text-anchor="middle">${escapeHtml(territory.code)} · ${count}</text>
          </g>
        </g>`;
    }).join("");

    const panCount = counts.get("Pan-Amazon") || 0;
    const globalCount = counts.get("Global — subsettable") || 0;

    const buildDossierMarkup = (activeGov) => {
      const dossierRecords = activeGov
        ? catalog.filter((record) => record.coverage === activeGov)
        : catalog;
      const isCountrySelected = activeGov && activeGov !== "Pan-Amazon" && activeGov !== "Global — subsettable";
      const domainBreakdownMarkup = categories.map((cat) => {
        const catCount = dossierRecords.filter((r) => r.category === cat.key).length;
        const pct = dossierRecords.length ? Math.round((catCount / dossierRecords.length) * 100) : 0;
        return `
          <div class="dossier-domain-row" data-domain="${escapeHtml(cat.id)}">
            <div class="dossier-domain-label">
              <span class="dossier-domain-dot" data-domain="${escapeHtml(cat.id)}"></span>
              <span>${escapeHtml(cat.label)}</span>
              <strong>${catCount}</strong>
            </div>
            <svg class="dossier-domain-bar" viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true">
              <rect class="bar-track" width="100" height="6" rx="3"/>
              <rect class="bar-fill" width="${pct}" height="6" rx="3"/>
            </svg>
          </div>`;
      }).join("");

      const uniqueProviders = [...new Set(dossierRecords.map((r) => {
        const short = r.provider.match(/\(([A-Z0-9/-]{2,14})\)/)?.[1] || r.provider.split(/[—–/]/)[0].trim();
        return short.length > 34 ? `${short.slice(0, 32)}…` : short;
      }))].slice(0, 7);
      const providerPills = uniqueProviders.map((p) => `<span class="dossier-provider-chip">${escapeHtml(p)}</span>`).join("");

      const dossierTitle = activeGov ? (coverageLabels[activeGov] || activeGov) : mapLabels.basinOverviewTitle;
      const dossierSub = activeGov
        ? `${mapLabels.jurisdictionSources(dossierRecords.length)}${isCountrySelected ? ` · ${mapLabels.plusBasinAndGlobal(panCount, globalCount)}` : ""}`
        : mapLabels.basinOverviewNote;

      return `
        <div class="dossier-header">
          <span class="dossier-badge">${escapeHtml(activeGov ? (coverageLabels[activeGov] || activeGov) : coverageLabels["Pan-Amazon"])}</span>
          <h4>${escapeHtml(dossierTitle)}</h4>
          <p>${escapeHtml(dossierSub)}</p>
        </div>
        <div class="dossier-section">
          <p class="dossier-section-title">${escapeHtml(mapLabels.domainBreakdown)}</p>
          <div class="dossier-domains">${domainBreakdownMarkup}</div>
        </div>
        <div class="dossier-section">
          <p class="dossier-section-title">${escapeHtml(mapLabels.primaryInstitutions)}</p>
          <div class="dossier-providers">${providerPills}</div>
        </div>`;
    };
    coverageStrip._buildDossierMarkup = buildDossierMarkup;

    coverageStrip.innerHTML = `
      <div class="basin-explorer-grid">
        <div class="basin-map-card">
          <div class="basin-map-header">
            <div>
              <p class="eyebrow">${escapeHtml(mapLabels.eyebrow)}</p>
              <h3 class="basin-map-title">${escapeHtml(mapLabels.title)}</h3>
              <p class="basin-map-sub">${escapeHtml(mapLabels.clickMapHint)}</p>
            </div>
            ${state.coverage ? `<button class="text-button" type="button" data-map-territory="">${escapeHtml(mapLabels.clearTerritory)}</button>` : ""}
          </div>
          <div class="basin-svg-wrap">
            <svg class="basin-svg" viewBox="0 0 620 430" role="img" aria-label="${escapeHtml(mapLabels.title)}">
              <g class="map-graticule" aria-hidden="true">
                <line x1="20" y1="158" x2="600" y2="158" class="map-equator"/>
                <line x1="20" y1="283" x2="600" y2="283"/>
                <line x1="210" y1="15" x2="210" y2="420"/>
                <line x1="360" y1="15" x2="360" y2="420"/>
                <line x1="510" y1="15" x2="510" y2="420"/>
                <text x="26" y="152">0° EQ</text>
                <text x="26" y="277">10°S</text>
                <text x="214" y="28">70°W</text>
                <text x="364" y="28">60°W</text>
                <text x="514" y="28">50°W</text>
              </g>
              <g class="map-jurisdictions">
                ${mapPathsMarkup}
              </g>
              <g class="map-rivers" aria-hidden="true">
                <path d="M 98,238 Q 146,214 205,204 T 330,192 T 445,174 L 512,152" class="river-mainstem"/>
                <path d="M 225,134 Q 275,162 330,192" class="river-tributary"/>
                <path d="M 278,334 Q 312,268 352,202" class="river-tributary"/>
                <path d="M 164,312 Q 178,256 205,204" class="river-tributary"/>
                <path d="M 392,310 Q 402,245 412,184" class="river-tributary"/>
                <path d="M 442,316 Q 446,248 452,178" class="river-tributary"/>
              </g>
              <path class="map-basin-contour${state.coverage === "Pan-Amazon" ? " is-selected" : ""}" d="M 96,152 C 118,86 196,48 286,46 C 368,44 446,72 494,122 C 538,168 548,236 502,296 C 454,352 372,368 294,362 C 218,356 154,316 116,258 C 86,214 82,182 96,152 Z" aria-hidden="true"/>
            </svg>
            <div class="basin-map-legend">
              <button type="button" class="basin-contour-toggle${state.coverage === "Pan-Amazon" ? " is-active" : ""}" data-map-territory="Pan-Amazon">
                <span class="contour-swatch" aria-hidden="true"></span>
                <span>${escapeHtml(mapLabels.basinContourLabel)} (${panCount})</span>
              </button>
              <button type="button" class="basin-contour-toggle${state.coverage === "Global — subsettable" ? " is-active" : ""}" data-map-territory="Global — subsettable">
                <span>${escapeHtml(coverageLabels["Global — subsettable"])} (${globalCount})</span>
              </button>
            </div>
          </div>
        </div>
        <div class="basin-dossier-card" data-dossier-card>
          ${buildDossierMarkup(state.coverage)}
        </div>
      </div>
      <div class="coverage-pills-row">
        ${pillsMarkup}
      </div>`;
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

  const escapeBibtex = (value) => String(value ?? "").replaceAll("\\", "\\\\").replaceAll("{", "\\{").replaceAll("}", "\\}");
  const exportRecordsBibtex = (records, filename = ui.bibtexFilename) => {
    if (!records.length) return;
    const exportedDate = new Date().toISOString().slice(0, 10);
    const setUrl = sourceSetUrl();
    const indexEntry = [
      "@misc{amazoniadb_source_set,",
      "  title = {{AmazoniaDB — Curated Source Set}},",
      "  author = {{AmazoniaDB}},",
      `  year = {${exportedDate.slice(0, 4)}},`,
      `  url = {${escapeBibtex(setUrl)}},`,
      `  note = {Exported ${exportedDate}; ${records.length} curated socioenvironmental sources indexed at their original providers.}`,
      "}"
    ].join("\n");
    const recordEntries = records.map((record) => {
      const citeKey = record.id.replace(/[^a-zA-Z0-9_-]/g, "_");
      const year = (record.checked || exportedDate).slice(0, 4);
      const temporal = temporalCoverageLabels[record.id] || record.temporalCoverage || "";
      const spatial = spatialResolutionLabels[record.id] || spatialResolutionLabels[record.spatialResolution] || record.spatialResolution || "";
      const noteParts = [
        `Coverage: ${coverageLabels[record.coverage] || record.coverage}`,
        temporal ? `Timeframe: ${temporal}` : "",
        spatial ? `Spatial resolution: ${spatial}` : "",
        `Access: ${accessLabels[record.access] || record.access} (${record.accessUrl})`,
        record.methodologyUrl ? `Documentation: ${record.methodologyUrl}` : "",
        `Link reviewed by AmazoniaDB on ${record.checked}`,
        record.responsibleUse?.note ? `Responsible use: ${localized(record.responsibleUse.note)}` : ""
      ].filter(Boolean).join(". ");
      return [
        `@misc{${citeKey},`,
        `  title = {{${escapeBibtex(record.title)}}},`,
        `  author = {{${escapeBibtex(record.provider)}}},`,
        `  year = {${year}},`,
        `  url = {${escapeBibtex(record.url)}},`,
        `  howpublished = {${escapeBibtex(kindLabels[record.kind] || record.kind)}},`,
        `  note = {${escapeBibtex(noteParts)}}`,
        "}"
      ].join("\n");
    });
    const bibtex = `${[indexEntry, ...recordEntries].join("\n\n")}\n`;
    const blob = new Blob([bibtex], { type: "application/x-bibtex;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(href), 0);
  };
  const downloadSourceSetBibtex = () => exportRecordsBibtex(getSelectedRecords(), ui.bibtexFilename);

  const renderResearchStarter = () => {
    if (!researchPathChoice || !researchPathButton) return;
    const activePath = researchPaths[starterPathIndex] || researchPaths[0];
    if (!activePath) {
      researchPathChoice.disabled = true;
      researchPathButton.disabled = true;
      nextResearchPathButton?.setAttribute("hidden", "");
      if (researchBlueprint) researchBlueprint.innerHTML = "";
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

    if (researchBlueprint) {
      const tabsMarkup = researchPaths.map((path, index) => {
        const summaryText = localized(path.locales?.selectorSummary) || "";
        const scopeBadge = summaryText.split(" · ")[0] || "";
        const shortTitle = localized(path.locales?.shortTitle) || localized(path.locales?.title);
        const isCurrent = index === starterPathIndex;
        return `
          <button type="button" class="blueprint-tab" data-blueprint-index="${index}" aria-pressed="${isCurrent}">
            <span class="blueprint-tab-meta"><span>${escapeHtml(scopeBadge)}</span><span>${escapeHtml(blueprintLabels.sourcesCount(path.records.length))}</span></span>
            <strong>${escapeHtml(shortTitle)}</strong>
          </button>`;
      }).join("");

      const stepsMarkup = activePath.records.map((entry, idx) => {
        const record = catalog.find((r) => r.id === entry.id);
        if (!record) return "";
        const stepNum = String(idx + 1).padStart(2, "0");
        const resVal = record.spatialResolution ? compactFactValue(spatialResolutionLabels[record.id] || spatialResolutionLabels[record.spatialResolution] || record.spatialResolution, 28) : "";
        const timeVal = record.temporalCoverage ? compactFactValue(temporalCoverageLabels[record.id] || record.temporalCoverage, 28) : "";
        const covVal = coverageLabels[record.coverage] || record.coverage;
        return `
          <div class="blueprint-step">
            <div class="blueprint-step-top">
              <span class="blueprint-step-num">${stepNum}</span>
              <span class="blueprint-step-role">${escapeHtml(localized(entry.role))}</span>
            </div>
            <button type="button" class="blueprint-step-title" data-focus-source="${escapeHtml(record.id)}">${escapeHtml(record.title)} ↗</button>
            <p class="blueprint-step-provider">${escapeHtml(record.provider)}</p>
            <p class="blueprint-step-reason">${escapeHtml(localized(entry.reason))}</p>
            <div class="blueprint-step-badges">
              ${resVal ? `<span>${escapeHtml(resVal)}</span>` : ""}
              ${timeVal ? `<span>${escapeHtml(timeVal)}</span>` : ""}
              <span>${escapeHtml(covVal)}</span>
            </div>
          </div>`;
      }).join("");

      const comp = activePath.locales?.comparability;
      const compCards = Array.isArray(comp?.points)
        ? comp.points.map((point, idx) => `
          <div class="rosetta-point">
            <span class="rosetta-point-num">0${idx + 1}</span>
            <p>${escapeHtml(localized(point))}</p>
          </div>`).join("")
        : "";
      const compSynthesis = comp?.synthesis ? localized(comp.synthesis) : "";

      researchBlueprint.innerHTML = `
        <div class="blueprint-tabs" role="group" aria-label="${escapeHtml(blueprintLabels.tabGroupLabel)}">
          ${tabsMarkup}
        </div>
        <div class="blueprint-stage">
          <div class="blueprint-stage-header">
            <div>
              <p class="eyebrow">${escapeHtml(blueprintLabels.pipelineHeading)}</p>
              <h3>${escapeHtml(localized(activePath.locales?.title))}</h3>
              <p>${escapeHtml(localized(activePath.locales?.selectorSummary) || localized(activePath.locales?.summary))}</p>
            </div>
            <div class="blueprint-stage-actions">
              <button type="button" class="button button-primary" data-open-blueprint="${escapeHtml(activePath.id)}">${escapeHtml(blueprintLabels.openInDirectory)}</button>
              <button type="button" class="button button-secondary" data-stage-blueprint="${escapeHtml(activePath.id)}">${escapeHtml(blueprintLabels.stagePathSources)}</button>
              <button type="button" class="button button-secondary" data-bibtex-blueprint="${escapeHtml(activePath.id)}">${escapeHtml(blueprintLabels.downloadPathBibtex)}</button>
            </div>
          </div>
          <div class="blueprint-pipeline">
            ${stepsMarkup}
          </div>
          <div class="blueprint-rosetta">
            <div class="rosetta-header">
              <p class="eyebrow">${escapeHtml(blueprintLabels.rosettaHeading)}</p>
            </div>
            <div class="rosetta-grid">
              ${compCards}
            </div>
            ${compSynthesis ? `<div class="rosetta-synthesis"><strong>${escapeHtml(blueprintLabels.synthesisLabel)}:</strong> <span>${escapeHtml(compSynthesis)}</span></div>` : ""}
          </div>
        </div>`;
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

  const categoryDomainId = Object.fromEntries(categories.map((c) => [c.key, c.id]));

  const renderObservatoryMatrix = (allRecords) => {
    if (!observatoryMatrix) return;
    const isMatrix = state.view === "matrix";
    observatoryMatrix.hidden = !isMatrix;
    grid.hidden = isMatrix;
    if (viewToggle) {
      viewToggle.querySelectorAll?.("button[data-view-mode]")?.forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn.dataset.viewMode === state.view));
      });
    }
    if (!isMatrix) return;

    const totalCells = matrixLabels.rows.length * matrixLabels.cols.length;
    let filledCells = 0;

    const colHeaders = matrixLabels.cols.map((col) => `<th scope="col">${escapeHtml(col.label)}</th>`).join("");
    const bodyRows = matrixLabels.rows.map((row) => {
      const cells = matrixLabels.cols.map((col) => {
        const cellRecords = allRecords.filter((record) =>
          record.tags?.time?.includes(row.key)
          && col.keys.some((k) => record.tags?.modes?.includes(k))
        );
        if (cellRecords.length > 0) filledCells += 1;
        if (!cellRecords.length) {
          return `<td class="matrix-cell is-empty"><span class="matrix-empty-label">${escapeHtml(matrixLabels.emptyCell)}</span></td>`;
        }
        const chips = cellRecords.map((record) => {
          const domId = categoryDomainId[record.category] || "life";
          const resShort = record.spatialResolution
            ? compactFactValue(spatialResolutionLabels[record.id] || spatialResolutionLabels[record.spatialResolution] || record.spatialResolution, 18)
            : "";
          return `
            <button type="button" class="matrix-chip" data-domain="${escapeHtml(domId)}" data-matrix-source="${escapeHtml(record.id)}" title="${escapeHtml(`${record.title} — ${record.provider}`)}">
              <span class="matrix-chip-dot" data-domain="${escapeHtml(domId)}"></span>
              <span class="matrix-chip-title">${escapeHtml(record.title)}</span>
              ${resShort ? `<span class="matrix-chip-res">${escapeHtml(resShort)}</span>` : ""}
            </button>`;
        }).join("");
        return `<td class="matrix-cell"><div class="matrix-cell-items">${chips}</div></td>`;
      }).join("");
      return `
        <tr>
          <th scope="row">
            <strong>${escapeHtml(row.label)}</strong>
            <span>${escapeHtml(row.sub)}</span>
          </th>
          ${cells}
        </tr>`;
    }).join("");

    const legendItems = categories.map((cat) => `
      <span class="matrix-legend-item">
        <span class="dossier-domain-dot" data-domain="${escapeHtml(cat.id)}"></span>
        <span>${escapeHtml(cat.label)}</span>
      </span>`).join("");

    observatoryMatrix.innerHTML = `
      <div class="matrix-header">
        <div>
          <p class="eyebrow">${escapeHtml(matrixLabels.eyebrow)}</p>
          <h3>${escapeHtml(matrixLabels.title)}</h3>
          <p class="matrix-subtitle">${escapeHtml(matrixLabels.subtitle)}</p>
          <p class="matrix-stat">${escapeHtml(matrixLabels.coverageStat(filledCells, totalCells, allRecords.length))}</p>
        </div>
        <button type="button" class="button button-secondary" data-view-mode="cards">${escapeHtml(matrixLabels.switchBackToCards)}</button>
      </div>
      <div class="matrix-legend">${legendItems}</div>
      <div class="matrix-scroll">
        <table class="matrix-table">
          <thead>
            <tr>
              <th scope="col" class="matrix-corner">${escapeHtml(matrixLabels.axisCorner)}</th>
              ${colHeaders}
            </tr>
          </thead>
          <tbody>
            ${bodyRows}
          </tbody>
        </table>
      </div>`;
  };

  const renderCatalog = () => {
    const activePath = getActivePath();
    const allRecords = getVisibleRecords();
    const isUnfiltered = !activePath && !state.category && !state.search.trim() && !state.coverage && !state.topic && !state.role && !state.access && !state.mode && !state.time && !state.sort && !state.source;
    const records = isUnfiltered ? allRecords.slice(0, state.visibleLimit) : allRecords;
    resultCount.textContent = isUnfiltered && records.length < allRecords.length && state.view !== "matrix"
      ? ui.resultCountPartial(records.length, allRecords.length)
      : ui.resultCountTotal(allRecords.length);
    emptyState.hidden = allRecords.length !== 0;
    if (!allRecords.length) {
      emptyState.textContent = ["Colombia", "Bolivia", "Ecuador", "Venezuela", "Guyana", "Suriname", "French Guiana"].includes(state.coverage) ? sourceSetLabels.emptyCountry : sourceSetLabels.emptyDefault;
    }
    if (showMorePanel && showMoreButton) {
      const remaining = allRecords.length - records.length;
      showMorePanel.hidden = state.view === "matrix" || remaining <= 0;
      showMoreButton.textContent = ui.showMoreText(Math.min(CATALOG_PAGE_SIZE, remaining));
    }
    renderCoverageStrip();
    renderActiveFilters();
    renderObservatoryMatrix(allRecords);
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
    const comp = copy.comparability;
    const compPoints = Array.isArray(comp?.points)
      ? comp.points.map((point) => `<li>${escapeHtml(localized(point))}</li>`).join("")
      : "";
    const compSynthesis = comp?.synthesis ? `<p class="research-comparability-synthesis">${escapeHtml(localized(comp.synthesis))}</p>` : "";
    const compMarkup = compPoints
      ? `<details class="research-comparability" open><summary>${escapeHtml(researchLabels.comparabilitySummary)}</summary><div class="research-comparability-body"><ul>${compPoints}</ul>${compSynthesis}</div></details>`
      : "";
    researchPathPanel.setAttribute("aria-label", researchLabels.heading);
    researchPathPanel.innerHTML = `
      <div>
        <p class="eyebrow">${escapeHtml(researchLabels.heading)}</p>
        <h3>${escapeHtml(localized(copy.title))}</h3>
        <p>${escapeHtml(localized(copy.summary))}</p>
        <p class="research-caution">${escapeHtml(localized(copy.caution))}</p>
        ${compMarkup}
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
    const pillButton = event.target.closest("button[data-coverage-pill]");
    const mapTarget = event.target.closest("[data-map-territory]");
    if (!pillButton && !mapTarget) return;
    const cov = pillButton ? pillButton.dataset.coveragePill : mapTarget.dataset.mapTerritory;
    state.coverage = cov && state.coverage === cov ? "" : cov;
    coverage.value = state.coverage;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    syncUrl();
  });

  coverageStrip?.addEventListener("mouseover", (event) => {
    const mapTarget = event.target.closest?.(".map-jurisdiction[data-map-territory]");
    if (!mapTarget || !coverageStrip._buildDossierMarkup) return;
    const dossierEl = coverageStrip.querySelector?.("[data-dossier-card]");
    if (dossierEl) dossierEl.innerHTML = coverageStrip._buildDossierMarkup(mapTarget.dataset.mapTerritory);
  });

  coverageStrip?.addEventListener("mouseleave", () => {
    if (!coverageStrip._buildDossierMarkup) return;
    const dossierEl = coverageStrip.querySelector?.("[data-dossier-card]");
    if (dossierEl) dossierEl.innerHTML = coverageStrip._buildDossierMarkup(state.coverage);
  });

  coverageStrip?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const mapTarget = event.target.closest(".map-jurisdiction[data-map-territory]");
    if (!mapTarget) return;
    event.preventDefault();
    const cov = mapTarget.dataset.mapTerritory;
    state.coverage = cov && state.coverage === cov ? "" : cov;
    coverage.value = state.coverage;
    state.source = "";
    state.path = "";
    renderCatalog();
    renderResearchPath();
    renderDiscovery();
    updateDiscoverControl();
    syncUrl();
  });

  researchBlueprint?.addEventListener("click", (event) => {
    const tabBtn = event.target.closest("button[data-blueprint-index]");
    if (tabBtn) {
      starterPathIndex = Number(tabBtn.dataset.blueprintIndex) || 0;
      renderResearchStarter();
      return;
    }
    const openBtn = event.target.closest("button[data-open-blueprint]");
    if (openBtn) {
      openResearchPath(openBtn.dataset.openBlueprint);
      return;
    }
    const stageBtn = event.target.closest("button[data-stage-blueprint]");
    if (stageBtn) {
      const pathObj = pathsById.get(stageBtn.dataset.stageBlueprint);
      if (!pathObj) return;
      const missingIds = pathObj.records.map((entry) => entry.id).filter((id) => !state.selectedIds.includes(id));
      const addedIds = missingIds.slice(0, Math.max(0, SOURCE_SET_LIMIT - state.selectedIds.length));
      state.selectedIds = [...state.selectedIds, ...addedIds];
      renderCatalog();
      renderSourceSet();
      syncUrl();
      sourceSetPanel?.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
      return;
    }
    const bibtexBtn = event.target.closest("button[data-bibtex-blueprint]");
    if (bibtexBtn) {
      const pathObj = pathsById.get(bibtexBtn.dataset.bibtexBlueprint);
      if (!pathObj) return;
      const pathRecords = pathObj.records.map((e) => catalog.find((r) => r.id === e.id)).filter(Boolean);
      exportRecordsBibtex(pathRecords, `amazoniadb-${pathObj.id}.bib`);
      return;
    }
    const focusSourceBtn = event.target.closest("button[data-focus-source]");
    if (focusSourceBtn) {
      const id = focusSourceBtn.dataset.focusSource;
      state.source = id;
      state.view = "cards";
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
      const card = grid.querySelector(`[data-record-id="${id}"]`);
      (card || document.getElementById("catalog"))?.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
    }
  });

  const setViewMode = (nextView) => {
    state.view = nextView === "matrix" ? "matrix" : "cards";
    renderCatalog();
    syncUrl();
  };

  viewToggle?.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-view-mode]");
    if (!btn) return;
    setViewMode(btn.dataset.viewMode);
  });

  document.querySelector("[data-open-matrix-hero]")?.addEventListener("click", (event) => {
    event.preventDefault();
    setViewMode("matrix");
    document.getElementById("catalog")?.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  });

  observatoryMatrix?.addEventListener("click", (event) => {
    const modeBtn = event.target.closest("button[data-view-mode]");
    if (modeBtn) {
      setViewMode(modeBtn.dataset.viewMode);
      return;
    }
    const chipBtn = event.target.closest("button[data-matrix-source]");
    if (chipBtn) {
      const id = chipBtn.dataset.matrixSource;
      state.source = id;
      state.view = "cards";
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
      const card = grid.querySelector(`[data-record-id="${id}"]`);
      card?.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
    }
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
  downloadSourceSetBibtexButton?.addEventListener("click", downloadSourceSetBibtex);

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
  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }
})();
