// Generates the static JSON mirrors at api/v1/catalog.json and
// api/v1/research-paths.json, plus the machine-readable /llms.txt index
// from data/catalog.js and data/research-paths.js. Run via `npm run build:api`
// and commit the updated files in the same pull request.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";

const catalogPath = new URL("../data/catalog.js", import.meta.url);
const researchPathsPath = new URL("../data/research-paths.js", import.meta.url);
const outDir = new URL("../api/v1/", import.meta.url);
const outCatalogFile = new URL("../api/v1/catalog.json", import.meta.url);
const outPathsFile = new URL("../api/v1/research-paths.json", import.meta.url);
const outLlmsFile = new URL("../llms.txt", import.meta.url);

const catalogSource = await readFile(catalogPath, "utf8");
const pathsSource = await readFile(researchPathsPath, "utf8");
const context = { window: {} };
vm.runInNewContext(catalogSource, context);
vm.runInNewContext(pathsSource, context);

const rawRecords = context.window.AMAZONIA_CATALOG;
if (!Array.isArray(rawRecords) || rawRecords.length === 0) {
  console.error("Failed to read AMAZONIA_CATALOG from data/catalog.js");
  process.exit(1);
}

const rawPaths = context.window.AMAZONIA_RESEARCH_PATHS;
if (!Array.isArray(rawPaths) || rawPaths.length === 0) {
  console.error("Failed to read AMAZONIA_RESEARCH_PATHS from data/research-paths.js");
  process.exit(1);
}

const records = rawRecords;

const catalogPayload = {
  apiVersion: 1,
  generated: new Date().toISOString(),
  count: records.length,
  source: "https://amazoniadb.org/",
  recordSchema: "https://amazoniadb.org/data/catalog.schema.json",
  license: "All rights reserved on this index. Each record links to its original provider, who holds their own rights over the underlying data — this JSON is a convenience mirror of AmazoniaDB's curated list, not a redistribution of provider data.",
  records
};

const pathsPayload = {
  apiVersion: 1,
  generated: new Date().toISOString(),
  count: rawPaths.length,
  source: "https://amazoniadb.org/",
  paths: rawPaths
};

const llmsLines = [
  "# AmazoniaDB — Find Amazon Socioenvironmental Data at the Source",
  "",
  "> AmazoniaDB (https://amazoniadb.org/) is an independent, public-interest directory of 100 human-reviewed socioenvironmental datasets, geoportals, and monitoring platforms across the nine jurisdictions of the Amazon basin (Brazil, Peru, Colombia, Bolivia, Ecuador, Venezuela, Guyana, Suriname, and French Guiana). AmazoniaDB is an index, not a repository: data remain with their original publishers.",
  "",
  "## Canonical Machine-Readable Endpoints",
  "- Catalog JSON API (v1, 100 records): https://amazoniadb.org/api/v1/catalog.json",
  "- Guided Research Paths JSON API (v1, 8 paths): https://amazoniadb.org/api/v1/research-paths.json",
  "- Catalog JSON Schema (Draft 2020-12): https://amazoniadb.org/data/catalog.schema.json",
  "- Citation File Format (CFF 1.2.0): https://amazoniadb.org/CITATION.cff",
  "- Portuguese (pt-BR) Explorer: https://amazoniadb.org/",
  "- English (en) Explorer: https://amazoniadb.org/en/",
  "- Spanish (es-419) Explorer: https://amazoniadb.org/es/",
  "",
  "## Citation & Responsible-Use Rules for Researchers and AI Systems",
  "1. **Cite the original provider first**: Always cite the primary institution (`provider`), official dataset (`url`), methodology (`methodologyUrl`), and access terms (`accessUrl`). Cite AmazoniaDB as the discovery and methodological index.",
  "2. **Respect data sovereignty and community authority**: Publicly available territorial polygons, species occurrences, and socioenvironmental indicators are not blanket permission to make claims about Indigenous Peoples, traditional communities, or local tenure.",
  "3. **Do not conflate methodologies across borders or sensors**: Check minimum mapping units, temporal baselines (e.g., August–July PRODES year vs. calendar-year MapBiomas), and administrative stages before aggregating numbers.",
  "4. **Never expose sensitive locations**: Do not combine records to pinpoint threatened species, isolated peoples, or non-public community sites.",
  "",
  "## Guided Research Paths & Cross-Border Methodological Comparability (8 Paths)",
  ""
];

for (const path of rawPaths) {
  const title = path.locales?.title?.en || path.id;
  const summary = path.locales?.selectorSummary?.en || path.locales?.summary?.en || "";
  const caution = path.locales?.caution?.en || "";
  const compPoints = (path.locales?.comparability?.points || []).map((p) => p.en);
  const compSynthesis = path.locales?.comparability?.synthesis?.en || "";
  llmsLines.push(`### ${title} (\`?path=${path.id}\`)`);
  llmsLines.push(`- **Scope**: ${summary}`);
  llmsLines.push(`- **Explorer URL**: https://amazoniadb.org/en/?path=${path.id}#catalog`);
  llmsLines.push(`- **Sources**: ${path.records.map((r) => `\`${r.id}\` (${r.role.en})`).join(", ")}`);
  for (const pt of compPoints) {
    llmsLines.push(`- **Comparability**: ${pt}`);
  }
  if (compSynthesis) {
    llmsLines.push(`- **Synthesis**: ${compSynthesis}`);
  }
  llmsLines.push(`- **Caution**: ${caution}`);
  llmsLines.push("");
}

llmsLines.push("## Curated Dataset Directory (100 Reviewed Sources)");
llmsLines.push("");

const categories = [...new Set(records.map((r) => r.category))];
for (const category of categories) {
  const catRecords = records.filter((r) => r.category === category);
  llmsLines.push(`### ${category} (${catRecords.length} sources)`);
  llmsLines.push("");
  for (const r of catRecords) {
    llmsLines.push(`- **${r.title}** (\`${r.id}\`) — *${r.provider}*`);
    llmsLines.push(`  - Coverage: ${r.coverage} | Kind: ${r.kind} | Timeframe: ${r.temporalCoverage || "N/A"} | Resolution: ${r.spatialResolution || "N/A"}`);
    llmsLines.push(`  - Access: ${r.access}${r.license ? ` (${r.license})` : ""} | Reviewed: ${r.checked}`);
    llmsLines.push(`  - Source URL: ${r.url}`);
    if (r.methodologyUrl) llmsLines.push(`  - Documentation URL: ${r.methodologyUrl}`);
    llmsLines.push(`  - Access Evidence URL: ${r.accessUrl}`);
    llmsLines.push(`  - Description: ${r.description}`);
    if (r.responsibleUse?.note?.en) {
      llmsLines.push(`  - Responsible Use: ${r.responsibleUse.note.en}`);
    }
  }
  llmsLines.push("");
}

await mkdir(outDir, { recursive: true });
await writeFile(outCatalogFile, `${JSON.stringify(catalogPayload, null, 2)}\n`, "utf8");
await writeFile(outPathsFile, `${JSON.stringify(pathsPayload, null, 2)}\n`, "utf8");
await writeFile(outLlmsFile, `${llmsLines.join("\n")}\n`, "utf8");
console.log(`Wrote ${records.length} records to api/v1/catalog.json, ${rawPaths.length} paths to api/v1/research-paths.json, and llms.txt`);
