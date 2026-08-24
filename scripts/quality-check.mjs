// Repository-level checks that are fast, deterministic, and safe to run in
// pull requests. Network verification remains in check-links.mjs because
// publisher sites may rate-limit or block automated traffic.

import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const publicBase = "https://amazoniadb.org";
const canonicalPages = [
  { file: "index.html", app: "app.js", locale: "pt-BR", url: `${publicBase}/` },
  { file: "en/index.html", app: "en/app.js", locale: "en", url: `${publicBase}/en/` },
  { file: "es/index.html", app: "es/app.js", locale: "es", url: `${publicBase}/es/` },
  { file: "donate.html", locale: "pt-BR", url: `${publicBase}/donate` },
  { file: "en/donate.html", locale: "en", url: `${publicBase}/en/donate` },
  { file: "es/donate.html", locale: "es", url: `${publicBase}/es/donate` },
  { file: "submit.html", locale: "pt-BR", url: `${publicBase}/submit` },
  { file: "en/submit.html", locale: "en", url: `${publicBase}/en/submit` },
  { file: "es/submit.html", locale: "es", url: `${publicBase}/es/submit` }
];
const homePages = canonicalPages.filter((page) => page.app);
const legacyPages = [
  { file: "pt-br/index.html", target: "../" },
  { file: "pt-br/donate.html", target: "../donate" },
  { file: "pt-br/submit.html", target: "../submit" }
];
const htmlFiles = [...canonicalPages.map((page) => page.file), ...legacyPages.map((page) => page.file)];
const requiredCategories = [
  "Forest & biodiversity",
  "Earth, water & climate",
  "Land use & infrastructure",
  "Peoples, territories & culture",
  "Society, health & livelihoods",
  "Governance, rights & safeguards"
];
const errors = [];
const notes = [];

const read = (relativePath) => readFile(new URL(relativePath, root), "utf8");
const fail = (message) => errors.push(message);
const catalogSchema = JSON.parse(await read("data/catalog.schema.json"));
const controlledFilterValues = {
  coverage: ["", ...catalogSchema.properties.coverage.enum],
  access: ["", ...catalogSchema.properties.access.enum]
};

const selectOptionValues = (html, id) => {
  const select = html.match(new RegExp(`<select\\b[^>]*\\bid=["']${id}["'][^>]*>[\\s\\S]*?<\\/select>`, "i"));
  if (!select) return null;
  return [...select[0].matchAll(/<option\b[^>]*\bvalue=["']([^"']*)["']/gi)].map((match) => match[1]);
};

const evaluateBrowserData = async () => {
  const context = { window: {} };
  for (const file of ["data/category-presentation.js", "data/tag-presentation.js", "data/catalog.js", "data/catalog.i18n.js", "data/research-paths.js"]) {
    vm.runInNewContext(await read(file), context, { filename: file });
  }
  return context.window;
};

const checkLocalReferences = async (file, html) => {
  const attributePattern = /\b(?:href|src)=["']([^"']+)["']/gi;
  for (const match of html.matchAll(attributePattern)) {
    const reference = match[1].trim();
    if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) continue;
    try {
      const target = new URL(reference, new URL(file, root));
      if (target.protocol !== "file:") continue;
      try {
        await access(fileURLToPath(target));
      } catch {
        if (target.pathname.endsWith("/")) throw new Error("missing directory");
        await access(fileURLToPath(new URL(`${target.href}.html`)));
      }
    } catch {
      fail(`${file}: local reference does not resolve: ${reference}`);
    }
  }
};

const linkTags = (html) => [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
const attributeValue = (tag, attribute) => tag.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, "i"))?.[1] || "";
const linkHref = (html, rel, hreflang = "") => linkTags(html)
  .find((tag) => attributeValue(tag, "rel") === rel && (!hreflang || attributeValue(tag, "hreflang") === hreflang))
  ? attributeValue(linkTags(html).find((tag) => attributeValue(tag, "rel") === rel && (!hreflang || attributeValue(tag, "hreflang") === hreflang)), "href")
  : "";
const localizedPageUrl = (locale, file) => {
  const page = file.replace(/^(?:en|es)\//, "");
  const prefix = locale === "pt-BR" ? "" : `${locale}/`;
  return `${publicBase}/${prefix}${page === "index.html" ? "" : page.replace(/\.html$/, "")}`;
};

const makeElement = () => {
  const listeners = new Map();
  return {
    value: "",
    hidden: false,
    textContent: "",
    innerHTML: "",
    dataset: {},
    style: {},
    classList: { add() {}, remove() {} },
    setAttribute() {},
    addEventListener(type, handler) { listeners.set(type, handler); },
    listener(type) { return listeners.get(type); },
    click() { listeners.get("click")?.({ target: this, preventDefault() {} }); },
    focus() {},
    scrollIntoView() {},
    querySelector() { return { focus() {}, scrollIntoView() {} }; }
  };
};

const makeLanguageLink = (href) => ({
  ...makeElement(),
  href,
  getAttribute(name) { return name === "href" ? href : null; }
});

const runExplorerSmokeTest = async (page, browserData) => {
  const ids = [
    "domain-nav", "dataset-grid", "empty-state", "result-count", "dataset-count",
    "search", "coverage", "topic", "role", "access", "mode", "time-profile", "more-filters", "more-filter-count", "filters", "discover-source", "discovery-result",
    "catalog", "copy-view-link", "catalog-more", "show-more-sources", "research-path-panel", "open-research-path", "research-path-choice",
    "next-research-path", "research-path-summary", "research-path-position", "source-set-panel", "source-set-summary", "source-set-items",
    "source-set-caution", "source-set-status", "copy-source-set", "download-source-set", "clear-source-set"
  ];
  const elements = Object.fromEntries(ids.map((id) => [id, makeElement()]));
  elements.coverage.options = controlledFilterValues.coverage.map((value) => ({ value }));
  elements.access.options = controlledFilterValues.access.map((value) => ({ value }));
  elements.topic.options = [{ value: "" }];
  elements.topic.dataset.defaultOption = "All topics";
  for (const id of ["role", "mode", "time-profile"]) {
    elements[id].options = [{ value: "" }];
    elements[id].dataset.defaultOption = "Any";
  }
  elements["research-path-choice"].options = [];
  const languageLinks = [makeLanguageLink("../index.html"), makeLanguageLink("../es/index.html")];
  const head = { children: [], appendChild(node) { this.children.push(node); } };
  const body = { appendChild() {}, removeChild() {} };
  const document = {
    head,
    body,
    activeElement: null,
    getElementById(id) { return elements[id] || makeElement(); },
    querySelectorAll(selector) { return selector === ".lang-switch a" ? languageLinks : []; },
    createElement() { return makeElement(); },
    addEventListener() {},
    execCommand() { return true; }
  };
  const location = {
    origin: publicBase,
    pathname: `/${page.file}`,
    search: "?source=gbif-species-occurrences&category=Earth%2C%20water%20%26%20climate&topic=forests&role=alert&mode=remote-sensing&time=near-real-time&path=forest-change-territory-brazil&set=ana-hidroweb",
    hash: "",
    assignedHref: "",
    get href() { return this.assignedHref || `${this.origin}${this.pathname}${this.search}${this.hash}`; },
    set href(value) { this.assignedHref = value; }
  };
  const history = {
    replacements: [],
    replaceState(_state, _title, next) {
      this.replacements.push(next);
      const url = new URL(next, location.origin);
      location.pathname = url.pathname;
      location.search = url.search;
      location.hash = url.hash;
    }
  };
  const window = {
    ...browserData,
    location,
    history,
    matchMedia: () => ({ matches: true }),
    setTimeout,
    clearTimeout
  };
  let downloadedBlob = null;
  class BrowserURL extends URL {
    static createObjectURL(blob) {
      downloadedBlob = blob;
      return "blob:amazoniadb-source-set";
    }
    static revokeObjectURL() {}
  }
  const context = {
    window,
    document,
    navigator: { clipboard: { writeText: async () => {} } },
    URLSearchParams,
    URL: BrowserURL,
    Blob,
    setTimeout,
    clearTimeout,
    console
  };
  vm.runInNewContext(await read(page.app), context, { filename: page.app });

  const renderedTiles = (elements["domain-nav"].innerHTML.match(/<button\b/g) || []).length;
  const renderedRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
  if (renderedTiles !== 6) fail(`${page.file}: expected six category tiles, rendered ${renderedTiles}.`);
  if (renderedRecords !== 1) fail(`${page.file}: a source URL must override conflicting filters and render exactly one source.`);
  if (!history.replacements.at(-1)?.includes("source=gbif-species-occurrences") || /(?:category|topic|role|mode|time|path)=/.test(history.replacements.at(-1))) {
    fail(`${page.file}: source URL did not normalize conflicting filter parameters.`);
  }
  if (!history.replacements.at(-1)?.includes("set=ana-hidroweb") || elements["source-set-panel"].hidden) {
    fail(`${page.file}: a valid source set must survive a focused source URL and render its tray.`);
  }
  if (!elements["source-set-items"].innerHTML.includes('class="source-set-chip-link"') || !elements["source-set-items"].innerHTML.includes("source=ana-hidroweb")) {
    fail(`${page.file}: every selected-source chip must link to its focused catalog record.`);
  }
  if (!languageLinks.every((link) => link.href.includes("?source=gbif-species-occurrences"))) {
    fail(`${page.file}: language links do not preserve the current source view.`);
  }
  elements["download-source-set"].listener("click")?.();
  const exportedCsv = downloadedBlob ? await downloadedBlob.text() : "";
  for (const requiredCsvText of ['"exportedAt"', '"sourceSetUrl"', '"description"', '"protocolUrl"', '"communityAuthorityUrl"', '"ana-hidroweb"']) {
    if (!exportedCsv.includes(requiredCsvText)) fail(`${page.file}: source-set CSV is missing ${requiredCsvText}.`);
  }
  const structuredScript = head.children.find((node) => node.type === "application/ld+json");
  const structuredData = structuredScript?.textContent ? JSON.parse(structuredScript.textContent) : null;
  const structuredTypes = new Set((structuredData?.["@graph"] || []).map((item) => item["@type"]));
  if (!structuredTypes.has("WebSite") || !structuredTypes.has("DataCatalog")) {
    fail(`${page.file}: JSON-LD must describe the website and data catalog.`);
  }
  if ((structuredData?.["@graph"] || []).some((item) => Object.hasOwn(item, "dataset") || item["@type"] === "Dataset")) {
    fail(`${page.file}: homepage JSON-LD must not claim non-visible per-dataset markup.`);
  }

  const reportRecord = browserData.AMAZONIA_CATALOG[0];
  const reportTarget = {
    closest(selector) {
      return selector === "button[data-report-id]" ? { dataset: { reportId: reportRecord.id } } : null;
    }
  };
  elements["dataset-grid"].listener("click")?.({ target: reportTarget });
  if (!location.assignedHref.startsWith("mailto:correcoes@amazoniadb.org?")) {
    fail(`${page.file}: source-report action must prepare an email to the corrections address.`);
  }
  location.assignedHref = "";

  let submitPrevented = false;
  elements.filters.listener("submit")?.({ preventDefault() { submitPrevented = true; } });
  if (!submitPrevented) fail(`${page.file}: pressing Enter in the filter form must not reload and discard the active search.`);

  const reviewedPaths = browserData.AMAZONIA_RESEARCH_PATHS || [];
  const localizedPathCopy = (copy) => copy?.[page.locale] || copy?.en || "";
  const starterOptions = Array.from(elements["research-path-choice"].options || [], ({ value }) => value);
  if (JSON.stringify(starterOptions) !== JSON.stringify(reviewedPaths.map((path) => path.id)) || elements["open-research-path"].dataset.path !== reviewedPaths[0]?.id) {
    fail(`${page.file}: the research-question selector must expose every reviewed path in declared order.`);
  }
  elements["next-research-path"].listener("click")?.();
  if (reviewedPaths.length > 1 && (elements["research-path-choice"].value !== reviewedPaths[1].id || elements["open-research-path"].dataset.path !== reviewedPaths[1].id)) {
    fail(`${page.file}: the next-question control must move deterministically to the next reviewed path.`);
  }
  if (reviewedPaths.length > 1 && elements["research-path-summary"].textContent !== localizedPathCopy(reviewedPaths[1].locales?.selectorSummary)) {
    fail(`${page.file}: the starter summary must follow the selected short research path.`);
  }
  elements["research-path-choice"].value = reviewedPaths.at(-1)?.id || "";
  elements["research-path-choice"].listener("change")?.();
  if (reviewedPaths.length && elements["open-research-path"].dataset.path !== reviewedPaths.at(-1).id) {
    fail(`${page.file}: choosing a research question must update the path opened by the primary action.`);
  }
  if (reviewedPaths.length && elements["research-path-summary"].textContent !== localizedPathCopy(reviewedPaths.at(-1).locales?.selectorSummary)) {
    fail(`${page.file}: choosing a research question must expose its concise scope below the selector.`);
  }

  const firstTile = { dataset: { category: requiredCategories[0] } };
  elements["domain-nav"].listener("click")?.({ target: { closest: () => firstTile } });
  const filteredRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
  const expectedRecords = browserData.AMAZONIA_CATALOG.filter((record) => record.category === requiredCategories[0]).length;
  if (filteredRecords !== expectedRecords) fail(`${page.file}: category filtering rendered ${filteredRecords}, expected ${expectedRecords}.`);
  elements["domain-nav"].listener("click")?.({ target: { closest: () => firstTile } });
  const resetRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
  const initialCatalogPageSize = Math.min(12, browserData.AMAZONIA_CATALOG.length);
  if (resetRecords !== initialCatalogPageSize || elements["catalog-more"].hidden) {
    fail(`${page.file}: an unfiltered catalog must initially show a compact first page with a visible expansion control.`);
  }
  elements["show-more-sources"].listener("click")?.();
  const expandedFirstPage = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
  if (browserData.AMAZONIA_CATALOG.length > 12 && expandedFirstPage !== Math.min(24, browserData.AMAZONIA_CATALOG.length)) {
    fail(`${page.file}: show-more must reveal the next catalog page without dropping records.`);
  }
  while (!elements["catalog-more"].hidden) elements["show-more-sources"].listener("click")?.();
  const fullyExpandedRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
  if (fullyExpandedRecords !== browserData.AMAZONIA_CATALOG.length) fail(`${page.file}: show-more must eventually reveal the full catalog.`);
  const documentationLinks = (elements["dataset-grid"].innerHTML.match(/class="methodology-link"/g) || []).length;
  if (documentationLinks !== browserData.AMAZONIA_CATALOG.length) fail(`${page.file}: every source card must expose a source or documentation link.`);
  const formatGroups = (elements["dataset-grid"].innerHTML.match(/class="format-tags"/g) || []).length;
  if (formatGroups !== browserData.AMAZONIA_CATALOG.length) fail(`${page.file}: every source card must expose its available formats.`);
  const factGroups = (elements["dataset-grid"].innerHTML.match(/class="dataset-facts"/g) || []).length;
  if (factGroups !== browserData.AMAZONIA_CATALOG.length) fail(`${page.file}: every source card must expose one continuous facts list.`);
  const reviewFacts = (elements["dataset-grid"].innerHTML.match(/data-fact="review"/g) || []).length;
  const reviewTimes = (elements["dataset-grid"].innerHTML.match(/<time datetime="[^"]+">/g) || []).length;
  if (reviewFacts !== browserData.AMAZONIA_CATALOG.length || reviewTimes !== browserData.AMAZONIA_CATALOG.length) {
    fail(`${page.file}: every link-review fact must preserve its machine-readable date.`);
  }
  const cardActionGroups = (elements["dataset-grid"].innerHTML.match(/class="card-actions"/g) || []).length;
  const cardToolGroups = (elements["dataset-grid"].innerHTML.match(/class="card-tools"/g) || []).length;
  if (cardActionGroups !== browserData.AMAZONIA_CATALOG.length || cardToolGroups !== browserData.AMAZONIA_CATALOG.length) {
    fail(`${page.file}: every source card must keep stable link and utility action rows.`);
  }
  const responsibleUseRecords = browserData.AMAZONIA_CATALOG.filter((record) => record.responsibleUse).length;
  const responsibleUseDetails = (elements["dataset-grid"].innerHTML.match(/class="responsible-use"/g) || []).length;
  if (responsibleUseDetails !== responsibleUseRecords) fail(`${page.file}: reviewed responsible-use notes must appear only on their assigned cards.`);
  const expectedDetailIcons = browserData.AMAZONIA_CATALOG.reduce((total, record) => total + 3 + [record.temporalCoverage, record.spatialResolution, record.license].filter(Boolean).length, 0);
  const renderedDetailIcons = (elements["dataset-grid"].innerHTML.match(/class="detail-icon"/g) || []).length;
  if (renderedDetailIcons !== expectedDetailIcons) fail(`${page.file}: every visible source fact must use the shared compact icon system.`);
  const compactFactMatches = [...elements["dataset-grid"].innerHTML.matchAll(/<li data-fact="(?:timeframe|resolution)"[^>]*><span class="detail-icon"[^>]*>[\s\S]*?<\/span><span(?: title="[^"]*")?>([^<]*)<\/span><\/li>/g)];
  const expectedCompactFacts = browserData.AMAZONIA_CATALOG.reduce((total, record) => total + [record.temporalCoverage, record.spatialResolution].filter(Boolean).length, 0);
  const decodeHtml = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  if (compactFactMatches.length !== expectedCompactFacts || compactFactMatches.some((match) => [...decodeHtml(match[1])].length > 44)) {
    fail(`${page.file}: visible timeframe and resolution summaries must stay concise while full values remain accessible.`);
  }
  elements["discover-source"].listener("click")?.();
  const discoveryRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
  if (discoveryRecords !== 1 || elements["discovery-result"].hidden) fail(`${page.file}: discovery must focus one verified source.`);

  // Malformed or obsolete share URLs must degrade to the full directory,
  // never to an unexplained empty view with no selected control.
  location.search = "?category=not-a-real-category&coverage=nowhere&topic=unknown&access=unknown&path=not-a-real-path";
  location.hash = "";
  history.replacements = [];
  vm.runInNewContext(await read(page.app), context, { filename: `${page.app}:invalid-url` });
  const invalidUrlRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
  if (invalidUrlRecords !== Math.min(12, browserData.AMAZONIA_CATALOG.length)) fail(`${page.file}: invalid filter URL must fall back to the initial catalog page.`);
  if (/(?:not-a-real-category|unknown|not-a-real-path)/.test(history.replacements.at(-1) || "")) fail(`${page.file}: invalid filter URL was not normalized.`);

  const topicId = "forest-change";
  location.search = `?topic=${topicId}`;
  location.hash = "";
  history.replacements = [];
  vm.runInNewContext(await read(page.app), context, { filename: `${page.app}:topic-url` });
  const topicRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
  const expectedTopicRecords = browserData.AMAZONIA_CATALOG.filter((record) => record.tags?.topics?.includes(topicId)).length;
  if (topicRecords !== expectedTopicRecords || elements.topic.value !== topicId) {
    fail(`${page.file}: a valid topic URL must render the reviewed tagged records and preserve its selected control.`);
  }
  const visibleActiveTopicTags = (elements["dataset-grid"].innerHTML.match(new RegExp(`data-topic="${topicId}"`, "g")) || []).length;
  if (visibleActiveTopicTags !== expectedTopicRecords) {
    fail(`${page.file}: the active topic filter must remain visible on every matching card.`);
  }
  if (!history.replacements.at(-1)?.includes(`topic=${topicId}`)) fail(`${page.file}: a valid topic URL was not preserved.`);

  location.search = "?source=data-zoom-amazonia";
  location.hash = "";
  vm.runInNewContext(await read(page.app), context, { filename: `${page.app}:multi-topic-source` });
  if (!elements["dataset-grid"].innerHTML.includes('class="topic-more"') || !elements["dataset-grid"].innerHTML.includes(">+3</span>")) {
    fail(`${page.file}: a multi-topic source must disclose hidden topic tags.`);
  }

  for (const [parameter, facet, value] of [
    ["role", "roles", "monitoring"],
    ["mode", "modes", "remote-sensing"],
    ["time", "time", "near-real-time"]
  ]) {
    location.search = `?${parameter}=${value}`;
    location.hash = "";
    history.replacements = [];
    vm.runInNewContext(await read(page.app), context, { filename: `${page.app}:${parameter}-url` });
    const rendered = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
    const expected = browserData.AMAZONIA_CATALOG.filter((record) => record.tags?.[facet]?.includes(value)).length;
    if (rendered !== expected || !history.replacements.at(-1)?.includes(`${parameter}=${value}`)) {
      fail(`${page.file}: ${parameter} filtering must use the reviewed ${facet} vocabulary and remain shareable.`);
    }
  }

  const localizedWebMap = page.locale === "es" ? "Mapa web" : page.locale === "pt-BR" ? "Mapa web" : "Web map";
  location.search = `?q=${encodeURIComponent(localizedWebMap)}`;
  location.hash = "";
  vm.runInNewContext(await read(page.app), context, { filename: `${page.app}:localized-format-search` });
  const localizedFormatRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
  const expectedFormatRecords = browserData.AMAZONIA_CATALOG.filter((record) => record.formats.includes("Web map")).length;
  if (localizedFormatRecords !== expectedFormatRecords) {
    fail(`${page.file}: visible localized format labels must be searchable.`);
  }

  for (const guidedPath of browserData.AMAZONIA_RESEARCH_PATHS || []) {
    location.search = `?path=${guidedPath.id}&coverage=Brazil`;
    location.hash = "";
    history.replacements = [];
    vm.runInNewContext(await read(page.app), context, { filename: `${page.app}:research-path` });
    const guidedRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
    const guidedOrder = [...elements["dataset-grid"].innerHTML.matchAll(/data-record-id="([^"]+)"/g)].map((match) => match[1]);
    const expectedOrder = guidedPath.records.map((entry) => entry.id);
    if (guidedRecords !== expectedOrder.length || JSON.stringify(guidedOrder) !== JSON.stringify(expectedOrder) || elements["research-path-panel"].hidden) {
      fail(`${page.file}: a guided path must show its reviewed sources in the declared order with a visible caution panel.`);
    }
    if (!history.replacements.at(-1)?.includes(`path=${guidedPath.id}`) || history.replacements.at(-1).includes("coverage=")) {
      fail(`${page.file}: a guided path must normalize conflicting filters while preserving the path.`);
    }
  }

  // Every optional card detail must also be discoverable through search in
  // every locale. The localized apps index translated text in addition to the
  // canonical terms; this verifies the shared canonical behavior.
  for (const detail of ["temporalCoverage", "spatialResolution", "license"]) {
    const value = browserData.AMAZONIA_CATALOG.find((record) => record[detail])?.[detail];
    if (!value) continue;
    location.search = "";
    location.hash = "";
    vm.runInNewContext(await read(page.app), context, { filename: `${page.app}:${detail}-search` });
    elements.search.value = value;
    elements.search.listener("input")?.();
    const visibleDetailRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
    const expectedDetailRecords = browserData.AMAZONIA_CATALOG.filter((record) => String(record[detail] || "").toLocaleLowerCase().includes(value.toLocaleLowerCase())).length;
    if (visibleDetailRecords !== expectedDetailRecords) fail(`${page.file}: ${detail} must be searchable.`);
  }

  // Empty results are valid when a filter value is offered by the UI/schema.
  // They must survive a reload instead of silently expanding to the full list.
  location.search = "?coverage=Colombia";
  location.hash = "";
  history.replacements = [];
  vm.runInNewContext(await read(page.app), context, { filename: `${page.app}:empty-valid-url` });
  const emptyValidUrlRecords = (elements["dataset-grid"].innerHTML.match(/<article\b/g) || []).length;
  if (emptyValidUrlRecords !== 0 || elements.coverage.value !== "Colombia") {
    fail(`${page.file}: a valid empty coverage URL must preserve its selected filter.`);
  }
  if (!history.replacements.at(-1)?.includes("coverage=Colombia")) {
    fail(`${page.file}: a valid empty coverage URL was not preserved.`);
  }
};

for (const file of htmlFiles) {
  const html = await read(file);
  await checkLocalReferences(file, html);
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]));
  for (const match of html.matchAll(/\bhref=["']#([^"']+)["']/gi)) {
    if (!ids.has(match[1])) fail(`${file}: same-page link #${match[1]} does not resolve to an element id.`);
  }
  if (/AMAZONIADB_GOATCOUNTER_CODE|href=["']#["']|\[platform\]/i.test(html)) {
    fail(`${file}: contains a public placeholder.`);
  }
  if (/goatcounter\.com\/count/i.test(html)) fail(`${file}: contains the unused placeholder analytics script.`);
  if (/candidates\.html|candidates\.js/i.test(html)) fail(`${file}: must not expose the retired candidates board.`);
}

for (const page of canonicalPages) {
  const html = await read(page.file);
  if (linkHref(html, "canonical") !== page.url) fail(`${page.file}: canonical URL must be ${page.url}.`);
  const pageName = page.file.replace(/^(?:en|es)\//, "");
  for (const locale of ["pt-BR", "en", "es"]) {
    const expected = localizedPageUrl(locale, pageName);
    if (linkHref(html, "alternate", locale) !== expected) {
      fail(`${page.file}: ${locale} alternate must be ${expected}.`);
    }
  }
  const defaultUrl = localizedPageUrl("pt-BR", pageName);
  if (linkHref(html, "alternate", "x-default") !== defaultUrl) fail(`${page.file}: x-default alternate must be ${defaultUrl}.`);
  for (const requiredMeta of ["og:image:width", "og:image:height", "og:image:type", "og:image:alt", "twitter:image:alt"]) {
    if (!new RegExp(`<meta\\b[^>]*(?:property|name)=["']${requiredMeta.replace(":", "\\:")}["']`, "i").test(html)) {
      fail(`${page.file}: missing ${requiredMeta} social-image metadata.`);
    }
  }
  const analyticsDisclosure = {
    "pt-BR": "Em amazoniadb.org: métricas agregadas, sem cookies",
    en: "At amazoniadb.org: aggregate metrics, without cookies",
    es: "En amazoniadb.org: métricas agregadas, sin cookies"
  }[page.locale];
  if (!html.includes(analyticsDisclosure)) fail(`${page.file}: missing the localized cookie-free analytics disclosure.`);
  const contactLabel = { "pt-BR": "Contato", en: "Contact", es: "Contacto" }[page.locale];
  if (!html.includes(`<a href="mailto:contato@amazoniadb.org">${contactLabel}</a>`)) {
    fail(`${page.file}: missing the localized project contact link.`);
  }
}

for (const page of homePages) {
  const app = await read(page.app);
  if (!app.includes("mailto:correcoes@amazoniadb.org")) {
    fail(`${page.app}: source corrections must use the dedicated project address.`);
  }
}

const publicEmailAddresses = new Set(["contato@amazoniadb.org", "correcoes@amazoniadb.org"]);
for (const file of [...canonicalPages.map((page) => page.file), ...homePages.map((page) => page.app)]) {
  const emailAddresses = (await read(file)).match(/[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}/g) || [];
  for (const address of emailAddresses) {
    if (!publicEmailAddresses.has(address.toLowerCase())) {
      fail(`${file}: public site files may expose only approved project email aliases (found ${address}).`);
    }
  }
}

for (const alias of legacyPages) {
  const html = await read(alias.file);
  if (!/name=["']robots["']\s+content=["']noindex,follow["']/i.test(html)) fail(`${alias.file}: legacy redirect must be noindex,follow.`);
  if (!html.includes(`new URL("${alias.target}"`) || !html.includes("destination.search = window.location.search") || !html.includes("destination.hash = window.location.hash")) {
    fail(`${alias.file}: legacy redirect must preserve query and hash while targeting ${alias.target}.`);
  }
}

if (!(await read("styles.css")).includes('.domain-button[data-domain="life"] .domain-icon')) {
  fail("styles.css: the forests icon needs its own color treatment.");
}
const siteStyles = await read("styles.css");
for (const selector of [".research-path-panel[hidden]", ".source-set-panel[hidden]", ".catalog-more[hidden]"]) {
  if (!siteStyles.includes(`${selector} { display: none; }`)) {
    fail(`styles.css: ${selector} must not reserve layout space.`);
  }
}
const datasetGridRule = siteStyles.match(/\.dataset-grid\s*\{([^}]*)\}/)?.[1] || "";
if (!/align-items:\s*start/.test(datasetGridRule)) fail("styles.css: catalog cards must align at the top and keep their natural heights.");
for (const rule of siteStyles.matchAll(/\.dataset-card[^,{]*\{([^}]*)\}/g)) {
  if (/(?:^|;)\s*(?:min-)?height\s*:/.test(rule[1])) fail("styles.css: dataset cards must not use fixed or minimum heights.");
}
if (/\.metadata\b/.test(siteStyles)) fail("styles.css: unrelated source facts must not return to pill-style metadata.");
const responsibleUseRule = siteStyles.match(/\.responsible-use\s*\{([^}]*)\}/)?.[1] || "";
const responsibleSummaryRule = siteStyles.match(/\.responsible-use summary\s*\{([^}]*)\}/)?.[1] || "";
if (/border-(?:top|bottom)\s*:/.test(responsibleUseRule) || !/display:\s*inline-flex/.test(responsibleSummaryRule) || !/min-height:\s*44px/.test(responsibleSummaryRule)) {
  fail("styles.css: responsible-use guidance must remain a compact accessible disclosure, not a full-width ruled band.");
}
if (/\.principles-|--(?:on-)?panel\b/.test(siteStyles)) fail("styles.css: removed self-explainer section styles must not return.");

for (const page of homePages) {
  const html = await read(page.file);
  if (/how-it-works|principles-section|We index|Nós indexamos|Indexamos\./i.test(html)) {
    fail(`${page.file}: the removed self-explainer section or one of its links has returned.`);
  }
  for (const id of ["domain-nav", "discover-source", "dataset-grid", "catalog-more", "show-more-sources", "topic", "role", "access", "mode", "time-profile", "more-filters", "more-filter-count", "research-path-panel", "open-research-path", "research-path-choice", "next-research-path", "research-path-summary", "research-path-position", "source-set-panel", "source-set-summary", "source-set-items", "source-set-caution", "source-set-status", "copy-source-set", "download-source-set", "clear-source-set"]) {
    if (!new RegExp(`id=["']${id}["']`).test(html)) fail(`${page.file}: missing #${id}.`);
  }
  const prefix = page.file.includes("/") ? "../" : "";
  const categoryIndex = html.indexOf(`src="${prefix}data/category-presentation.js"`);
  const tagIndex = html.indexOf(`src="${prefix}data/tag-presentation.js"`);
  const catalogIndex = html.indexOf(`src="${prefix}data/catalog.js"`);
  const pathIndex = html.indexOf(`src="${prefix}data/research-paths.js"`);
  const appIndex = html.indexOf(`src="${page.app.replace(/^.*\//, "")}"`);
  if (!(categoryIndex >= 0 && categoryIndex < tagIndex && tagIndex < catalogIndex && catalogIndex < pathIndex && pathIndex < appIndex)) {
    fail(`${page.file}: category, tag, catalog, research-path, and app scripts must load in that order.`);
  }
  for (const [filter, values] of Object.entries(controlledFilterValues)) {
    if (JSON.stringify(selectOptionValues(html, filter)) !== JSON.stringify(values)) {
      fail(`${page.file}: #${filter} options must exactly match the catalog schema vocabulary.`);
    }
  }
  if (JSON.stringify(selectOptionValues(html, "topic")) !== JSON.stringify([""]) || !/data-default-option=["'][^"']+["']/.test(html)) {
    fail(`${page.file}: #topic must start with one localized default option and be populated from the controlled tag vocabulary.`);
  }
  for (const filter of ["role", "mode", "time-profile"]) {
    if (JSON.stringify(selectOptionValues(html, filter)) !== JSON.stringify([""])) {
      fail(`${page.file}: #${filter} must start with one localized default option and be populated from the controlled tag vocabulary.`);
    }
  }
}

for (const [file, expectedScript] of [
  ["submit.html", "submit.js"], ["en/submit.html", "../submit.js"], ["es/submit.html", "../submit.js"]
]) {
  const html = await read(file);
  for (const name of ["temporalCoverage", "spatialResolution", "license", "methodologyUrl"]) {
    if (!new RegExp(`name=["']${name}["']`).test(html)) fail(`${file}: missing optional ${name} input.`);
  }
  if (!html.includes(`src="${expectedScript}"`)) fail(`${file}: does not load ${expectedScript}.`);
}
const submitCategoryLabels = {
  "submit.html": ["Florestas e biodiversidade", "Terra, água e ar", "Terra, fogo e transformação", "Povos e territórios", "Saúde e meios de vida", "Direitos e governança"],
  "en/submit.html": ["Forests &amp; biodiversity", "Earth, water &amp; air", "Land, fire &amp; change", "Peoples &amp; territories", "Health &amp; livelihoods", "Rights &amp; governance"],
  "es/submit.html": ["Bosques y biodiversidad", "Tierra, agua y aire", "Tierra, fuego y cambio", "Pueblos y territorios", "Salud y medios de vida", "Derechos y gobernanza"]
};
for (const [file, labels] of Object.entries(submitCategoryLabels)) {
  const html = await read(file);
  for (const label of labels) {
    if (!html.includes(`>${label}</option>`)) fail(`${file}: category option must use the V2 public taxonomy (${label}).`);
  }
}
if (!(await read("submit.js")).includes("methodologyUrl.setCustomValidity")) fail("submit.js: methodology URL must be validated before a local source record is generated.");

for (const file of ["es/index.html", "es/donate.html", "es/submit.html"]) {
  if (!/<html\s+lang=["']es-419["']/.test(await read(file))) fail(`${file}: Spanish document language must be es-419.`);
}

const sourceIssueTemplate = await read(".github/ISSUE_TEMPLATE/new-source.yml");
for (const id of ["description_pt_br", "description_es", "temporal_coverage_pt_br", "temporal_coverage_es", "spatial_resolution_pt_br", "spatial_resolution_es", "license_pt_br", "license_es"]) {
  if (!sourceIssueTemplate.includes(`id: ${id}`)) fail(`new-source issue template: missing ${id}.`);
}
for (const label of ["Forests & biodiversity", "Earth, water & air", "Land, fire & change", "Peoples & territories", "Health & livelihoods", "Rights & governance"]) {
  if (!sourceIssueTemplate.includes(`- ${JSON.stringify(label)}`)) fail(`new-source issue template: category label must use the V2 public taxonomy (${label}).`);
}
for (const legacyLabel of ["Forest & biodiversity", "Earth, water & climate", "Land use & infrastructure", "Peoples, territories & culture", "Society, health & livelihoods", "Governance, rights & safeguards"]) {
  if (sourceIssueTemplate.includes(`- ${JSON.stringify(legacyLabel)}`)) fail(`new-source issue template: must not expose the legacy category label (${legacyLabel}).`);
}
for (const file of [".github/workflows/check-links.yml", ".github/workflows/quality.yml", ".github/workflows/validate-catalog.yml"]) {
  const workflow = await read(file);
  if (/uses:\s+[^\s#]+@v\d+/i.test(workflow)) fail(`${file}: actions must be pinned to immutable full commit SHAs.`);
  for (const match of workflow.matchAll(/uses:\s+[^\s#]+@([a-f0-9]+)/gi)) {
    if (match[1].length !== 40) fail(`${file}: action pin must be a full 40-character commit SHA.`);
  }
}

const sitemap = await read("sitemap.xml");
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedSitemapLocations = canonicalPages.map((page) => page.url);
for (const location of expectedSitemapLocations) {
  if (!sitemapLocations.includes(location)) fail(`sitemap.xml: missing ${location}.`);
}
if (sitemapLocations.length !== expectedSitemapLocations.length) fail("sitemap.xml: must list exactly the nine canonical localized pages.");
if (new Set(sitemapLocations).size !== sitemapLocations.length) fail("sitemap.xml: contains duplicate <loc> entries.");
if (/\/pt-br\/|hreflang="es-419"/i.test(sitemap)) fail("sitemap.xml: must exclude legacy pt-br aliases and use hreflang=es.");
if (!(await read("robots.txt")).includes("Sitemap: https://amazoniadb.org/sitemap.xml")) fail("robots.txt: sitemap declaration is missing or incorrect.");
for (const file of ["index.html", "en/index.html", "es/index.html", "submit.html", "donate.html", "en/submit.html", "en/donate.html", "es/submit.html", "es/donate.html", "robots.txt", "sitemap.xml", "README.md", "scripts/build-api.mjs"]) {
  if ((await read(file)).includes("github.io/amazoniadb")) fail(`${file}: obsolete GitHub Pages public identity must not remain.`);
}

const browserData = await evaluateBrowserData();
const catalog = browserData.AMAZONIA_CATALOG;
const presentation = browserData.AMAZONIA_CATEGORY_PRESENTATION;
const translations = browserData.AMAZONIA_CATALOG_I18N;
const tagPresentation = browserData.AMAZONIA_TAG_PRESENTATION;
const researchPaths = browserData.AMAZONIA_RESEARCH_PATHS;
if (!Array.isArray(catalog) || !catalog.length) fail("data/catalog.js did not load a non-empty catalog.");
if (!presentation || Object.keys(presentation).length !== 6) fail("data/category-presentation.js must define exactly six categories.");
if (JSON.stringify(Object.keys(presentation || {})) !== JSON.stringify(requiredCategories)) fail("category presentation keys must match the six catalog categories in order.");
for (const [key, item] of Object.entries(presentation || {})) {
  if (!item.icon?.includes("<svg") || !item.id) fail(`${key}: presentation needs an inline SVG icon and stable visual id.`);
  for (const locale of ["en", "pt-BR", "es"]) {
    if (!item.locales?.[locale]?.label || !item.locales?.[locale]?.note) fail(`${key}: missing ${locale} presentation copy.`);
  }
}

const tagFacets = ["topics", "modes", "time", "roles"];
if (!tagPresentation?.vocabulary) fail("data/tag-presentation.js must define the controlled tag vocabulary.");
for (const facet of tagFacets) {
  const vocabulary = tagPresentation?.vocabulary?.[facet];
  if (!vocabulary || !Object.keys(vocabulary).length) fail(`data/tag-presentation.js: ${facet} vocabulary must be non-empty.`);
  for (const [key, copy] of Object.entries(vocabulary || {})) {
    for (const locale of ["en", "pt-BR", "es"]) {
      if (!copy?.[locale]) fail(`data/tag-presentation.js: ${facet}.${key} is missing ${locale} copy.`);
    }
  }
}
for (const record of catalog) {
  // Tags stay optional for a newly submitted draft source: a reviewer adds
  // them before it becomes a deliberate research-path input. Existing tagged
  // records, however, must always validate against the shared vocabulary.
  if (!record.tags) continue;
  for (const facet of tagFacets) {
    const values = record.tags[facet];
    if (!Array.isArray(values) || !values.length || new Set(values).size !== values.length || values.some((value) => !tagPresentation?.vocabulary?.[facet]?.[value])) {
      fail(`${record.id}: ${facet} must use unique, controlled reviewed tags.`);
    }
  }
}

if (!Array.isArray(researchPaths) || researchPaths.length !== 4) fail("data/research-paths.js must define exactly four reviewed research paths.");
const catalogById = new Map(catalog.map((record) => [record.id, record]));
for (const path of researchPaths || []) {
  if (!path.id || !Array.isArray(path.records) || path.records.length < 3 || new Set(path.records.map((entry) => entry.id)).size !== path.records.length) {
    fail(`research path ${path.id || "(unnamed)"}: needs a unique, deliberate set of at least three records.`);
  }
  for (const key of ["shortTitle", "selectorSummary", "title", "summary", "caution"]) {
    for (const locale of ["en", "pt-BR", "es"]) {
      if (!path.locales?.[key]?.[locale]) fail(`research path ${path.id}: ${key} is missing ${locale} copy.`);
    }
  }
  for (const locale of ["en", "pt-BR", "es"]) {
    if ([...(path.locales?.shortTitle?.[locale] || "")].length > 34) {
      fail(`research path ${path.id}: ${locale} shortTitle exceeds the 34-character selector limit.`);
    }
  }
  for (const entry of path.records || []) {
    const record = catalogById.get(entry.id);
    if (!record) fail(`research path ${path.id}: ${entry.id} is not a catalog record.`);
    if (record && record.coverage !== "Brazil") fail(`research path ${path.id}: ${entry.id} must remain Brazil-scoped until the guide is broadened by review.`);
    for (const key of ["role", "reason"]) {
      for (const locale of ["en", "pt-BR", "es"]) {
        if (!entry[key]?.[locale]) fail(`research path ${path.id}: ${entry.id} ${key} is missing ${locale} copy.`);
      }
    }
  }
}

for (const locale of ["pt-BR", "es"]) {
  const translatedDescriptions = translations?.[locale]?.descriptions || {};
  const catalogIds = new Set(catalog.map((record) => record.id));
  const missing = catalog.filter((record) => !translatedDescriptions[record.id]).map((record) => record.id);
  const unusedDescriptions = Object.keys(translatedDescriptions).filter((id) => !catalogIds.has(id));
  if (missing.length) fail(`data/catalog.i18n.js: ${locale} is missing descriptions for ${missing.join(", ")}.`);
  if (unusedDescriptions.length) fail(`data/catalog.i18n.js: ${locale} has unused descriptions for ${unusedDescriptions.join(", ")}.`);
  const resolutions = new Set(catalog.map((record) => record.spatialResolution).filter(Boolean));
  const translatedResolutions = translations?.[locale]?.spatialResolution || {};
  const missingResolutions = [...resolutions].filter((resolution) => !translatedResolutions[resolution]);
  const unusedResolutions = Object.keys(translatedResolutions).filter((resolution) => !resolutions.has(resolution));
  if (missingResolutions.length) fail(`data/catalog.i18n.js: ${locale} is missing spatial-resolution translations for ${missingResolutions.join(", ")}.`);
  if (unusedResolutions.length) fail(`data/catalog.i18n.js: ${locale} has unused spatial-resolution translations for ${unusedResolutions.join(", ")}.`);
  const temporalRecordIds = new Set(catalog.filter((record) => record.temporalCoverage).map((record) => record.id));
  const translatedTemporalCoverage = translations?.[locale]?.temporalCoverage || {};
  const missingTemporalCoverage = [...temporalRecordIds].filter((id) => !translatedTemporalCoverage[id]);
  const unusedTemporalCoverage = Object.keys(translatedTemporalCoverage).filter((id) => !temporalRecordIds.has(id));
  if (missingTemporalCoverage.length) fail(`data/catalog.i18n.js: ${locale} is missing timeframe translations for ${missingTemporalCoverage.join(", ")}.`);
  if (unusedTemporalCoverage.length) fail(`data/catalog.i18n.js: ${locale} has unused timeframe translations for ${unusedTemporalCoverage.join(", ")}.`);
  const licensedRecordIds = new Set(catalog.filter((record) => record.license).map((record) => record.id));
  const translatedLicenses = translations?.[locale]?.licenses || {};
  const missingLicenses = [...licensedRecordIds].filter((id) => !translatedLicenses[id]);
  const unusedLicenses = Object.keys(translatedLicenses).filter((id) => !licensedRecordIds.has(id));
  if (missingLicenses.length) fail(`data/catalog.i18n.js: ${locale} is missing license display text for ${missingLicenses.join(", ")}.`);
  if (unusedLicenses.length) fail(`data/catalog.i18n.js: ${locale} has unused license display text for ${unusedLicenses.join(", ")}.`);
}

const api = JSON.parse(await read("api/v1/catalog.json"));
if (api.apiVersion !== 1) fail("api/v1/catalog.json: apiVersion must be 1.");
if (api.$schema) fail("api/v1/catalog.json: record schema must not be used as an API-envelope $schema.");
if (api.source !== "https://amazoniadb.org/" || api.recordSchema !== "https://amazoniadb.org/data/catalog.schema.json") fail("api/v1/catalog.json: canonical source or recordSchema is missing or incorrect.");
if (api.count !== catalog.length || !Array.isArray(api.records) || api.records.length !== catalog.length) fail("api/v1/catalog.json: count and records must match data/catalog.js.");
if (JSON.stringify(api.records) !== JSON.stringify(catalog)) fail("api/v1/catalog.json: record content or order does not match data/catalog.js.");

await Promise.all(homePages.map((page) => runExplorerSmokeTest(page, browserData)));

const wrangler = await read("wrangler.jsonc");
if (!/"directory"\s*:\s*"\.\/dist"/.test(wrangler) || /"directory"\s*:\s*"\."/.test(wrangler)) {
  fail("wrangler.jsonc: Cloudflare must publish only the curated dist artifact.");
}
if (!/"workers_dev"\s*:\s*false/.test(wrangler) || !/"preview_urls"\s*:\s*false/.test(wrangler)) {
  fail("wrangler.jsonc: Cloudflare's duplicate workers.dev and version-preview hosts must remain disabled.");
}
for (const file of ["404.html", "_headers", "_redirects"]) {
  if (!(await read("scripts/build-site.mjs")).includes(`"${file}"`)) fail(`scripts/build-site.mjs: ${file} must be included in the public artifact.`);
}
if (/publicDirectories|cp\([^\n]*recursive:\s*true/.test(await read("scripts/build-site.mjs"))) {
  fail("scripts/build-site.mjs: public deployment must allowlist files, not copy whole repository directories.");
}

const analyticsBeacon = "https://static.cloudflareinsights.com/beacon.min.js";
for (const file of ["worker.js", "_headers"]) {
  const source = await read(file);
  if (!source.includes(`${analyticsBeacon} `)) fail(`${file}: CSP must allow the unversioned Cloudflare Web Analytics beacon.`);
  if (!source.includes(`${analyticsBeacon}/`)) fail(`${file}: CSP must allow Cloudflare's versioned Web Analytics beacon path.`);
  if (!/connect-src 'self'/.test(source)) fail(`${file}: analytics reporting must remain same-origin.`);
}
for (const file of homePages.map((page) => page.app)) {
  if (/goatcounter|trackEvent\s*\(/i.test(await read(file))) fail(`${file}: contains a retired third-party analytics hook.`);
}

if (errors.length) {
  console.error(`Quality check failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  notes.push(`${catalog.length} catalog records`, "six localized category tiles", "nine public HTML pages", "API mirror aligned");
  console.log(`Quality check passed: ${notes.join("; ")}.`);
}
