import worker from "../worker.js";

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const assets = {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/missing") return new Response("Not found", { status: 404 });
    return new Response(url.pathname, { headers: { "Content-Type": url.pathname.endsWith(".json") ? "application/json" : "text/html" } });
  }
};

const home = await worker.fetch(new Request("https://amazoniadb.org/"), { ASSETS: assets });
assert(home.status === 200, "canonical home must reach static assets");
assert(home.headers.get("x-content-type-options") === "nosniff", "security headers must be applied");
const homeCsp = home.headers.get("content-security-policy") || "";
assert(homeCsp.includes("frame-ancestors 'none'"), "CSP must prevent framing");
assert(homeCsp.includes("https://static.cloudflareinsights.com/beacon.min.js "), "CSP must allow the unversioned Web Analytics beacon");
assert(homeCsp.includes("https://static.cloudflareinsights.com/beacon.min.js/"), "CSP must allow Cloudflare's versioned Web Analytics beacon path");
assert(homeCsp.includes("connect-src 'self'"), "Web Analytics reports must stay on the same-origin RUM endpoint");

const hostRedirect = await worker.fetch(new Request("https://www.amazoniadb.org/en/?q=water"), { ASSETS: assets });
assert(hostRedirect.status === 308, "www must permanently redirect");
assert(hostRedirect.headers.get("location") === "https://amazoniadb.org/en/?q=water", "www redirect must preserve path and query");

const cleanRedirect = await worker.fetch(new Request("https://amazoniadb.org/es/submit.html?ref=footer"), { ASSETS: assets });
assert(cleanRedirect.status === 308, ".html aliases must permanently redirect");
assert(cleanRedirect.headers.get("location") === "https://amazoniadb.org/es/submit?ref=footer", "clean redirect must preserve query");

const legacyRedirect = await worker.fetch(new Request("https://amazoniadb.org/pt-br/donate"), { ASSETS: assets });
assert(legacyRedirect.headers.get("location") === "https://amazoniadb.org/donate", "legacy Portuguese aliases must resolve to canonical pages");

const api = await worker.fetch(new Request("https://amazoniadb.org/api/v1/catalog.json"), { ASSETS: assets });
assert(api.headers.get("access-control-allow-origin") === "*", "public API must allow cross-origin reads");
assert(api.headers.get("cache-control")?.includes("max-age=300"), "public API needs explicit short caching");

const options = await worker.fetch(new Request("https://amazoniadb.org/api/v1/catalog.json", { method: "OPTIONS" }), { ASSETS: assets });
assert(options.status === 204 && options.headers.get("access-control-allow-methods")?.includes("GET"), "API preflight must be handled");

console.log("Worker edge test passed: canonical redirects, security headers, and public API CORS.");
