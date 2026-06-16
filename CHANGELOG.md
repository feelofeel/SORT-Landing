# Changelog

All notable changes to the SORT landing page are documented here.  
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Semver: `major.minor.patch`.

---

## [Unreleased]

### Added
- FEEL documentation framework installed — CLAUDE.md super-index, decision log, conventions, core skills (`feel-doc`, `feel-decision`, `feel-repeat`, `feel-session`, `feel-health`)

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
