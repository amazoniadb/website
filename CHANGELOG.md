# Changelog

All notable changes to AmazoniaDB are documented here. Loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [1.7.0] — 2026-08-24

### Security
- Re-established the public project from a reviewed snapshot with a project-only commit identity and no inherited Git history
- Pinned every GitHub Action to an immutable commit and made source-submission automation require explicit maintainer approval
- Removed contributor usernames from generated catalog records and the public API
- Removed the secondary GitHub Pages deployment surface
- Locked the Cloudflare deployment tool and added a private vulnerability-reporting policy plus `security.txt`
- Removed inline JavaScript from the theme bootstrap so the Content Security Policy no longer needs `unsafe-inline`

### Changed
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
