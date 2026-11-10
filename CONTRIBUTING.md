# Contributing a source

AmazoniaDB is a directory, not a mirror. A useful contribution is a trustworthy path from a research question to the original publisher.

Don't know where to start? `SOURCES-TO-VERIFY.md` lists real institutions we haven't added yet — pick one, verify it, submit it.

The `submit.html` page can create a local source record. It is an aid for preparing a submission, not an automatic publishing channel.

Submitted through the issue form? A maintainer reviews the public proposal and, if it meets the directory standard, prepares the catalog change. Public issues never write to the repository automatically, and contributor usernames are not copied into the catalog or API.

Not sure if something belongs, or want to talk through a source before submitting it? [Open a regular issue](https://github.com/amazoniadb/website/issues/new) so a maintainer can help assess it before a formal submission.

## Two ways to submit

- **Open a pull request** with your entry added to `data/catalog.js` directly (see the record format below). The full `npm run check` quality gate runs automatically on the PR.
- **Open a "New source submission" issue** using the issue form. A maintainer verifies it and prepares any accepted change through the normal pull-request checks. Use `submit.html` first if you want to draft and sanity-check your fields before filling in either path.

## Before adding a record

1. Confirm the link goes to the original publisher, repository, or official data portal.
2. Check the page is still available and record the date in `checked` as `YYYY-MM-DD`.
3. Read the source’s access, attribution, licensing, and redistribution conditions, and record the official evidence page as `accessUrl`.
4. Select the single most useful one of the six categories.
5. Write a brief description of what the source contains—not what you infer from it.
6. Add Portuguese and Spanish display text for the description and every visible optional field you add (`temporalCoverage`, `spatialResolution`, or `license`) in `data/catalog.i18n.js`. Keep formal legal license names canonical when appropriate. The quality gate requires complete localized catalog content.

## Geographic scope

Default to the Brazilian Amazon — that's where open, well-documented portals are easiest to verify. `Peru`, `Colombia`, `Bolivia`, `Ecuador`, `Venezuela`, `Guyana`, `Suriname`, and `French Guiana` are available for a well-verified country- or territory-specific source. Use `Pan-Amazon` or `Global — subsettable` only when a source is genuinely the best option for its topic and no comparable local source exists. A well-verified single-country entry beats a thinner multi-country one added just for coverage.

## Do not add

- copied files, download mirrors, or unauthorised API endpoints;
- data that reveals sensitive species locations, personal information, or restricted cultural knowledge;
- links that obscure the original provider or require users to bypass access controls;
- a claim that a source is “open” when its terms are unclear.

## Review standard

Each source should be reproducible from its card alone: a reader can identify the publisher, coverage, data form, access note, evidence for that note, and source page. When conditions are unclear, use `Provider terms apply` rather than guessing.
