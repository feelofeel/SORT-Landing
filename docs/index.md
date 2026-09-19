---
title: SORT Landing — Documentation Index
id: index
role: index
status: living
doc_revision: 4
app_version: 1.0.0
updated: 2026-09-17
source_of: []
derived_from: []
---

# SORT Landing — Documentation Index

Public entry point to the docs. **Routing and the change-type lookup live in the project super-index, [`../CLAUDE.md`](../CLAUDE.md)** — start there for "I'm changing X, what do I read?". This page is the plain catalog for browsing on GitHub.

Every doc opens with a FEEL head (`id` · `role` · `doc_revision` · `updated` · relations). Read from the opening `---` through the closing `---`; if `head_lines` is declared, continue through that navigation zone. Read [`conventions/feel.md`](conventions/feel.md) for how the system works.

FEFO/SORT is the canonical source for the public guide corpus. The 18 files under `src/content/guides` are generated Ukrainian/English mirrors and must not be edited directly. Their Diátaxis labels describe reader need; audience grouping and landing pages remain the navigation hierarchy.

## Docs

- [`landing-page-definition.md`](landing-page-definition.md) — full page spec: section-by-section copy, layout, lead form, SEO, analytics
- [`lead-followup-templates.md`](lead-followup-templates.md) — lead response email and Telegram templates + outreach playbook
- [`conventions/feel.md`](conventions/feel.md) — the documentation operating system (FEEL v1.5)
- [`conventions/feel-adoption.md`](conventions/feel-adoption.md) — FEEL adoption layers, agent bindings, and scale guidance
- [`history/decisions.md`](history/decisions.md) — append-only decision log (skill-only; see FEEL §6)

## Releases

- [`../CHANGELOG.md`](../CHANGELOG.md) records every deployable Cloudflare Pages commit.
- [`../.claude/commands/sort-release.md`](../.claude/commands/sort-release.md) is the project deployment workflow; the package `prebuild` hook enforces its changelog requirement.
