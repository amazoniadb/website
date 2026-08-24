const CANONICAL_ORIGIN = "https://amazoniadb.org";

const canonicalPaths = new Map([
  ["/index.html", "/"],
  ["/submit.html", "/submit"],
  ["/donate.html", "/donate"],
  ["/en/index.html", "/en/"],
  ["/en/submit.html", "/en/submit"],
  ["/en/donate.html", "/en/donate"],
  ["/es/index.html", "/es/"],
  ["/es/submit.html", "/es/submit"],
  ["/es/donate.html", "/es/donate"],
  ["/pt-br", "/"],
  ["/pt-br/", "/"],
  ["/pt-br/index.html", "/"],
  ["/pt-br/submit", "/submit"],
  ["/pt-br/submit.html", "/submit"],
  ["/pt-br/donate", "/donate"],
  ["/pt-br/donate.html", "/donate"]
]);

const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; object-src 'none'; script-src 'self' https://static.cloudflareinsights.com/beacon.min.js https://static.cloudflareinsights.com/beacon.min.js/; script-src-attr 'none'; style-src 'self'; upgrade-insecure-requests",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY"
};

const isPublicApi = (pathname) => pathname.startsWith("/api/v1/");

const responseHeaders = (response, pathname) => {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(securityHeaders)) headers.set(name, value);
  if (isPublicApi(pathname)) {
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    headers.set("Cache-Control", "public, max-age=300, stale-while-revalidate=86400");
  }
  return headers;
};

const canonicalRedirect = (requestUrl) => {
  const url = new URL(requestUrl);
  const canonicalPath = canonicalPaths.get(url.pathname) || url.pathname;
  const needsRedirect = url.protocol !== "https:" || url.hostname !== "amazoniadb.org" || canonicalPath !== url.pathname;
  if (!needsRedirect) return null;

  const destination = new URL(CANONICAL_ORIGIN);
  destination.pathname = canonicalPath;
  destination.search = url.search;
  const redirect = Response.redirect(destination, 308);
  return new Response(null, { status: redirect.status, headers: responseHeaders(redirect, url.pathname) });
};

export default {
  async fetch(request, env) {
    const redirect = canonicalRedirect(request.url);
    if (redirect) return redirect;

    const url = new URL(request.url);
    if (request.method === "OPTIONS" && isPublicApi(url.pathname)) {
      const response = new Response(null, { status: 204 });
      return new Response(response.body, { status: response.status, headers: responseHeaders(response, url.pathname) });
    }

    const assetResponse = await env.ASSETS.fetch(request);
    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers: responseHeaders(assetResponse, url.pathname)
    });
  }
};
