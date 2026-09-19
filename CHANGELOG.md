# Changelog

All notable changes to the SORT landing page are documented here.  
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Semver: `major.minor.patch`.

---

## [Unreleased]

### Deployed
- 2026-08-21 16:14 EEST — [`9eec3cd`](https://github.com/feelofeel/SORT-Landing/commit/9eec3cd378766c9f3509a09b565f563d3423c881): upgraded the build toolchain from Astro 6 to Astro 7, including the matching MDX, RSS, Lucide, Vite, and validation dependencies.
- 2026-08-21 16:01 EEST — [`5c57f75`](https://github.com/feelofeel/SORT-Landing/commit/5c57f75f1088a0b71d7826d9ab197817f488c2a9) (feature commit [`ebb7042`](https://github.com/feelofeel/SORT-Landing/commit/ebb7042ab7ea869b3d329aa117d38efb86da38b3)): published the landing-page product visuals, refreshed the social preview, added OG image metadata, and replaced the hero screenshot placeholder with the upcoming-video state.

### Added
- English localization via Astro native i18n — UA at `/` (default), EN at `/en/`. Typed content dictionaries (`src/i18n/{uk,en}.ts`), shared `LandingPage.astro` body, header language switcher, and a one-time browser-language auto-detect (manual choice wins, SEO-safe). Full coverage: page copy, nav, footer, pricing, FAQ, meta + `hreflang`/`og:locale` + JSON-LD `inLanguage`. Bilingual 404.
- FEEL documentation framework installed — CLAUDE.md super-index, decision log, conventions, core skills (`feel-doc`, `feel-decision`, `feel-repeat`, `feel-session`, `feel-health`)
- Public SORT guides: a landing-page section and footer link, plus separate onboarding and manager guides in Ukrainian and English.
- Local screenshot-capture tooling, with only curated product visuals committed to the published `public/` directory.
- A project-specific `sort-release` workflow and build-time release-doc check; every Cloudflare preview or production deployment must add a `CHANGELOG.md` entry, and governed docs are closed through `feel-doc` when they changed meaningfully.
- Lead follow-up templates and outreach playbook (`docs/lead-followup-templates.md`), registered in the doc catalog and super-index.

### Changed
- Synchronized the published Ukrainian and English SORT guides from [FEFO `6392b31`](https://github.com/feelofeel/fefo/commit/6392b31f7437419e8c8d3f4567fff1f3f2119ab3).
- Upgraded the site from Astro 6.4 to Astro 7.2 and aligned the Astro integrations and Vite dependency.
- Published the F1/F6 product visuals, improved their responsive framing, refreshed `og.jpg`, and added explicit Open Graph/Twitter image metadata.

### Fixed
- Added lead form abuse controls before Supabase persistence and notification fan-out, removed raw Supabase error-body logging, and stopped serving untracked screenshot JPGs.

---

## [1.0.0] — 2026-06-16

### Added
- Astro 6 + Tailwind v4 static site scaffold (SCRUM-64)
- Ukrainian-first landing copy: hero, problem table, how-it-works, features, pricing, FAQ (SCRUM-65)
- Lead capture form with UTM passthrough and thank-you state (SCRUM-67)
- Cloudflare Pages Function `functions/api/lead.ts` writing to `public.leads` in FEFO App Supabase
- Plausible analytics integration with funnel events (SCRUM-67)
- SEO: `lang="uk"`, canonical URL, hreflang, JSON-LD via `Schema.astro`, sitemap (SCRUM-68)
- `.env.example` with all required CF Pages environment variables
