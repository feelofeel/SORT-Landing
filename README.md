---
title: SORT Landing — Repository Guide
id: readme
role: index
status: living
doc_revision: 3
app_version: 1.0.0
updated: 2026-08-21
source_of: []
derived_from: []
audience: [developer]
---

# SORT Landing

Ukrainian-first Astro 7 + Tailwind v4 marketing and documentation site for SORT. It deploys separately from the FEFO/SORT application to Cloudflare Pages.

Start with [`CLAUDE.md`](CLAUDE.md) for task routing and [`docs/landing-page-definition.md`](docs/landing-page-definition.md) for the landing-page specification.

## Public guides

FEFO/SORT is the canonical guide source. Its exporter generates the 18 files (9 Ukrainian/English pairs) in `src/content/guides`; do not edit those generated files directly. Make content and classification changes in FEFO/SORT `docs/public/{uk,en}`, then run that repository's exporter.

Diátaxis labels identify the reader's immediate need—tutorial, how-to, reference, or explanation. They do not replace the audience-first hierarchy: audience grouping and landing pages provide navigation, and landing pages intentionally have no Diátaxis label.

Guide routes are:

- Ukrainian index and articles: `/guides/` and `/guides/<slug>/`
- English index and articles: `/en/guides/` and `/en/guides/<slug>/`

## Develop and verify

```bash
pnpm install
pnpm dev
pnpm release:check
pnpm test
pnpm build
pnpm preview
```

`pnpm test` validates the guide collection, translation pairs, routes, release-doc guard, and article/landing metadata contract. `pnpm build` first runs `pnpm release:check`, then validates the complete static output; the current build emits 23 routes.

Every Cloudflare Pages preview or production commit must add a concise entry to [`CHANGELOG.md`](CHANGELOG.md). Run `/sort-release` before deployment: it closes the changelog, routes meaningful implementation drift to the relevant FEEL-governed docs via `feel-doc`, and runs the release checks. The build-time guard rejects deployable commits without a new changelog record.

## Main locations

- `src/components/LandingPage.astro` and `src/i18n/{uk,en}.ts` — landing UI and localized copy
- `src/content.config.js` — guide metadata schema
- `src/pages/{guides,en/guides}` — guide routes
- `functions/api/lead.ts` — Cloudflare Pages lead endpoint
- `docs/` — FEEL-governed project documentation
- `.claude/commands/sort-release.md` and `tools/release/verify-deploy-docs.mjs` — deployment workflow and enforced changelog gate

The site began from the MIT-licensed [ricoui-saas-template](https://github.com/ricocc/ricoui-saas-template). Icons used in the How It Works section are from [SVG Repo](https://www.svgrepo.com/) under their stated licenses.
