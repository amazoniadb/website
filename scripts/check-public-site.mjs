// Verifies the allowlisted deployment artifact after build-site.mjs has run.
// Internal contributor and reviewer material must remain in the repository,
// never in the public deployment.
import { access, readFile, readdir } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
const required = [
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
  "data/catalog.js",
  "data/catalog.schema.json",
  "api/v1/catalog.json",
  "en/index.html",
  "es/index.html",
  "pt-br/index.html"
];
const privatePaths = [
  "README.md",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "SOURCES-TO-VERIFY.md",
  ".github",
  ".git",
  "package.json",
  "wrangler.jsonc",
  "worker.js",
  "scripts",
  "docs"
];
const exists = async (path) => {
  try {
    await access(new URL(path, output));
    return true;
  } catch {
    return false;
  }
};
const listFiles = async (directory = output, prefix = "") => {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${prefix}${entry.name}`;
    if (entry.isDirectory()) files.push(...await listFiles(new URL(`${entry.name}/`, directory), `${path}/`));
    else if (entry.isFile()) files.push(path);
  }
  return files;
};

const missing = [];
for (const path of required) {
  if (!(await exists(path))) missing.push(path);
}
const exposed = [];
for (const path of privatePaths) {
  if (await exists(path)) exposed.push(path);
}
const publicEmailAddresses = new Set(["contato@amazoniadb.org", "correcoes@amazoniadb.org"]);
const exposedEmailAddresses = [];
for (const path of await listFiles()) {
  const contents = (await readFile(new URL(path, output))).toString("utf8");
  for (const match of contents.matchAll(/[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}/g)) {
    if (!publicEmailAddresses.has(match[0].toLowerCase())) exposedEmailAddresses.push(`${path}: ${match[0]}`);
  }
}

if (missing.length || exposed.length || exposedEmailAddresses.length) {
  if (missing.length) console.error(`Public artifact is missing: ${missing.join(", ")}`);
  if (exposed.length) console.error(`Public artifact exposes private paths: ${exposed.join(", ")}`);
  if (exposedEmailAddresses.length) console.error(`Public artifact exposes unapproved email addresses: ${exposedEmailAddresses.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log(`Public artifact check passed: ${required.length} required paths present; reviewer material and private forwarding destination excluded.`);
}
