---
description: Maintain FEEL doc heads and relations after a meaningful doc change. It refreshes YAML heads, doc_revision/app_version/updated, optional validation stamps, source_of/derived_from symmetry, and the CLAUDE.md catalog. Triggers on /feel-doc or any mention of "update the doc head", "add a doc", "new doc", "bump doc revision", "sync the guides", "fix doc relations".
---

# FEEL doc workflow

Maintains FEEL metadata for docs that changed in a way someone acts on. Light copy edits do not need this; safety/normal ceremony doc changes usually do. Full convention: `docs/conventions/feel.md`.

## 1. Locate or create the doc

- Pick the right folder by `role`: rationale/reference/spec under `docs/`; guides under `docs/guides/`; design/process conventions under `docs/conventions/`; logs under `docs/history/`.
- Assign a stable kebab-case `id` (unique across the catalog). The `id` never changes once set, even if the file later moves.

## 2. Write or refresh the FEEL head

Every doc opens with this block (see `feel.md` §1–3 for field meanings and vocabularies):

```yaml
---
title: <human title>
id: <kebab-id>
role: index | spec | reference | convention | guide | rationale | log | plan
status: living | canonical | draft | plan | deprecated
doc_revision: <integer>
app_version: <app semver current now>
updated: <YYYY-MM-DD today>
source_of: [<ids>]
derived_from: [<ids>]
---
```

- **New doc:** `doc_revision: 1`.
- **Meaningful change:** bump `doc_revision` by 1. Cosmetic touches (typos, formatting, light copy polish, adding the head itself) do **not** bump it.
- Always set `app_version` to the current `CHANGELOG.md` version and `updated` to today. `app_version` is the product anchor; `doc_revision` is only the doc's local ordering counter.
- For UI, runbook, and environment docs that were actually checked against deployed apps, optionally add or refresh `validated_prod_version`, `validated_dev_version`, and `validated_at`. Omit them when no live validation happened.
- A `deprecated` doc also sets `superseded_by: <id>`.

## 3. Maintain relation symmetry

`source_of` / `derived_from` must agree on both ends (`feel.md` §4). After editing relations:

- For every `source_of: [X]` you set, open `X` and confirm it lists this doc in `derived_from` — add it if missing.
- For every `derived_from: [Y]` you set, confirm `Y` lists this doc in `source_of`.
- A dangling relation is a bug. Fix both files in the same change.

## 4. Sync derived docs

If you changed a doc that is a `source_of` others (e.g. `app-user-stories` → the guides):

- Update each derived doc's body to match, then run this skill on it too: bump its `updated`, and set its inherited `app_version` to the source's.
- Derived docs inherit `app_version` from their source — don't give them an independent product clock.

## 5. Refresh the super-index

- If you added, removed, renamed, or re-roled a doc, update the **Doc catalog** in `CLAUDE.md` (and the plain list in `docs/index.md`) so the catalog still matches reality.
- The catalog carries `id · role · read-when · relations` only — **not** version columns. Versions live in the heads. Keep it compact.
- Also update the machine-readable doc registry in `feel.config.yaml` (the `docs:` block — one entry per doc: `id`, `path`, `audience`, `guards`) on the same add/remove/rename/re-role. `feel-repeat` treats this registry as the authoritative doc list, so a missing entry makes the doc invisible to repetition and relation audits. The prose catalogs and this registry must not drift.

## Argument

`$ARGUMENTS` is the doc to create or update (an `id`, a path, or a short description, e.g. `app-user-stories` or `new convention for error copy`). If empty, infer the target from the current change (which doc did the work touch?). If a code change altered app-user behaviour, default to updating `app-user-stories` then syncing the guides.
