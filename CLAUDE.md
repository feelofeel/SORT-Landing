---
title: SORT Landing — Engineering Brief & Super-Index
id: super-index
role: index
status: living
doc_revision: 4
app_version: 1.0.0
updated: 2026-09-17
source_of: []
derived_from: []
toc: ["Super-index", "Behavioral guidelines", "Project excellency", "Sticky facts"]
---

# SORT Landing — Engineering Brief & Super-Index

**SORT Landing is a Ukrainian-first Astro 7 + Tailwind v4 static marketing site** for SORT, the expiry-awareness layer on top of Poster POS. It deploys independently to Cloudflare Pages. Core promise: within one scroll, a café visitor understands spoilage → revenue, expiry-first.

Docs run on **[FEEL](docs/conventions/feel.md)** — this file is the super-index.

---

## Super-index

**The catalog routes; each doc's head versions.** For freshness or lineage, read YAML from the opening `---` through its closing `---`; if `head_lines` exists, continue through that declared navigation zone. Use `audience`, `diataxis`, relations, and `toc` to decide whether a body is relevant. To route a task, scan the change-type table below.

### Doc catalog

- **Specs:** [landing-page-definition](docs/landing-page-definition.md) — full page definition, section-by-section copy + layout spec; source for all copy changes
- **Guides & Outreach:** [lead-followup-templates](docs/lead-followup-templates.md) — lead response email and Telegram templates + outreach playbook
- **Conventions:** [feel](docs/conventions/feel.md) — operating spec; FEEL v1.5 · [feel-adoption](docs/conventions/feel-adoption.md) — layers, adoption steps, agent bindings, scale
- **Planning & history:** [decisions](docs/history/decisions.md) *(log — skill-only)*
- **Release history:** [CHANGELOG](CHANGELOG.md) *(every deployable commit)* · `sort-release` *(project deployment workflow)*
- **Indexes:** [index](docs/index.md) *(public GitHub entry)* · this file *(super-index)*

### Change-type router

| Changing… | Read first | Code anchor |
|---|---|---|
| Page copy / UA + EN text | [landing-page-definition](docs/landing-page-definition.md) | `src/i18n/{uk,en}.ts` (strings) · `src/components/LandingPage.astro` (markup) |
| Public guide source / classification | FEFO/SORT `docs/public/{uk,en}` plus its super-index | Generated mirror: `src/content/guides/{uk,en}` — never edit directly · exporter lives in FEFO/SORT `tools/docs/export-public.mjs` |
| Guide routes / rendering / schema | [feel](docs/conventions/feel.md) §5 | `src/content.config.js` · `src/lib/guides.ts` · `src/pages/{guides,en/guides}` |
| Lead form / API / Outreach | [landing-page-definition](docs/landing-page-definition.md) §lead-form · [lead-followup-templates](docs/lead-followup-templates.md) | `functions/api/lead.ts` · form markup+script in `src/components/LandingPage.astro` |
| SEO / meta / JSON-LD / i18n | [landing-page-definition](docs/landing-page-definition.md) §SEO | `src/layouts/Meta.astro` (hreflang/og) · `src/components/widgets/Schema.astro` · `astro.config.mjs` i18n |
| Analytics / Plausible | [landing-page-definition](docs/landing-page-definition.md) §analytics | `src/components/widgets/TrackGa.astro` · `src/assets/js/main.js` |
| Nav / menu / language switch | — | `nav` in `src/i18n/{uk,en}.ts` · `src/components/ui/LangSwitcher.astro` (`menu.json` now unused) |
| Layout / design / CSS | — | `src/layouts/Layout.astro` · `src/styles/` |
| Env vars / secrets | — | `.env.example` |
| Deployment / release | [CHANGELOG](CHANGELOG.md) · `sort-release` | `tools/release/verify-deploy-docs.mjs` · `package.json` (`prebuild`, `release:check`) |
| FEEL docs / CLAUDE.md | [feel](docs/conventions/feel.md) · [feel-adoption](docs/conventions/feel-adoption.md) | — |

---

<!-- FEEL framework rules -->
## Behavioral guidelines

### Absolute rules

- **Ukrainian copy is primary.** All user-visible strings are Ukrainian-first. Never revert to English without explicit instruction.
- **Never use PowerShell `Set-Content` / `Out-File` on `.md` or `.astro` files with Ukrainian text.** PowerShell 5.1 defaults to UTF-16 LE with BOM, which double-encodes existing UTF-8 and corrupts Cyrillic characters. Use `Bash` tool for any doc-head sweeps: `sed -i 's/old/new/' file`.
- **`docs/history/decisions.md` is skill-only.** Never hand-edit it — only `/feel-decision` may write it.
- **Every deployable commit updates `CHANGELOG.md`.** This includes Cloudflare preview and production builds, regardless of ceremony level. Run `/sort-release`; `pnpm build` enforces the rule through `prebuild`.

### How to work in this codebase

1. **Route via this file first.** Scan the change-type table above; open the smallest matching bucket.
2. **Choose ceremony by risk.** Copy / CSS / visual polish → light; form / analytics / env → normal; CF Pages env / Supabase / prod ops → safety. Ceremony controls spec/head/decision overhead, but every deployable commit still records a concise `CHANGELOG.md` entry.
3. **Give every new `.md` doc a FEEL head.** Run `/feel-doc` after creating or meaningfully editing a doc.
4. **Log non-obvious decisions with `/feel-decision`.** The substance goes in the "codified in" doc first.
5. **Close deployments with `/sort-release`.** It updates the changelog, routes changed behavior to governed docs, invokes `/feel-doc` where needed, then runs `pnpm release:check`, `pnpm test`, and `pnpm build`.
6. **This is a static Astro build.** Run `pnpm test` and `pnpm build` for guide or schema changes. No migrations, no app DB — the `leads` table lives in the FEFO App Supabase project (see sticky facts).

---

## Project excellency

- **FEEL docs self-describe and route cheaply.** Every doc under `docs/` carries a FEEL head. The catalog here is the one map — don't add a doc without updating it.
- **Public guides are generated.** FEFO/SORT is canonical; never edit `src/content/guides` directly. Diátaxis labels describe the reader's need, while audience groups and landing pages route readers through the corpus.
- **The decision log is append-only and skill-only.** `/feel-decision` appends; rows are pruned once absorbed elsewhere; git is the archive.
- **Ceremony is proportional, deployment history is universal.** Light polish may skip governed-doc head churn, but no Cloudflare deployable commit skips `CHANGELOG.md`.
- **Ukrainian text safety.** File writes on Ukrainian content must use UTF-8 (Bash/Write tool). Never PowerShell `Set-Content`.

**Skill family.** `feel-*` are framework-generic: `feel-doc`, `feel-decision`, `feel-repeat`, `feel-session`, `feel-health`. `sort-release` is project-specific and is required for Cloudflare preview and production deployments.
<!-- /FEEL framework rules -->

---

## Sticky facts

- **FEEL:** v1.5 (synced 2026-08-03 · [framework repo](https://github.com/feelofeel/feel)) · delimiter-aware heads and selective Diátaxis publication contracts
- **Guide corpus:** FEFO/SORT is canonical; this repository builds 18 generated files (9 Ukrainian/English pairs) beneath `/guides/` and `/en/guides/`.
- **Jira epic:** SCRUM-62 (children: 63 infra/accounts, 64 Astro build DONE, 65 UA copy, 66 screenshots DONE, 67 lead form+analytics DONE, 68 SEO/CWV DONE, 69 domain DONE)
- **Supabase project:** `demlkcxujqtdbtppqmvl` (FEFO App prod — `public.leads` table, RLS on, no policies yet)
- **CF Pages env vars needed:** `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `PUBLIC_PLAUSIBLE_DOMAIN`, `PUBLIC_SITE_URL` (`LEAD_FROM_EMAIL` and Telegram notification vars are optional; the public Supabase URL is fixed in the function)
- **Build:** `pnpm build` runs the release-doc guard, then emits `dist/`; `functions/api/lead.ts` is auto-detected as a CF Pages Function.
- **Deploys:** Cloudflare Pages Git integration auto-builds branch previews and `main` production commits; GitHub `main` is not branch-protected, so the build lifecycle is the repository-side release gate.
- **Package version:** 1.0.0; deployment history is maintained under `CHANGELOG.md` `[Unreleased]`, while a semantic release-cut train is not yet established.
- **Live:** `https://getsort.app` (landing) · `https://app.getsort.app` (application); curated F1–F6 visuals are published.
- **Pending (Dee):** verify the current CF Pages environment-variable inventory for SCRUM-63; publish/link a privacy notice for lead collection.
