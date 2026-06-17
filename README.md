# apps/landing — SORT marketing site (Astro)

Astro 6 + Tailwind v4 static site, based on the MIT-licensed
[ricoui-saas-template](https://github.com/ricocc/ricoui-saas-template), customized for SORT.
Deploys to **Cloudflare Pages as its own project** (separate from the PWA — keeps SEO clean and
the app bundle lean).

- **Spec / messaging to validate:** [`docs/research/landing-page-definition.md`](../../docs/research/landing-page-definition.md)
- **Jira:** epic [SCRUM-62](https://feelofeel.atlassian.net/browse/SCRUM-62)
- **Language:** Ukrainian (primary audience)

## Run

```bash
npm install
npm run dev      # http://localhost:5200
npm run build    # → dist/   (static)
npm run preview  # serve the built dist/
```

## What's customized vs the template

- `src/pages/index.astro` — the full landing: hero · **manual-ceremony error-surface table** ·
  before/after · how-it-works · 6 feature cards · **«Полиця, як у житті»** (shelf-mirrors-real-life + QoL) ·
  «Хіба Poster не вміє?» objection · pricing · FAQ · **contact form + Telegram CTA**.
- `src/config/site.js` — SORT brand, UA meta/keywords, Telegram **@feelofeel**.
- `src/components/sections/{Header,Footer,Pricing}.astro`, `ui/Logo.astro`, `collections/menu.json` —
  rebranded; nav is in-page anchors.
- `src/styles/global.css` — palette re-toned **blue → coffee** (`--color-primary` etc.).
- Removed all demo routes (blog, changelog, sign-in, features, …) — only `/` and `/404` ship.

## Placeholders — wired in later sessions

- **Screenshots:** the hero/shelf `BrowserFrame`s and the 6 feature cards are labeled (F1–F6).
  Capture on `dev.fefo.pages.dev` with the demo seed → [SCRUM-66](https://feelofeel.atlassian.net/browse/SCRUM-66).
- **Lead form** posts to `/api/lead` — **not wired yet**; currently shows a thank-you state.
  Cloudflare Pages Function → Supabase `leads` → Resend email = [SCRUM-67](https://feelofeel.atlassian.net/browse/SCRUM-67).
- **`public/og.jpg`** is still the template's image — replace + add JSON-LD/CWV pass → [SCRUM-68](https://feelofeel.atlassian.net/browse/SCRUM-68).
- **Domain:** set `PUBLIC_SITE_URL` on Cloudflare Pages once chosen → [SCRUM-69](https://feelofeel.atlassian.net/browse/SCRUM-69).

## Attributions

- Base template: [ricoui-saas-template](https://github.com/ricocc/ricoui-saas-template) — MIT
- Icons in How It Works section: Vectors and icons by <a href="https://www.svgrepo.com" target="_blank">SVG Repo</a> — MIT

## Notes

- `build` runs `astro build` (the template's `astro check` was dropped for iteration speed —
  run `npm run check` separately if you want the type pass).
- `public/robots.txt` is ignored by the repo root `.gitignore` (`*.txt`); `git add -f` it when committing.
