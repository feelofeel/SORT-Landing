---
title: SORT Landing — Engineering Brief & Super-Index
id: super-index
role: index
status: living
doc_revision: 1
app_version: 1.0.0
updated: 2026-06-16
source_of: []
derived_from: []
---

# SORT Landing — Engineering Brief & Super-Index

**SORT Landing is a Ukrainian-first Astro 6 + Tailwind v4 static marketing site** for SORT — the expiry-awareness layer on top of Poster POS for Ukrainian cafés. It lives on its own domain and Cloudflare Pages deployment, separate from the FEFO PWA. The one thing that must always be true: a café visitor understands within one scroll what SORT saves them — spoilage → revenue, expiry-first.

Docs run on **[FEEL](docs/conventions/feel.md)** — this file is the super-index.

---

## Super-index

**The catalog routes; each doc's head versions.** For a doc's freshness or lineage, read its ~12-line YAML head — not its body. To route a task, scan the change-type table below.

### Doc catalog

- **Specs:** [landing-page-definition](docs/landing-page-definition.md) — full page definition, section-by-section copy + layout spec; source for all copy changes
- **Conventions:** [feel](docs/conventions/feel.md) — operating spec; FEEL v1.1 · [feel-adoption](docs/conventions/feel-adoption.md) — layers, adoption steps, agent bindings, scale
- **Planning & history:** [decisions](docs/history/decisions.md) *(log — skill-only)*
- **Indexes:** [index](docs/index.md) *(public GitHub entry)* · this file *(super-index)*

### Change-type router

| Changing… | Read first | Code anchor |
|---|---|---|
| Page copy / UA + EN text | [landing-page-definition](docs/landing-page-definition.md) | `src/i18n/{uk,en}.ts` (strings) · `src/components/LandingPage.astro` (markup) |
| Lead form / API | [landing-page-definition](docs/landing-page-definition.md) §lead-form | `functions/api/lead.ts` · form markup+script in `src/components/LandingPage.astro` |
| SEO / meta / JSON-LD / i18n | [landing-page-definition](docs/landing-page-definition.md) §SEO | `src/layouts/Meta.astro` (hreflang/og) · `src/components/widgets/Schema.astro` · `astro.config.mjs` i18n |
| Analytics / Plausible | [landing-page-definition](docs/landing-page-definition.md) §analytics | `src/components/widgets/TrackGa.astro` · `src/assets/js/main.js` |
| Nav / menu / language switch | — | `nav` in `src/i18n/{uk,en}.ts` · `src/components/ui/LangSwitcher.astro` (`menu.json` now unused) |
| Layout / design / CSS | — | `src/layouts/Layout.astro` · `src/styles/` |
| Env vars / secrets | — | `.env.example` |
| FEEL docs / CLAUDE.md | [feel](docs/conventions/feel.md) · [feel-adoption](docs/conventions/feel-adoption.md) | — |

---

<!-- FEEL framework rules -->
## Behavioral guidelines

### Absolute rules

- **Ukrainian copy is primary.** All user-visible strings are Ukrainian-first. Never revert to English without explicit instruction.
- **Never use PowerShell `Set-Content` / `Out-File` on `.md` or `.astro` files with Ukrainian text.** PowerShell 5.1 defaults to UTF-16 LE with BOM, which double-encodes existing UTF-8 and corrupts Cyrillic characters. Use `Bash` tool for any doc-head sweeps: `sed -i 's/old/new/' file`.
- **`docs/history/decisions.md` is skill-only.** Never hand-edit it — only `/feel-decision` may write it.

### How to work in this codebase

1. **Route via this file first.** Scan the change-type table above; open the smallest matching bucket.
2. **Choose ceremony by risk.** Copy / CSS / visual polish → light (no changelog churn). Form / analytics / env → normal (note in CHANGELOG.md [Unreleased]). CF Pages env / Supabase / prod ops → safety (full guardrails, verify before prod impact).
3. **Give every new `.md` doc a FEEL head.** Run `/feel-doc` after creating or meaningfully editing a doc.
4. **Log non-obvious decisions with `/feel-decision`.** The substance goes in the "codified in" doc first.
5. **This is a static Astro build.** `pnpm build` is the only required CI step. No migrations, no app DB — the `leads` table lives in the FEFO App Supabase project (see sticky facts).

---

## Project excellency

- **FEEL docs self-describe and route cheaply.** Every doc under `docs/` carries a FEEL head. The catalog here is the one map — don't add a doc without updating it.
- **The decision log is append-only and skill-only.** `/feel-decision` appends; rows are pruned once absorbed elsewhere; git is the archive.
- **Ceremony is proportional.** Safety work (CF Pages env, Supabase keys) gets full ceremony. Light polish (copy tweaks, CSS) skips changelog/version churn.
- **Ukrainian text safety.** File writes on Ukrainian content must use UTF-8 (Bash/Write tool). Never PowerShell `Set-Content`.

**Skill family.** `feel-*` are framework-generic: `feel-doc`, `feel-decision`, `feel-repeat`, `feel-session`, `feel-health`. No `sort-*` project skills yet — add them as project-specific workflows emerge (e.g. `sort-release` when a release train exists).
<!-- /FEEL framework rules -->

---

## Sticky facts

- **FEEL:** v1.1 (synced 2026-06-26 · [framework repo](https://github.com/feelofeel/feel)) · split adopted: feel.md (operating spec, dr:11) + feel-adoption.md (layers/adoption/scale, dr:1)
- **Jira epic:** SCRUM-62 (children: 63 infra/accounts, 64 Astro build DONE, 65 UA copy, 66 screenshots Dee, 67 lead form+analytics DONE, 68 SEO/CWV DONE, 69 domain Dee)
- **Supabase project:** `demlkcxujqtdbtppqmvl` (FEFO App prod — `public.leads` table, RLS on, no policies yet)
- **CF Pages env vars needed:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `PUBLIC_PLAUSIBLE_DOMAIN`, `PUBLIC_SITE_URL`
- **Build:** `pnpm build` → `dist/`; `functions/api/lead.ts` → CF Pages Function (auto-detected)
- **Package version:** 1.0.0 (no release train yet; omit `app_version` stream until CHANGELOG discipline is established)
- **Pending (Dee):** domain SCRUM-69, screenshots SCRUM-66, CF Pages env vars (SCRUM-63 partial)
