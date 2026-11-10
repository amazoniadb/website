# Changelog

All notable changes to AmazoniaDB are documented here. Loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [1.11.0] — 2026-11-10

### Added
- Four cross-border and pan-Amazon Guided Research Paths (`pan-amazon-forest-mining-pressures`, `andean-amazon-forests-territories`, `pan-amazon-rivers-waters-climate`, `guiana-shield-forests-land`), expanding the reviewed research starter to 8 paths spanning all 9 Amazonian jurisdictions
- Complete spatial-resolution (`100/100`) and methodology/documentation URL (`100/100`) coverage across the 100-record catalog, with full `pt-BR` and `es` translations in `data/catalog.i18n.js`

### Changed
- Differentiated Portuguese (`pt-BR`) terminology between Earth (`Terra, água e ar`) and Land/Soil (`Solo, fogo e transformação` and `Uso do solo`) across `data/category-presentation.js`, `data/tag-presentation.js`, and `submit.html`
- Restored the canonical `"Earth, water & climate"` domain key in `data/catalog.schema.json` and regenerated `api/v1/catalog.json`

## [1.10.0] — 2026-11-10

### Added
- Diacritic-insensitive (NFD) search normalization so unaccented queries (`amazonia`, `indigena`, `agua`) match accented Portuguese and Spanish catalog records
- Multi-token fallback search so multi-word queries (`inpe prodes`, `gbif occurrence`) match across separate metadata fields when no exact phrase match exists
- Interactive active-filter chips bar (`#active-filters`) above the dataset grid for inspecting and clearing individual active filters or resetting all at once
- Interactive pan-Amazon geography strip (`#coverage-strip`) displaying live source counts per country/scope with one-click geographic filtering
- Shareable catalog sorting (`?sort=checked|title|provider`) inside the filter controls

### Changed
- Consolidated `app.js`, `en/app.js`, and `es/app.js` into a single locale-aware `app.js` serving `pt-BR`, `en`, and `es`, eliminating ~1,800 lines of duplicated client code
- Standardized `spatialResolution` lookup in `app.js` to support both record-ID keys and canonical phrase keys
- Synchronized static HTML initial source counters (`#dataset-count`) across all three locale homepages with the 100-record catalog

## [1.9.0] — 2026-11-05

### Added
- 49 reviewed source cards across Colombia, Peru, Bolivia, Ecuador, Venezuela, Guyana, Suriname, French Guiana, Brazil, and pan-Amazon/global coverage, bringing the working catalog to 100 records
- Portuguese and Spanish descriptions and timeframes, controlled discovery tags, and responsible-use notes where territorial, species, census, or community knowledge needs context

### Changed
- Regenerated the local versioned API mirror with all 100 records and updated the catalog expansion roadmap and remaining-source queue
- Updated the coverage-link quality check now that the formerly empty Colombia filter has sources; hardened source-submission translation insertion for maps with trailing commas
- Replaced three stale source links and refreshed the MapBiomas Ecuador and Venezuela collection details from current publisher pages
- Deployed the 100-record site to Cloudflare and verified the live API, localized pages, and repository-path protections

## [1.8.0] — 2026-08-24

### Added
- A provider-controlled evidence URL for every access classification, linked from the existing access fact on each card and included in source-set CSV exports and the public API
- Country and territory coverage values for Venezuela, Guyana, Suriname, and French Guiana, preparing the catalog for deliberate geographic expansion
- A local catalog evidence report covering domain balance, geography, documentation, access evidence, time, spatial grain, licences, and discovery tags

### Changed
- Re-audited all 51 sources against provider-controlled pages, refreshed every review date, and corrected stale descriptions, formats, timeframes, spatial grain, source links, and access classifications where primary evidence supported a change
- Increased direct methodology or technical-document coverage from 18 to 41 sources while leaving ten mixed portals or unstable document links without a misleading one-size-fits-all methodology target
- Tightened the catalog contract so a named licence and the `Dataset-specific license` classification must agree
- Source proposals now require the official page used to assess access or reuse conditions
- Link monitoring now checks distinct source, documentation, and access-evidence URLs without sending duplicate requests
- Corrected MapBiomas Amazonia's publisher links and deferred its reuse label to provider terms after finding conflicting reuse wording on current publisher pages
- Corrected contribution guidance to match the review-only public issue workflow

## [1.7.0] — 2026-08-24

### Security
- Re-established the public project from a reviewed snapshot with a project-only commit identity and no inherited Git history
- Pinned every GitHub Action to an immutable commit and removed the write-capable public source-submission workflow
- Removed contributor usernames from generated catalog records and the public API
- Removed the secondary GitHub Pages deployment surface
- Locked the Cloudflare deployment tool and added a private vulnerability-reporting policy plus `security.txt`
- Removed inline JavaScript from the theme bootstrap so the Content Security Policy no longer needs `unsafe-inline`

### Changed
- Source proposals remain public issues, while only maintainers can prepare catalog changes through reviewed pull requests
- Generated API updates now travel in the same reviewed pull request as catalog changes instead of a workflow writing directly to `main`
- Public project links now point to the AmazoniaDB organization rather than a personal account

## [1.6.3] — 2026-08-24

### Added
- Localized project contact links using `contato@amazoniadb.org` across every canonical page
- A dedicated `correcoes@amazoniadb.org` channel for source corrections, rights concerns, and removal requests

### Changed
- Public source-report messages no longer expose or depend on a maintainer's personal email address
- Repository checks now prevent public site files from exposing the private forwarding destination

## [1.6.2] — 2026-08-24

### Added
- Privacy-first Cloudflare Web Analytics for aggregate visits and real-user page performance, with EU/EEA traffic excluded
- A concise localized footer disclosure and regression coverage for the analytics security boundary

### Changed
- The Content Security Policy permits only Cloudflare's reviewed analytics beacon while keeping reports on the same-origin RUM endpoint

### Fixed
- Replaced the unusable Atlas Brasil link (expired TLS certificate) with PNUD Brasil's current IDHM panel and official methodology

### Removed
- Dormant GoatCounter custom-event hooks that could have exposed dataset or source-set identifiers if accidentally activated

## [1.6.1] — 2026-08-17

### Fixed
- Automated Cloudflare deployments now keep the duplicate `workers.dev` hostname and public version-preview URLs disabled

## [1.6.0] — 2026-08-17

### Added
- Production Cloudflare configuration that can deploy only the reviewed `dist/` artifact
- Permanent HTTPS, apex-domain, clean-URL, and legacy Portuguese redirects
- A real 404 page, baseline browser security headers, and cross-origin access for the public JSON API
- Regression tests for the Worker boundary, canonical redirects, security headers, API CORS, and filter-form submission

### Changed
- `amazoniadb.org` is now the canonical identity in page metadata, hreflang clusters, social previews, sitemap, robots, API metadata, and documentation
- Homepage search markup now describes the visible website and catalog without claiming 51 invisible per-dataset download records
- Social previews include explicit image dimensions, type, and localized alternative text

### Fixed
- Cloudflare no longer serves repository internals such as `.git`, scripts, contributor notes, package metadata, or project documentation
- Pressing Enter in catalog search no longer reloads the page and loses the active query
- Replaced two broken MapBiomas links with current official source and methodology URLs

## [1.5.1] — 2026-08-11

### Changed
- Catalog cards now follow their content instead of stretching to a shared height, with one continuous icon-led facts list and two predictable action rows
- Topic filters, format labels, source facts, and utility actions now have distinct visual treatments instead of competing pill styles
- Responsible-use notes are compact disclosures that expand in place only when needed
- Guided-path selectors use short names, with their scope shown directly below and the full research question retained in the opened path

### Removed
- The large “How AmazoniaDB works” marketing section and its duplicate navigation links; essential provenance and terms remain beside sources and in the project documentation

### Fixed
- Large blank spaces, forced card heights, erratic action wrapping, and unnecessarily long licence labels in catalog cards
- Long guided-path options no longer truncate inside the native selector at supported widths

## [1.5] — 2026-08-11

### Added
- Source sets of up to six records, with a shareable URL and portable CSV export
- Purpose filtering from reviewed research-role tags, plus collapsed data-type, time-profile, and access filters
- Visible source formats on every card and optional reviewed responsible-use notes beside sensitive territorial, community, incident, and species-location sources
- Data Zoom Amazônia as a complementary Brazilian access and preparation layer, bringing the directory to 51 sources

### Changed
- “Verified” language now says “link reviewed,” distinguishing AmazoniaDB's metadata/link check from scientific validation, publisher authority, or community approval
- “Report link” now accepts context, rights, sensitive-information, correction, protocol, and removal concerns without asking people to place sensitive locations in the first message
- Guided paths now use task-oriented language and can add their complete reviewed source set in one action
- Plain-language format labels are localized in Portuguese and Spanish while technical standards keep their canonical names

### Fixed
- Empty and fully expanded views no longer expose a visible “show 0 more sources” control
- Long source names no longer push the source-set tray beyond a narrow mobile viewport; compact controls now meet a 44 px touch target

## [1.4] — 2026-08-03

### Added
- Contributor provenance — entries submitted through the issue pipeline retain the submitter's GitHub handle for review history
- Weekly freshness check flagging entries not re-verified in 180+ days, alongside the existing dead-link check
- Public API mirror at `api/v1/catalog.json`, auto-regenerated on every push to `main` that touches the catalog
- Donate page (`donate.html`, all locales) with a plain explanation of what support covers; no funding route is published until it is verified
- Dark mode, every page, every locale — no flash of the wrong theme on load, follows OS preference until a visitor picks explicitly
- "Report link" button on every catalog card — a pre-filled email, no GitHub account required
- Shareable filtered-view links, per-card citation button, `DataCatalog`/`Dataset` structured data for search engines, and a prompt naming whichever domain has the fewest sources
- `.gitignore` and a PR template with an actual review checklist, after a full repo zip, patch files, and a joke entry all ended up committed to `main` at different points
- Catalog grew from 13 to 45 entries; one outdated source was subsequently removed when its publisher endpoint no longer met the directory's secure-link policy
- Curated gap-fill expansion to 50 sources: pan-Amazon land cover and water, global surface water, Brazilian generation facilities, greenhouse-gas estimates, mining-process context, and the broader national conservation-unit register
- V2 icon-first entry points in English, Portuguese, and Spanish: six accessible category cards, contextual counts, an honest one-source discovery control, reduced-motion behavior, and shareable URLs
- A repository quality gate (`npm run check` and `quality.yml`) covering syntax, catalog integrity, API synchronization, static references, localized explorer behavior, translations, forms, and placeholder content

### Changed
- `coverage` expanded beyond Brazil / Pan-Amazon / Global to include Peru, Colombia, Bolivia, and Ecuador as explicit values
- Category renamed: "Climate, water & air" → "Earth, water & climate"
- API path versioned: `api/catalog.json` → `api/v1/catalog.json`, before it had real external consumers to break
- API envelope now exposes `recordSchema` rather than incorrectly declaring the per-record schema as its own `$schema`
- GitHub Pages now deploys an allowlisted site artifact rather than the entire repository checkout

### Removed
- The tier-badge system ("Community-submitted, schema-valid" vs. "Editorially reviewed" labels on every card) — dropped as not a meaningful contributor incentive
- 4 catalog entries that were single-study academic outputs (a single drone survey, a fixed-date research dataset) rather than ongoing institutional sources
- Placeholder analytics and donation calls-to-action until real, reviewed services are configured

### Fixed
- `scripts/validate-catalog.mjs` had a stale category name after the rename above, silently failing CI on real entries
- Dark mode: the header background was hardcoded rather than tokenized, so it never switched themes — made the wordmark nearly unreadable against itself
- Duplicate API-mirror implementation (a second, uncoordinated `data/catalog.json` + `scripts/build-catalog-json.mjs`) consolidated onto the one CI actually enforces
- Hidden research-path panels no longer reserve empty space above catalog filters; source-page links are no longer labeled as methodology
- Link health checks now keep robot-blocked and transient responses in the workflow summary instead of filing recurring broken-link issues

## [1.2.3] and earlier

Initial launch through incremental fixes: repo structure, GitHub Pages deployment, the six-domain taxonomy, and the first curated entries. Not reconstructed here in full detail — see git history predating this file.
