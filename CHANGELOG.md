# Changelog

All notable changes to the SORT landing page are documented here.  
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Semver: `major.minor.patch`.

---

## [Unreleased]

### Added
- English localization via Astro native i18n — UA at `/` (default), EN at `/en/`. Typed content dictionaries (`src/i18n/{uk,en}.ts`), shared `LandingPage.astro` body, header language switcher, and a one-time browser-language auto-detect (manual choice wins, SEO-safe). Full coverage: page copy, nav, footer, pricing, FAQ, meta + `hreflang`/`og:locale` + JSON-LD `inLanguage`. Bilingual 404.
- FEEL documentation framework installed — CLAUDE.md super-index, decision log, conventions, core skills (`feel-doc`, `feel-decision`, `feel-repeat`, `feel-session`, `feel-health`)

### Added
- Public SORT guides: a landing-page section and footer link, plus separate onboarding and manager guides in Ukrainian and English.
- Local screenshot-capture tooling, with captured files kept out of the published `public/` directory.

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
