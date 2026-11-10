# Catalog expansion and public-release roadmap

*Checkup date: 2026-11-05*

## Current readout

The working catalog now contains 100 records across the six established
domains. The additions have broadened national coverage while preserving the
existing taxonomy and card model:

| Coverage value | Records |
| --- | ---: |
| Brazil | 31 |
| Global — subsettable | 16 |
| Pan-Amazon | 10 |
| Colombia | 8 |
| Bolivia | 6 |
| Ecuador | 6 |
| Peru | 6 |
| Guyana | 5 |
| Venezuela | 5 |
| Suriname | 4 |
| French Guiana | 3 |

The current evidence report shows time coverage, access-evidence URLs, and
reviewed discovery tags on all 100 records; spatial resolution on 77; and a
methodology or documentation link on 48. Named licences are present on 19
records. Those are evidence counts, not completeness targets: include a named
licence only when the publisher identifies one that clearly applies to the
whole record. Keep spatial grain unset where it is not meaningful or supported.

The 49-record first expansion is complete in the working copy. Its local API
mirror and curated site build contain 100 records. The catalog and site build
were deployed to Cloudflare on 2026-11-05; the live API now returns 100 records.

The foundation is already stronger than a simple link list: the project has a
stable six-domain model, multilingual pages, a versioned JSON API, a documented
schema, source review dates, reviewed issue submissions, and checks that cover
the public build. The existing research-path notes also correctly avoid
presenting a shared tag or geography as scientific compatibility.

## Is reaching the hundreds a good idea?

Yes, as a disciplined growth aim. Reaching 100 has made the directory more
useful and improved its coverage beyond Brazil. Do not make 200 records a hard
launch gate: an arbitrary count can reward duplicate portals, weak sources, or
thin records. Treat 150–200 as a possible later range only if each addition
passes the same evidence and governance standard. A carefully maintained
120-record directory is stronger research infrastructure than a 200-record
list assembled to meet a number.

Keep the current taxonomy and product behavior stable while growing the source
base. Prioritize coverage gaps and distinct source types; do not add automated
rankings, inferred dataset relationships, or new claims about territories just
to make a larger catalogue feel more analytical.

## The 100-record portfolio

The original 51-record baseline and the completed portfolio are shown below.
The 49 additions were distributed by source evidence and geographic gaps; the
resulting domain mix does not need to match the initial forecast exactly.

| Domain | Baseline | Current | Added |
| --- | ---: | ---: | ---: |
| Forest & biodiversity | 7 | 19 | 12 |
| Earth, water & climate | 11 | 19 | 8 |
| Land use & infrastructure | 11 | 19 | 8 |
| Peoples, territories & culture | 7 | 10 | 3 |
| Society, health & livelihoods | 7 | 15 | 8 |
| Governance, rights & safeguards | 8 | 18 | 10 |
| **Total** | **51** | **100** | **49** |

The original domain targets were a planning aid, not a quota. Keep one primary
domain per record and use controlled tags for sources that serve several
questions. If evidence does not support a future target, leave the gap visible.

The table records where the 49 additions landed by catalog coverage. The
original country priorities were useful for directing the search, but they are
not a claim about how many eligible sources exist in each place.

| Coverage | Added | Main source types represented |
| --- | ---: | --- |
| Colombia | 8 | Forest monitoring, hydrometeorology, environmental data, census, protected areas, and territory maps |
| Peru | 5 | Open-data discovery, Amazon research, soil, protected-area monitoring, and census |
| Bolivia | 6 | Forest monitoring, national geospatial portal, land cover, census, territory maps, and hydrometeorology |
| Ecuador | 6 | Biodiversity, hydrometeorology, land cover, census, mapping, and protected areas |
| Venezuela | 5 | Land cover, biodiversity, protected areas, basins, and Indigenous territories |
| Guyana | 5 | Forest monitoring, climate statistics, census, geophysics, and safeguards |
| Suriname | 4 | Land monitoring, forest statistics, census, and biocultural biodiversity |
| French Guiana | 3 | Hydrometric stations, satellite data, and biodiversity |
| Brazil | 3 | Rural-property boundaries, school census, and forest inventory |
| Pan-Amazon | 2 | Community water observations and monitoring networks |
| Global — subsettable | 2 | Protected areas and gridded population estimates |
| **Total additions** | **49** | **Keep only candidates that pass the normal source review** |

The coverage is still uneven. The new entries do not include every source type
in every country, and some national statistics remain thin. Keep those gaps
visible instead of filling them with duplicate records or weak sources.

For the next discovery pass, deepen Brazil and Peru beyond forest monitoring,
screen the remaining leads in Colombia, Bolivia, Ecuador, Venezuela, Guyana,
Suriname, and French Guiana, and include only genuinely transboundary or
global-subsettable sources with a useful Amazon view. The remaining leads are in
[`SOURCES-TO-VERIFY.md`](../SOURCES-TO-VERIFY.md); checked items there identify
records already in the working catalog.

Use the publisher's stable resource page as the unit. A portal may warrant one
record when it is itself a useful discovery service. Split out a dataset only
when it has its own publisher page and materially distinct methods, coverage,
time range, or reuse terms. Do not create separate records for each file,
download format, year, map layer, or mirror. This keeps the record total
meaningful and the link-review workload manageable.

## How large could the source pool be?

I have not found an authoritative count of unique, reviewable datasets for the
Amazon across all eight countries and French Guiana. The national portals show
why there is room to search: on the pages checked for this review, Colombia's
[open-data portal](https://www.datos.gov.co/en/) advertised 8,924 datasets, and
Peru's [national open-data platform](https://www.datosabiertos.gob.pe/) listed
3,643 datasets and 17,477 resources. These are whole-country portal counts, not
Amazon-only counts and not AmazoniaDB-eligible records; resource counts can also
include files or distributions beneath a dataset. Peru's IIAP lists a vegetation
inventory with 6,709 specimen records on its [open-data profile](https://www.datosabiertos.gob.pe/users/jmartineziiap); for this directory that may
still be one source record, not 6,709 entries.

My planning inference is that several hundred distinct resources are plausible
for a carefully curated directory. Thousands of raw records, files, and
observations certainly exist across the upstream catalogs, but a claim of
thousands of distinct AmazoniaDB entries would need an inventory and deduping
exercise first. The right next step is to log portal, search terms, candidate
URLs, eligibility decisions, and reasons for exclusion while the catalog grows
from 100 toward the next milestone. A repeatable pass should cover each national open-data catalog,
environment and geospatial portals, research institutes, and statistical or
public-health offices. Search in local languages and regional spellings, for
example `Amazonía`, `Amazônia`, `bosque`, `floresta`, `bacia`, `cuenca`,
`territorios indígenas`, `uso del suelo`, `hidrología`, `forêt`, and `bosbeheer`,
paired with topics such as biodiversity, water, health, mining, transport, and
protected areas. Record the exact search, source URL, duplicate check, eligibility
result, and a short exclusion reason. That will show whether the well-documented
pool is hundreds or larger without promising a number prematurely.

No seventh knowledge domain is needed for this expansion. Agriculture and
food systems fit land use or livelihoods; mining, roads, and energy fit land
use and infrastructure; public services fit society and livelihoods; and
environmental enforcement or tenure rules fit governance and rights. If those
topics need clearer discovery, add carefully defined tags within the current
domains and reconsider the taxonomy only after real records consistently fail
to fit.

## Expansion stages

### Stage 1 — 51 to 75: completed

The working catalog passed this point while adding the first regional records.
Sources were checked against publisher pages, with access terms, links,
descriptions, formats, coverage, and review dates recorded. Remaining leads are
kept in [`SOURCES-TO-VERIFY.md`](../SOURCES-TO-VERIFY.md).

Avoid letting forest monitoring dominate the additions. For each country or
territory, look for relevant biodiversity, hydrology and climate, health and
livelihoods, governance, and rights sources as well as forest sources. A
country gap is a search priority, not a quota: omit candidates that cannot meet
the review standard.

### Stage 2 — 75 to 100: completed

The working catalog now contains 100 records. New sources fill geographic and
domain gaps while retaining original publisher destinations and distinguishing
portals from individual datasets. Do not count mirrors, alternate viewers, or
duplicate institutional pages unless they represent meaningfully different
resources.

The current coverage and domain matrices are summarized above. Missing
methodology links or spatial resolution remain unset where evidence is
unavailable or the concept does not apply. The API mirror and localized cards
passed the current quality gate.

### Stage 3 — 100 to 150–200: test maintainability

Before a broad public announcement, run at least two normal review cycles with
outside researchers or data stewards. Ask them to find sources for real
research questions, report confusing access labels, and submit corrections.
Use those cycles to refine contribution guidance and the removal or correction
process, not to loosen source standards.

Track more than the record count: country and domain balance, distinct original
publishers, link freshness, completeness of required evidence, corrections,
and the time needed to review a proposal. If the project cannot keep review
dates current, pause expansion and improve maintenance capacity first.

## Public-release gates

The repository is already visible, but its [current licence](../LICENSE) says
all rights reserved. Public visibility, a public catalogue, and an open-source
release are separate decisions. Before announcing an open release:

1. Confirm ownership and release authority with the scholarship or host
   institution, including any terms attached to funded work.
2. Decide separately what rights apply to the application code, catalog
   metadata, schema, and API output. Do not imply that AmazoniaDB grants rights
   to the underlying third-party datasets.
3. Publish the chosen licence and attribution policy only after that review;
   keep the current rights statement until the decision is cleared.
4. Document source inclusion and exclusion criteria, review responsibilities,
   correction and removal handling, and how sensitive or community-governed
   sources are treated.
5. Keep public proposals review-only, retain the three-language submission
   path, and publish a realistic maintainer response expectation.
6. Tag and archive each public catalog/API release so researchers can cite a
   stable snapshot and understand what changed.
7. Complete a final accessibility, mobile, API, and repository-exposure check
   against the deployed site.

These gates preserve the current research framing while making the release
expectations explicit. They do not require changing the six domains or turning
the directory into a data-hosting or analytical service.

## Cloudflare checkup

### Public checks completed

During the initial 2026-11-05 check, before the local 49-record expansion, the
production homepage and versioned catalog API both returned HTTP 200. The API
reported 51 records and a generated timestamp of 2026-08-24. The public response included HTTPS security headers, including
HSTS and a restrictive Content Security Policy. Repository-only paths such as
`/README.md`, `/scripts/`, and `/docs/` returned 404. The API response uses a
five-minute cache lifetime with stale-while-revalidate.

The local Worker code applies canonical redirects, security headers, and API
CORS behavior. The current repository quality gate passes its Worker checks.
After the 100-record release, the homepage, English page, and Spanish page
returned HTTP 200; the live API returned 100 records. Repository-only paths
including `/README.md`, `/.git/config`, `/docs/`, and `/scripts/` still returned
404.

### Account checks still required

This checkout has no authenticated Wrangler session, and no Cloudflare
connector is available here. I could not inspect private deployment history,
request volume, plan limits, Web Analytics settings, or the account-level
EU/EEA exclusion. Confirm those in the Cloudflare dashboard before relying on
the repository's analytics description as a verified account setting.

There is one specific analytics check: a raw fetch of the production homepage
did not contain the Web Analytics beacon script. That does not by itself prove
analytics is disabled, but it means the stated automatic injection was not
confirmed from the public response. Cloudflare documents that automatic
injection depends on proxying and valid HTML, and that a `Cache-Control: public,
no-transform` response prevents injection. Verify the setting and beacon in a
normal browser session before the release.

The Worker configuration sets `run_worker_first: true`, so every request is
sent through the Worker before static asset delivery. That currently lets the
Worker enforce redirects and headers consistently. Cloudflare also supports
selective Worker-first patterns, and requests served directly as static assets
avoid Worker invocations. Review invocation volume and plan limits before
catalog growth or a public campaign; only optimize this if redirects and
security headers remain covered and verified.

Wrangler 4.125.0 reported an available update to 4.158.0 during this checkup.
Handle that as a separate dependency update with the full quality gate and a
staging deployment, not as an unreviewed production change.

## Checks run

- `npm run audit:catalog` — 100 records; time coverage, access evidence, and tags on 100; spatial grain on 77; methodology or documentation on 48; named licences on 19.
- `npm run check` — passed syntax checks, catalog validation, quality checks,
  public-build checks, source-submission checks, and Worker behavior checks.
- `npm run verify:links` — checked 189 links; no confirmed broken URLs remain.
  Twenty-seven responses were inconclusive because publisher sites blocked
  automated requests or timed out. No record is more than 180 days past its
  review date.
- Cloudflare deploy — uploaded the Worker and 15 changed static assets; version
  `27ade8ff-6b34-4e19-8d15-5f2f66ee7281`.
- Production verification — homepage, English/Spanish pages, 100-record API,
  security headers, and repository-file 404 paths checked.

Three source links found stale during the current review were replaced. The
MapBiomas Ecuador and Venezuela cards now point to current collection pages and
name the collection dates shown by those publishers. The Colombia resguardos
card links to current Colombia en Mapas guidance and leaves reuse conditions
with the provider because that portal describes both open and restricted
products.

The Cloudflare deployment was completed. No account settings were changed.

## Cloudflare references

- [Workers Static Assets: configuration and `run_worker_first`](https://developers.cloudflare.com/workers/static-assets/binding/)
- [Workers Static Assets: billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
- [Cloudflare Web Analytics FAQ](https://developers.cloudflare.com/web-analytics/faq/)
