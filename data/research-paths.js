// Human-reviewed starting sets for specific research questions. A path
// recommends complementary sources; it never produces a finding, makes an
// automated spatial overlay, or infers effects on people or territories.
(() => {
  const copy = (en, ptBR, es) => Object.freeze({ en, "pt-BR": ptBR, es });

  window.AMAZONIA_RESEARCH_PATHS = Object.freeze([
    Object.freeze({
      id: "forest-change-territory-brazil",
      locales: Object.freeze({
        shortTitle: copy(
          "Forest & territory",
          "Floresta e território",
          "Bosque y territorio"
        ),
        selectorSummary: copy(
          "Brazil · 4 sources on territory boundaries, land cover, forest loss and fire.",
          "Brasil · 4 fontes sobre limites territoriais, cobertura da terra, perda florestal e fogo.",
          "Brasil · 4 fuentes sobre límites territoriales, cobertura del suelo, pérdida forestal y fuego."
        ),
        title: copy(
          "Explore forest change around a territory in Brazil",
          "Explore a transformação florestal no entorno de um território no Brasil",
          "Explora el cambio forestal alrededor de un territorio en Brasil"
        ),
        summary: copy(
          "A starting set of four public sources, chosen for complementary roles.",
          "Um conjunto inicial de quatro fontes públicas, escolhido por funções complementares.",
          "Un conjunto inicial de cuatro fuentes públicas, elegido por funciones complementarias."
        ),
        caution: copy(
          "This is a starting set, not a finding or an automatic analysis. Check methods, dates, terms and local knowledge before drawing conclusions. Public territory data is not blanket permission to make claims about people or places.",
          "Este é um ponto de partida, não um resultado ou uma análise automática. Verifique métodos, datas, termos e conhecimento local antes de tirar conclusões. Dados territoriais públicos não são autorização geral para fazer afirmações sobre pessoas ou territórios.",
          "Este es un punto de partida, no un resultado ni un análisis automático. Verifica métodos, fechas, términos y conocimiento local antes de sacar conclusiones. Los datos territoriales públicos no son una autorización general para hacer afirmaciones sobre personas o territorios."
        )
      }),
      records: Object.freeze([
        Object.freeze({
          id: "funai-terras-indigenas",
          role: copy("Published boundary", "Limite publicado", "Límite publicado"),
          reason: copy(
            "Locate a published Indigenous Territory boundary. It does not replace community-led territorial knowledge.",
            "Localize um limite publicado de Terra Indígena. Ele não substitui o conhecimento territorial produzido e conduzido pelas comunidades.",
            "Ubica un límite publicado de Tierra Indígena. No sustituye el conocimiento territorial producido y dirigido por las comunidades."
          )
        }),
        Object.freeze({
          id: "mapbiomas-brasil",
          role: copy("Land-cover context", "Contexto de cobertura da terra", "Contexto de cobertura del suelo"),
          reason: copy(
            "Add annual land-cover context from 1985 onward.",
            "Acrescente contexto anual de cobertura da terra desde 1985.",
            "Añade contexto anual de cobertura del suelo desde 1985."
          )
        }),
        Object.freeze({
          id: "inpe-terrabrasilis",
          role: copy("Forest loss and alerts", "Perda florestal e alertas", "Pérdida forestal y alertas"),
          reason: copy(
            "Compare official annual forest-loss mapping and alerts.",
            "Compare mapeamentos oficiais anuais de perda florestal e alertas.",
            "Compara mapas oficiales anuales de pérdida forestal y alertas."
          )
        }),
        Object.freeze({
          id: "inpe-bdqueimadas",
          role: copy("Fire context", "Contexto de fogo", "Contexto de fuego"),
          reason: copy(
            "Add reported fire activity as context for periods of burning.",
            "Acrescente atividade de fogo reportada para contextualizar períodos de queimada.",
            "Añade actividad de fuego reportada para contextualizar períodos de quema."
          )
        })
      ])
    }),
    Object.freeze({
      id: "water-basin-brazil",
      locales: Object.freeze({
        shortTitle: copy(
          "Rivers & rainfall by basin",
          "Rios e chuva por bacia",
          "Ríos y lluvia por cuenca"
        ),
        selectorSummary: copy(
          "Brazil · 3 sources on rivers, rainfall, weather stations and land cover.",
          "Brasil · 3 fontes sobre rios, chuva, estações meteorológicas e cobertura da terra.",
          "Brasil · 3 fuentes sobre ríos, lluvia, estaciones meteorológicas y cobertura del suelo."
        ),
        title: copy(
          "Explore river and rainfall conditions in a basin in Brazil",
          "Explore as condições de rios e chuva em uma bacia no Brasil",
          "Explora las condiciones de ríos y lluvia en una cuenca de Brasil"
        ),
        summary: copy(
          "A starting set of three public sources for station observations and land-cover context.",
          "Um conjunto inicial de três fontes públicas para observações em estações e contexto de cobertura da terra.",
          "Un conjunto inicial de tres fuentes públicas para observaciones de estaciones y contexto de cobertura del suelo."
        ),
        caution: copy(
          "Station records describe where and when instruments operated. Do not treat gaps as conditions across an entire basin; check methods, dates, terms and local knowledge before drawing conclusions.",
          "Registros de estações descrevem onde e quando os instrumentos operaram. Não trate lacunas como condições de toda uma bacia; verifique métodos, datas, termos e conhecimento local antes de tirar conclusões.",
          "Los registros de estaciones describen dónde y cuándo funcionaron los instrumentos. No trates las lagunas como condiciones de toda una cuenca; verifica métodos, fechas, términos y conocimiento local antes de sacar conclusiones."
        )
      }),
      records: Object.freeze([
        Object.freeze({
          id: "ana-hidroweb",
          role: copy("River gauges", "Estações hidrológicas", "Estaciones hidrológicas"),
          reason: copy(
            "Start with reported river level, discharge, rainfall and water-quality observations from station gauges.",
            "Comece por observações reportadas de nível, vazão, chuva e qualidade da água em estações.",
            "Empieza con observaciones reportadas de nivel, caudal, lluvia y calidad del agua en estaciones."
          )
        }),
        Object.freeze({
          id: "inmet-bdmep",
          role: copy("Weather stations", "Estações meteorológicas", "Estaciones meteorológicas"),
          reason: copy(
            "Add daily rainfall and weather observations from nearby stations.",
            "Acrescente observações diárias de chuva e tempo de estações próximas.",
            "Añade observaciones diarias de lluvia y tiempo de estaciones cercanas."
          )
        }),
        Object.freeze({
          id: "mapbiomas-brasil",
          role: copy("Land-cover context", "Contexto de cobertura da terra", "Contexto de cobertura del suelo"),
          reason: copy(
            "Add annual land-cover context without assuming it explains a hydrological change.",
            "Acrescente contexto anual de cobertura da terra sem supor que ele explica uma mudança hidrológica.",
            "Añade contexto anual de cobertura del suelo sin suponer que explica un cambio hidrológico."
          )
        })
      ])
    }),
    Object.freeze({
      id: "biodiversity-records-brazil",
      locales: Object.freeze({
        shortTitle: copy(
          "Biodiversity by region",
          "Biodiversidade por região",
          "Biodiversidad por región"
        ),
        selectorSummary: copy(
          "Brazil · 3 sources on species records, research networks and protected areas.",
          "Brasil · 3 fontes sobre registros de espécies, redes de pesquisa e áreas protegidas.",
          "Brasil · 3 fuentes sobre registros de especies, redes de investigación y áreas protegidas."
        ),
        title: copy(
          "Explore biodiversity records available for a region in Brazil",
          "Explore registros de biodiversidade disponíveis para uma região no Brasil",
          "Explora los registros de biodiversidad disponibles para una región de Brasil"
        ),
        summary: copy(
          "A starting set of three public sources for records, research-network context and protected-area context.",
          "Um conjunto inicial de três fontes públicas para registros, contexto de redes de pesquisa e contexto de áreas protegidas.",
          "Un conjunto inicial de tres fuentes públicas para registros, contexto de redes de investigación y contexto de áreas protegidas."
        ),
        caution: copy(
          "Available records are not a complete account of life in a place. Respect location precision, licenses and collection context; never turn public records into directions to sensitive species or sites.",
          "Registros disponíveis não são uma descrição completa da vida em um lugar. Respeite a precisão da localização, as licenças e o contexto de coleta; nunca transforme registros públicos em instruções para encontrar espécies ou locais sensíveis.",
          "Los registros disponibles no son una descripción completa de la vida en un lugar. Respeta la precisión de ubicación, las licencias y el contexto de recolección; nunca conviertas registros públicos en indicaciones para encontrar especies o sitios sensibles."
        )
      }),
      records: Object.freeze([
        Object.freeze({
          id: "specieslink-network",
          role: copy("Occurrence records", "Registros de ocorrência", "Registros de ocurrencia"),
          reason: copy(
            "Locate Brazilian occurrence records and inspect the collection and record-level context.",
            "Localize registros brasileiros de ocorrência e examine o contexto da coleção e de cada registro.",
            "Ubica registros brasileños de ocurrencia y examina el contexto de la colección y de cada registro."
          )
        }),
        Object.freeze({
          id: "ppbio-brazil-biodiversity-research",
          role: copy("Research-network context", "Contexto de rede de pesquisa", "Contexto de red de investigación"),
          reason: copy(
            "Add the context of long-term, standardized biodiversity monitoring sites.",
            "Acrescente o contexto de sítios de monitoramento de biodiversidade de longo prazo e padronizados.",
            "Añade el contexto de sitios estandarizados de monitoreo de biodiversidad a largo plazo."
          )
        }),
        Object.freeze({
          id: "cnuc-unidades-conservacao",
          role: copy("Protected-area context", "Contexto de área protegida", "Contexto de área protegida"),
          reason: copy(
            "Use published conservation-unit boundaries as context, not as a claim about ecological conditions.",
            "Use limites publicados de unidades de conservação como contexto, não como uma afirmação sobre condições ecológicas.",
            "Usa límites publicados de unidades de conservación como contexto, no como una afirmación sobre condiciones ecológicas."
          )
        })
      ])
    }),
    Object.freeze({
      id: "environmental-pressure-municipality-brazil",
      locales: Object.freeze({
        shortTitle: copy(
          "Municipal environmental pressure",
          "Pressão ambiental municipal",
          "Presión ambiental municipal"
        ),
        selectorSummary: copy(
          "Brazil · 4 sources on forest monitoring, fire, enforcement and municipal indicators.",
          "Brasil · 4 fontes sobre monitoramento florestal, fogo, fiscalização e indicadores municipais.",
          "Brasil · 4 fuentes sobre monitoreo forestal, fuego, fiscalización e indicadores municipales."
        ),
        title: copy(
          "Explore public environmental-pressure records for a municipality in Brazil",
          "Explore registros públicos de pressões ambientais em um município no Brasil",
          "Explora registros públicos de presiones ambientales en un municipio de Brasil"
        ),
        summary: copy(
          "A starting set of four public sources for reported monitoring, fire, enforcement and municipal context.",
          "Um conjunto inicial de quatro fontes públicas para monitoramento reportado, fogo, fiscalização e contexto municipal.",
          "Un conjunto inicial de cuatro fuentes públicas para monitoreo reportado, fuego, fiscalización y contexto municipal."
        ),
        caution: copy(
          "Public records can be incomplete and reflect reporting or enforcement practices. They are not proof of responsibility or a complete map of harm; check methods, dates, terms and local context before making claims.",
          "Registros públicos podem ser incompletos e refletir práticas de reporte ou fiscalização. Eles não são prova de responsabilidade nem um mapa completo de danos; verifique métodos, datas, termos e contexto local antes de fazer afirmações.",
          "Los registros públicos pueden ser incompletos y reflejar prácticas de reporte o fiscalización. No son prueba de responsabilidad ni un mapa completo de daños; verifica métodos, fechas, términos y contexto local antes de hacer afirmaciones."
        )
      }),
      records: Object.freeze([
        Object.freeze({
          id: "inpe-terrabrasilis",
          role: copy("Forest monitoring", "Monitoramento florestal", "Monitoreo forestal"),
          reason: copy(
            "Compare official annual forest-loss mapping and alerts.",
            "Compare mapeamentos oficiais anuais de perda florestal e alertas.",
            "Compara mapas oficiales anuales de pérdida forestal y alertas."
          )
        }),
        Object.freeze({
          id: "inpe-bdqueimadas",
          role: copy("Fire context", "Contexto de fogo", "Contexto de fuego"),
          reason: copy(
            "Add reported fire activity as context for periods of burning.",
            "Acrescente atividade de fogo reportada para contextualizar períodos de queimada.",
            "Añade actividad de fuego reportada para contextualizar períodos de quema."
          )
        }),
        Object.freeze({
          id: "ibama-fiscalizacao-dados-abertos",
          role: copy("Environmental enforcement", "Fiscalização ambiental", "Fiscalización ambiental"),
          reason: copy(
            "Review published federal enforcement records and their administrative limits.",
            "Examine registros publicados de fiscalização federal e seus limites administrativos.",
            "Revisa registros publicados de fiscalización federal y sus límites administrativos."
          )
        }),
        Object.freeze({
          id: "ibge-cidades",
          role: copy("Municipal context", "Contexto municipal", "Contexto municipal"),
          reason: copy(
            "Add official municipal indicators as context without inferring cause or responsibility.",
            "Acrescente indicadores municipais oficiais como contexto, sem inferir causa ou responsabilidade.",
            "Añade indicadores municipales oficiales como contexto, sin inferir causa o responsabilidad."
          )
        })
      ])
    }),
    Object.freeze({
      id: "pan-amazon-forest-mining-pressures",
      locales: Object.freeze({
        shortTitle: copy(
          "Pan-Amazon forest & pressures",
          "Floresta e pressões pan-amazônicas",
          "Bosque y presiones panamazónicas"
        ),
        selectorSummary: copy(
          "Pan-Amazon · 4 sources on regional territories, land cover, mining scars and active fire.",
          "Pan-Amazônia · 4 fontes sobre territórios regionais, cobertura do solo, cicatrizes de garimpo e fogo ativo.",
          "Panamazonía · 4 fuentes sobre territorios regionales, cobertura del suelo, cicatrices mineras y fuego activo."
        ),
        title: copy(
          "Explore cross-border forest change and extractive pressures across the Amazon",
          "Explore transformação florestal e pressões extrativas transfronteiriças na Amazônia",
          "Explora cambio forestal y presiones extractivas transfronterizas en la Amazonía"
        ),
        summary: copy(
          "A starting set of four basin-wide sources combining harmonized territorial maps, annual land cover, mining-scar detections and active-fire monitoring.",
          "Um conjunto inicial de quatro fontes de escala regional combinando mapas territoriais harmonizados, cobertura anual do solo, detecções de cicatrizes de garimpo e monitoramento de fogo ativo.",
          "Un conjunto inicial de cuatro fuentes a escala de cuenca que combinan mapas territoriales armonizados, cobertura anual del suelo, detecciones de cicatrices mineras y monitoreo de fuego activo."
        ),
        caution: copy(
          "Cross-border layers harmonize national sources with different legal regimes, update dates and detection thresholds. Remote-sensing detections and mapped boundaries are context, not proof of legality, ownership or community consent.",
          "Camadas transfronteiriças harmonizam fontes nacionais com diferentes regimes jurídicos, datas de atualização e limiares de detecção. Detecções por satélite e limites mapeados oferecem contexto, não prova de legalidade, posse ou consentimento comunitário.",
          "Las capas transfronterizas armonizan fuentes nacionales con distintos regímenes jurídicos, fechas de actualización y umbrales de detección. Las detecciones satelitales y los límites cartografiados aportan contexto, no prueba de legalidad, propiedad ni consentimiento comunitario."
        )
      }),
      records: Object.freeze([
        Object.freeze({
          id: "raisg-maps",
          role: copy("Regional territorial context", "Contexto territorial regional", "Contexto territorial regional"),
          reason: copy(
            "Start with harmonized pan-Amazon layers for Indigenous territories, protected areas and infrastructure.",
            "Comece por camadas pan-amazônicas harmonizadas de territórios indígenas, áreas protegidas e infraestrutura.",
            "Empieza con capas panamazónicas armonizadas de territorios indígenas, áreas protegidas e infraestructura."
          )
        }),
        Object.freeze({
          id: "mapbiomas-amazonia",
          role: copy("Basin-wide land cover", "Cobertura do solo na bacia", "Cobertura del suelo en la cuenca"),
          reason: copy(
            "Add annual pan-Amazon land-cover and surface-water maps built with a shared regional legend.",
            "Acrescente mapas anuais pan-amazônicos de cobertura do solo e água superficial com legenda regional comum.",
            "Añade mapas anuales panamazónicos de cobertura del suelo y agua superficial con una leyenda regional común."
          )
        }),
        Object.freeze({
          id: "amazon-mining-watch",
          role: copy("Mining-scar detections", "Detecções de cicatrizes de garimpo", "Detecciones de cicatrices mineras"),
          reason: copy(
            "Inspect satellite-detected probable open-pit mining scars across all Amazonian jurisdictions.",
            "Examine detecções por satélite de prováveis cicatrizes de mineração a céu aberto nas jurisdições amazônicas.",
            "Examina detecciones satelitales de probables cicatrices de minería a cielo abierto en las jurisdicciones amazónicas."
          )
        }),
        Object.freeze({
          id: "nasa-firms-active-fire",
          role: copy("Active-fire detections", "Detecções de fogo ativo", "Detecciones de fuego activo"),
          reason: copy(
            "Add near-real-time and historical thermal anomalies from MODIS and VIIRS across borders.",
            "Acrescente anomalias térmicas históricas e quase em tempo real do MODIS e VIIRS além das fronteiras nacionais.",
            "Añade anomalías térmicas históricas y casi en tiempo real de MODIS y VIIRS a través de las fronteras."
          )
        })
      ])
    }),
    Object.freeze({
      id: "andean-amazon-forests-territories",
      locales: Object.freeze({
        shortTitle: copy(
          "Andean-Amazon forests & lands",
          "Florestas da Amazônia Andina",
          "Bosques de la Amazonía Andina"
        ),
        selectorSummary: copy(
          "Colombia, Peru, Bolivia & Ecuador · 4 national forest and land-cover monitoring systems.",
          "Colômbia, Peru, Bolívia e Equador · 4 sistemas nacionais de monitoramento florestal e de uso do solo.",
          "Colombia, Perú, Bolivia y Ecuador · 4 sistemas nacionales de monitoreo forestal y de uso del suelo."
        ),
        title: copy(
          "Compare forest and land-use monitoring across Andean-Amazon countries",
          "Compare o monitoramento florestal e de uso do solo nos países da Amazônia Andina",
          "Compara el monitoreo forestal y de uso del suelo en los países de la Amazonía Andina"
        ),
        summary: copy(
          "A starting set of four national monitoring platforms covering Colombia, Peru, Bolivia and Ecuador.",
          "Um conjunto inicial de quatro plataformas nacionais de monitoramento cobrindo Colômbia, Peru, Bolívia e Equador.",
          "Un conjunto inicial de cuatro plataformas nacionales de monitoreo que cubren Colombia, Perú, Bolivia y Ecuador."
        ),
        caution: copy(
          "Each country defines forest baselines, minimum mapping units and alert cadences differently. Compare national methodologies before aggregating figures across borders.",
          "Cada país define linhas de base florestais, áreas mínimas de mapeamento e frequências de alerta de modo distinto. Compare as metodologias nacionais antes de somar números entre fronteiras.",
          "Cada país define líneas base forestales, unidades mínimas de mapeo y frecuencias de alerta de manera distinta. Compara las metodologías nacionales antes de agregar cifras entre fronteras."
        )
      }),
      records: Object.freeze([
        Object.freeze({
          id: "ideam-smbyc",
          role: copy("Colombia forest monitoring", "Monitoramento florestal na Colômbia", "Monitoreo forestal en Colombia"),
          reason: copy(
            "Review IDEAM's official forest-cover series, early-warning alerts and methodological reports for Colombia.",
            "Consulte a série oficial de cobertura florestal, alertas precoces e relatórios metodológicos do IDEAM para a Colômbia.",
            "Consulta la serie oficial de cobertura forestal, alertas tempranas e informes metodológicos del IDEAM para Colombia."
          )
        }),
        Object.freeze({
          id: "geobosques-national-forest-monitoring-platform",
          role: copy("Peru forest loss & alerts", "Perda florestal e alertas no Peru", "Pérdida forestal y alertas en Perú"),
          reason: copy(
            "Compare MINAM's annual forest-loss maps and weekly early-warning alerts for the Peruvian Amazon.",
            "Compare os mapas anuais de perda florestal e alertas semanais do MINAM para a Amazônia peruana.",
            "Compara los mapas anuales de pérdida forestal y las alertas semanales del MINAM para la Amazonía peruana."
          )
        }),
        Object.freeze({
          id: "simb-bolivia-forest-monitor",
          role: copy("Bolivia forest geovisor", "Geovisor florestal da Bolívia", "Geovisor forestal de Bolivia"),
          reason: copy(
            "Inspect Bolivia's official forest-cover, deforestation and fire monitoring layers in SIMB.",
            "Examine as camadas oficiais de cobertura florestal, desmatamento e fogo da Bolívia no SIMB.",
            "Examina las capas oficiales de cobertura forestal, deforestación y fuego de Bolivia en el SIMB."
          )
        }),
        Object.freeze({
          id: "mapbiomas-ecuador-land-cover",
          role: copy("Ecuador land-cover series", "Série de uso do solo no Equador", "Serie de uso del suelo en Ecuador"),
          reason: copy(
            "Add multi-decade 30 m land-cover, vegetation-loss and surface-water classifications for Ecuador.",
            "Acrescente classificações multidecadais de 30 m de uso do solo, perda de vegetação e água para o Equador.",
            "Añade clasificaciones multidecadales de 30 m de uso del suelo, pérdida de vegetación y agua para Ecuador."
          )
        })
      ])
    }),
    Object.freeze({
      id: "pan-amazon-rivers-waters-climate",
      locales: Object.freeze({
        shortTitle: copy(
          "Pan-Amazon rivers & waters",
          "Rios e águas pan-amazônicas",
          "Ríos y aguas panamazónicas"
        ),
        selectorSummary: copy(
          "Pan-Amazon · 4 sources on cross-border river gauges, sediments, rainfall and aquatic ecosystems.",
          "Pan-Amazônia · 4 fontes sobre estações fluviais transfronteiriças, sedimentos, chuva e ecossistemas aquáticos.",
          "Panamazonía · 4 fuentes sobre estaciones fluviales transfronterizas, sedimentos, lluvia y ecosistemas acuáticos."
        ),
        title: copy(
          "Explore rivers, rainfall and aquatic ecosystems across the Amazon basin",
          "Explore rios, chuva e ecossistemas aquáticos em toda a bacia amazônica",
          "Explora ríos, lluvia y ecosistemas acuáticos en toda la cuenca amazónica"
        ),
        summary: copy(
          "A starting set of four regional sources connecting cross-border hydrometric stations, gridded rainfall and sub-basin aquatic monitoring.",
          "Um conjunto inicial de quatro fontes regionais conectando estações hidrométricas transfronteiriças, precipitação em grade e monitoramento aquático por sub-bacia.",
          "Un conjunto inicial de cuatro fuentes regionales que conectan estaciones hidrométricas transfronterizas, precipitación en cuadrícula y monitoreo acuático por subcuenca."
        ),
        caution: copy(
          "Gauge density and record periods vary across countries and tributaries, and community aquatic observations are aggregated by sub-basin to protect local contributors. Check station metadata and aggregation rules before comparing sub-basins.",
          "A densidade de estações e os períodos de registro variam entre países e tributários, e observações aquáticas comunitárias são agregadas por sub-bacia para proteger colaboradores locais. Verifique metadados e regras de agregação antes de comparar sub-bacias.",
          "La densidad de estaciones y los períodos de registro varían entre países y afluentes, y las observaciones acuáticas comunitarias se agregan por subcuenca para proteger a quienes colaboran localmente. Revisa los metadatos y reglas de agregación antes de comparar subcuencas."
        )
      }),
      records: Object.freeze([
        Object.freeze({
          id: "ore-hybam-observatory",
          role: copy("Cross-border river gauges", "Estações fluviais na bacia", "Estaciones fluviales en la cuenca"),
          reason: copy(
            "Start with standardized discharge, sediment and geochemistry series from the Andes to the Atlantic.",
            "Comece por séries padronizadas de vazão, sedimentos e geoquímica dos Andes ao Atlântico.",
            "Empieza con series estandarizadas de caudal, sedimentos y geoquímica desde los Andes hasta el Atlántico."
          )
        }),
        Object.freeze({
          id: "acto-amazon-networks-water-module",
          role: copy("Regional water network", "Rede hídrica regional", "Red hídrica regional"),
          reason: copy(
            "Add member-country hydrometeorological and water-quality stations integrated by ACTO/OTCA.",
            "Acrescente estações hidrometeorológicas e de qualidade da água dos países-membros integradas pela OTCA.",
            "Añade estaciones hidrometeorológicas y de calidad del agua de los países miembros integradas por la OTCA."
          )
        }),
        Object.freeze({
          id: "amazon-waters-observatory",
          role: copy("Sub-basin aquatic records", "Registros aquáticos por sub-bacia", "Registros acuáticos por subcuenca"),
          reason: copy(
            "Add sub-basin fish, fisheries and aquatic-ecosystem monitoring from partner and citizen-science networks.",
            "Acrescente monitoramento de peixes, pesca e ecossistemas aquáticos por sub-bacia de redes parceiras e ciência cidadã.",
            "Añade monitoreo de peces, pesca y ecosistemas acuáticos por subcuenca de redes socias y ciencia ciudadana."
          )
        }),
        Object.freeze({
          id: "chirps-precipitation",
          role: copy("Gridded rainfall baseline", "Série de chuva em grade", "Serie de lluvia en cuadrícula"),
          reason: copy(
            "Combine station records with long-term gridded precipitation estimates across data-sparse watersheds.",
            "Combine registros de estações com estimativas históricas de precipitação em grade em bacias com poucos postos.",
            "Combina registros de estaciones con estimaciones históricas de precipitación en cuadrícula en cuencas con pocos datos."
          )
        })
      ])
    }),
    Object.freeze({
      id: "guiana-shield-forests-land",
      locales: Object.freeze({
        shortTitle: copy(
          "Guiana Shield forests & land",
          "Florestas do Escudo das Guianas",
          "Bosques del Escudo Guayanés"
        ),
        selectorSummary: copy(
          "Guyana, Suriname, French Guiana & Venezuela · 4 sources on forest monitoring and land cover.",
          "Guiana, Suriname, Guiana Francesa e Venezuela · 4 fontes sobre monitoramento florestal e cobertura do solo.",
          "Guyana, Surinam, Guayana Francesa y Venezuela · 4 fuentes sobre monitoreo forestal y cobertura del suelo."
        ),
        title: copy(
          "Explore forest monitoring and land cover across the Guiana Shield",
          "Explore monitoramento florestal e cobertura do solo no Escudo das Guianas",
          "Explora el monitoreo forestal y la cobertura del suelo en el Escudo Guayanés"
        ),
        summary: copy(
          "A starting set of four public sources covering Guyana, Suriname, French Guiana and Venezuela.",
          "Um conjunto inicial de quatro fontes públicas cobrindo Guiana, Suriname, Guiana Francesa e Venezuela.",
          "Un conjunto inicial de cuatro fuentes públicas que cubren Guyana, Surinam, Guayana Francesa y Venezuela."
        ),
        caution: copy(
          "National monitoring systems across the Guiana Shield use different reporting cycles, sensor archives and access terms. Review each agency's technical notes and licensing before combining layers across jurisdictions.",
          "Os sistemas nacionais de monitoramento no Escudo das Guianas utilizam diferentes ciclos de relatório, acervos de sensores e termos de acesso. Revise as notas técnicas e licenças de cada órgão antes de combinar camadas entre jurisdições.",
          "Los sistemas nacionales de monitoreo en el Escudo Guayanés utilizan distintos ciclos de reporte, archivos de sensores y condiciones de acceso. Revisa las notas técnicas y licencias de cada organismo antes de combinar capas entre jurisdicciones."
        )
      }),
      records: Object.freeze([
        Object.freeze({
          id: "guyana-mrvs",
          role: copy("Guyana MRVS assessments", "Avaliações MRVS da Guiana", "Evaluaciones MRVS de Guyana"),
          reason: copy(
            "Review Guyana's annual forest-change, carbon and driver assessments published through the national MRVS.",
            "Consulte as avaliações anuais de mudança florestal, carbono e vetores publicadas pelo MRVS da Guiana.",
            "Consulta las evaluaciones anuales de cambio forestal, carbono y motores publicadas por el MRVS de Guyana."
          )
        }),
        Object.freeze({
          id: "gonini-suriname-land-monitoring",
          role: copy("Suriname land monitoring", "Monitoramento do solo no Suriname", "Monitoreo del suelo en Surinam"),
          reason: copy(
            "Explore Suriname's national land-monitoring geoportal and forest-cover layers maintained by SBB.",
            "Explore o geoportal nacional de monitoramento do solo e as camadas florestais mantidas pela SBB no Suriname.",
            "Explora el geoportal nacional de monitoreo territorial y las capas forestales mantenidas por SBB en Surinam."
          )
        }),
        Object.freeze({
          id: "seas-guyane-satellite-data",
          role: copy("French Guiana satellite archive", "Acervo orbital da Guiana Francesa", "Archivo satelital de Guayana Francesa"),
          reason: copy(
            "Add multi-sensor satellite imagery and territorial monitoring products from SEAS Guyane.",
            "Acrescente imagens de satélite multissensor e produtos de monitoramento territorial do SEAS Guyane.",
            "Añade imágenes satelitales multisensor y productos de monitoreo territorial de SEAS Guyane."
          )
        }),
        Object.freeze({
          id: "mapbiomas-venezuela-land-cover",
          role: copy("Venezuela land-cover series", "Série de uso do solo na Venezuela", "Serie de uso del suelo en Venezuela"),
          reason: copy(
            "Add annual 30 m land-cover maps and transition statistics for Venezuelan Amazon and Guiana Shield watersheds.",
            "Acrescente mapas anuais de 30 m de uso do solo e estatísticas de transição para a Amazônia e Guayana venezuelana.",
            "Añade mapas anuales de 30 m de uso del suelo y estadísticas de transición para la Amazonía y Guayana venezolana."
          )
        })
      ])
    })
  ]);
})();
