# AmazoniaDB

AmazoniaDB is a lightweight directory of Amazon socioenvironmental datasets and repositories. It directs people to original publishers rather than mirroring source files.

## Run it

The directory has no application build step. For local review, serve the repository root with any static file server so the production-style clean routes work correctly.

## Languages and public URLs

Portuguese (Brazil) is the default public experience at the site root. English
and Spanish have stable, explicit routes:

- Portuguese (Brazil): `/`
- English: `/en/`
- Spanish: `/es/`

The corresponding `/submit` and `/donate` pages use the same locale
paths. Older `/pt-br/` URLs remain only as compatibility redirects and are not
canonical or included in the sitemap. Language switching preserves the current
catalog filters, selected source, and source set.

For the repository checks, use Node 22 or newer:

```sh
npm run check
```

## Use the data without the site

Every card has a copyable citation and a link to the original publisher. Filters, a single discovered source, the four reviewed paths, and a source set of up to six records are shareable in the URL. A source set can also be downloaded as CSV for an auditable handoff. Paths explain each source's role and limits; neither paths nor source sets are automated analyses or findings. For programmatic use without JavaScript execution, use the versioned API described in [Data & API](#data--api); it is regenerated automatically from the same source of truth.

## Add a source

Use `submit.html` to prepare a source record without sending information to any external service. It checks the required fields, produces a review-ready record, and can copy or download the result locally.

Add an object to `data/catalog.js`. Every entry should have:

- a stable `id`, clear `title`, and original `provider`;
- one of the six approved `category` values;
- a direct `url` to the publisher's dataset or repository page;
- `coverage`, `formats`, `access`, `kind`, a plain-language `description`, and a `checked` date.

Optionally, an entry can also carry `temporalCoverage`, `spatialResolution`, `license`, and `methodologyUrl` — each shown on the card when present, and each collected (as optional fields) by both `submit.html` and the GitHub issue submission form. A reviewer may add a localized `responsibleUse` note when a source needs a specific limitation beside it, plus `protocolUrl` or `communityAuthorityUrl` only when the relevant source or rights-holder explicitly publishes them; these fields never imply permission, consent, or community authority. When a visible metadata field is added, add its Portuguese and Spanish display text in `data/catalog.i18n.js`; formal license names may intentionally remain canonical. Omit rather than guess when one doesn't apply.

Reviewers may also add controlled editorial `tags` with `topics`, `modes`, `time`, and `roles`, defined in `data/tag-presentation.js`. Tags are optional for a new draft submission so a maintainer can classify it carefully before publication; they are discovery aids, not claims about people, territories, consent, or data safety.

Use only a page controlled by the original publisher. Do not imply a dataset is open, downloadable, or redistributable without checking its terms. Do not add sensitive locations, personal data, or community knowledge that should not be indexed.

Run the catalog check after an edit:

```sh
node scripts/validate-catalog.mjs
```

The expected fields and controlled vocabulary are also documented in `data/catalog.schema.json`.

## Review automation

Three workflows in `.github/workflows/` protect the review-record process:

- `validate-catalog.yml` runs `scripts/validate-catalog.mjs` on every pull request touching `data/catalog.js`, `data/catalog.schema.json`, or the validator itself, and on push to `main`.
- `check-links.yml` runs `scripts/check-links.mjs` weekly (and on demand). It flags both dead links and entries whose `checked` date has gone stale (over 180 days), filing or updating one tracking issue and closing it when a recheck is healthy.
- `quality.yml` runs `npm run check` on every pull request and every push to `main`. It checks syntax, catalog fields and duplicate URLs, the API mirror, local public-file references, the nine canonical localized pages, submission fields, translations for every visible catalog field, and placeholder content.

The public issue form collects proposals, but no public issue triggers a write-capable workflow. A maintainer can run `scripts/issue-to-entry.mjs` locally when preparing a reviewed pull request; the submitter's GitHub handle is not copied into the catalog or API.

If your default branch isn't `main`, update the `branches:` values in `validate-catalog.yml` and `quality.yml` to match.

## Data & API

`data/catalog.js` is the source of truth, but it's JS, not JSON — meant to be loaded with a `<script>` tag, not parsed by external tools. For anyone who wants the catalog without parsing JS, there's a plain-JSON mirror:

```
https://amazoniadb.org/api/v1/catalog.json
```

Versioned (`v1/`, not a bare `api/catalog.json`) so the response shape can change later without silently breaking whoever's already reading it — a new version lands at `v2/` alongside it, with `v1/` kept working until it's formally deprecated. See [CHANGELOG.md](CHANGELOG.md) for what's changed.

Regenerate it with `npm run build:api` whenever the catalog changes. The quality gate fails when the API mirror does not exactly match the catalog, so generated output must be included in the same reviewed pull request. Shape:

```json
{
  "apiVersion": 1,
  "generated": "2026-07-28T00:00:00.000Z",
  "count": 51,
  "source": "https://amazoniadb.org/",
  "recordSchema": "https://amazoniadb.org/data/catalog.schema.json",
  "license": "...",
  "records": [ /* same shape as data/catalog.schema.json */ ]
}
```

```js
const { records } = await fetch("https://amazoniadb.org/api/v1/catalog.json").then((r) => r.json());
```

This is a read-only convenience mirror of the index, not a grant of rights to the underlying data — see License below.

## Production deployment

`amazoniadb.org` is the canonical site and runs on Cloudflare Workers Static Assets. The public deployment is deliberately built from the allowlisted `dist/` directory; never deploy the repository root. The Worker adds permanent canonical redirects, baseline security headers, and CORS for the public API.

```sh
npm run deploy:cloudflare
```

That command runs the complete quality gate, rebuilds `dist/`, and deploys using `wrangler.jsonc`. After every infrastructure change, confirm that repository-only paths such as `/.git/config`, `/README.md`, `/scripts/`, and `/docs/` return 404.

## Privacy and measurement

On the official `amazoniadb.org` domain, Cloudflare Web Analytics measures aggregate visits and real-user page performance through automatic injection at the edge. It does not use cookies, and AmazoniaDB keeps the EU/EEA exclusion enabled. Cloudflare Web Analytics does not report URL query strings, so catalog searches, selected source IDs, and shared source sets do not appear in analytics reports.

Analytics reports stay private. Do not publish country or referrer breakdowns with fewer than 10 visits, and do not add dataset-, territory-, community-, citation-, or source-set-level custom events without a new privacy and ethics review.

## Directory policy

- AmazoniaDB stores catalog metadata and links, not data files.
- Access and reuse rules are determined by each original provider.
- Entries must retain provider attribution and a current link-review date. The date records AmazoniaDB's check of the link and catalog metadata, not scientific validation or community approval of the underlying source.
- If a rights holder asks for a listing to be corrected or removed, remove it promptly while the issue is reviewed.

General contact uses `contato@amazoniadb.org`. Source corrections, rights concerns, and removal requests use `correcoes@amazoniadb.org`; every catalog card prepares a message to that address without transmitting anything until the visitor sends it. Both public aliases forward privately, and their destination must not be committed to the repository or exposed in the deployed site.

This is an index, not legal advice. For commercial use, bulk use, redistribution, or data derived from Indigenous territories or sensitive species records, consult the relevant provider terms and applicable law.

## License

All rights reserved — see `LICENSE`. This repository is public for transparency and so outside contributors can propose new catalog entries (see `CONTRIBUTING.md`); it isn't an open-source release, and reuse or redistribution of the code or compiled entries elsewhere requires permission.
