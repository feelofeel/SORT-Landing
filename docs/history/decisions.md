---
title: Decision Index
id: decisions
role: log
status: living
doc_revision: 1
app_version: 1.0.0
updated: 2026-06-16
source_of: []
derived_from: []
---

# SORT Landing — Decision Index

A **thin, append-only, skill-only** breadcrumb trail of non-obvious choices. **Only `/feel-decision` writes this file — never hand-edit it.** It is a short rolling window, not an archive: the substance lives in the "codified in" doc, and once a decision is fully absorbed there its row is **pruned** (git keeps the history). Full rule: [`conventions/feel.md`](../conventions/feel.md) §6.

- **Page spec & copy decisions** → [`landing-page-definition.md`](../landing-page-definition.md).
- **What shipped, when** → [`../../CHANGELOG.md`](../../CHANGELOG.md).

---

## Inception (2026-06-16)

| Date | Decision | Codified in |
|---|---|---|
| 2026-06-16 | `public.leads` table lives in FEFO App Supabase project (not a landing-only DB) — obscurity/safety; service-role key stays server-side in CF Pages env only | CLAUDE.md sticky facts |
| 2026-06-16 | Page copy spine: "knowledge exists but scattered/slow → SORT removes the extraction tax; sells expiring first; compounds ordering analytics; visibility layer on top of Poster" — kills old "staff guess/surprise" framing | landing-page-definition.md |
| 2026-06-16 | FEEL installed via `node feel/tools/install.mjs` — portable core (feel-doc, feel-decision, feel-repeat, feel-session, feel-health); project-specific skills deferred until needed | CLAUDE.md §skill-family |
