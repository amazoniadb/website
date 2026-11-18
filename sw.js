// Offline-first resilience for field researchers, journalists, and community
// monitors operating on intermittent connectivity. Caches the static catalog,
// localized explorer pages, and JSON APIs using a network-first strategy with
// transparent cache fallback.
(() => {
  const CACHE_NAME = "amazoniadb-v1.13.1";
  const CORE_ASSETS = [
    "/",
    "/en/",
    "/es/",
    "/styles.css",
    "/theme-bootstrap.js",
    "/theme.js",
    "/app.js",
    "/favicon.svg",
    "/manifest.webmanifest",
    "/data/category-presentation.js",
    "/data/tag-presentation.js",
    "/data/catalog.js",
    "/data/catalog.i18n.js",
    "/data/research-paths.js",
    "/api/v1/catalog.json",
    "/api/v1/research-paths.json",
    "/llms.txt",
    "/CITATION.cff"
  ];

  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(CORE_ASSETS))
        .then(() => self.skipWaiting())
        .catch(() => {})
    );
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches.keys()
        .then((keys) => Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        ))
        .then(() => self.clients.claim())
    );
  });

  self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") return;
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;
    if (url.pathname.startsWith("/cdn-cgi/")) return;

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, copy).catch(() => {});
              if (request.mode === "navigate" && url.search) {
                cache.put(url.pathname, copy.clone()).catch(() => {});
              }
            });
          }
          return response;
        })
        .catch(async () => {
          const direct = await caches.match(request);
          if (direct) return direct;
          if (request.mode === "navigate") {
            const pathMatch = await caches.match(url.pathname);
            if (pathMatch) return pathMatch;
            if (url.pathname.startsWith("/en")) return caches.match("/en/");
            if (url.pathname.startsWith("/es")) return caches.match("/es/");
            return caches.match("/");
          }
          return Response.error();
        })
    );
  });
})();
