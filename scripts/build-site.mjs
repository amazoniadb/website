// Builds the intentionally public deployment artifact. The repository contains
// reviewer notes and contributor material that belong on GitHub, not on the
// public website, so deployment must never upload the whole checkout.
import { cp, mkdir, rm } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const output = new URL("../dist/", import.meta.url);
const publicFiles = [
  "index.html",
  "donate.html",
  "submit.html",
  "app.js",
  "submit.js",
  "theme-bootstrap.js",
  "theme.js",
  "styles.css",
  "favicon.svg",
  "og-image.png",
  "robots.txt",
  "sitemap.xml",
  "404.html",
  ".well-known/security.txt",
  "_headers",
  "_redirects",
  "api/v1/catalog.json",
  "data/catalog.i18n.js",
  "data/catalog.js",
  "data/catalog.schema.json",
  "data/category-presentation.js",
  "data/research-paths.js",
  "data/tag-presentation.js",
  "en/app.js",
  "en/donate.html",
  "en/index.html",
  "en/submit.html",
  "es/app.js",
  "es/donate.html",
  "es/index.html",
  "es/submit.html",
  "pt-br/donate.html",
  "pt-br/index.html",
  "pt-br/submit.html"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of publicFiles) {
  const directory = file.includes("/") ? file.slice(0, file.lastIndexOf("/") + 1) : "";
  if (directory) await mkdir(new URL(directory, output), { recursive: true });
  await cp(new URL(file, root), new URL(file, output));
}

console.log(`Built curated public artifact with ${publicFiles.length} allowlisted files.`);
