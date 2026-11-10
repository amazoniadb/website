import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../data/catalog.js", import.meta.url), "utf8");
const context = { window: {} };
vm.runInNewContext(source, context, { filename: "data/catalog.js" });
const records = context.window.AMAZONIA_CATALOG || [];

const countBy = (field) => Object.entries(records.reduce((counts, record) => {
  const value = record[field] || "Unspecified";
  counts[value] = (counts[value] || 0) + 1;
  return counts;
}, {})).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

const complete = (field) => records.filter((record) => record[field]).length;
const missing = (field) => records.filter((record) => !record[field]).map((record) => record.id);
const percent = (value) => records.length ? `${Math.round((value / records.length) * 100)}%` : "0%";
const line = (label, value) => console.log(`${label.padEnd(24)} ${value}`);

console.log("AmazoniaDB catalog evidence report");
console.log("==================================");
line("Records", records.length);
for (const [label, field] of [
  ["Temporal coverage", "temporalCoverage"],
  ["Spatial resolution", "spatialResolution"],
  ["Methodology/docs", "methodologyUrl"],
  ["Access evidence", "accessUrl"],
  ["Named licence", "license"],
  ["Discovery tags", "tags"]
]) {
  const value = complete(field);
  line(label, `${value}/${records.length} (${percent(value)})`);
}

for (const [heading, field] of [["Domains", "category"], ["Geographic coverage", "coverage"], ["Access classifications", "access"]]) {
  console.log(`\n${heading}`);
  for (const [value, count] of countBy(field)) line(`  ${value}`, count);
}

for (const [label, field] of [["No methodology/docs", "methodologyUrl"], ["Spatial grain unset", "spatialResolution"], ["Access evidence missing", "accessUrl"]]) {
  const ids = missing(field);
  if (ids.length) console.log(`\n${label} (${ids.length})\n  ${ids.join("\n  ")}`);
}
