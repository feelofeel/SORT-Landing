---
title: FEEL — Documentation Operating System
id: feel
role: convention
status: canonical
doc_revision: 10
feel_version: "1.1"
app_version: 1.35.2
updated: 2026-06-15
source_of: [concurrent-workstreams]
derived_from: []
toc:
  - "§1 The frontmatter head"
  - "§2 Vocabularies"
  - "§3 Versioning"
  - "§4 Relations"
  - "§5 Index-first reading"
  - "§6 Governance"
  - "§7 Ceremony levels"
  - "§8 The skill family"
  - "§9 Adopting FEEL in a new project"
  - "§10 Scope — what FEEL heads are for"
  - "§11 Layers — adopt in stages"
  - "§12 Agent bindings"
  - "§13 Scale envelope"
  - "§14 Quick-reference card"
---

# FEEL — a documentation operating system

**FEEL** is how docs work in a feelofeel project. Git versions code; **FEEL versions docs**. The goal is to *feel light*: quick lookups, few tokens, no soreness from re-reading thousands of lines to find one fact.

It rests on four pillars:

- **F — Frontmatter first.** Every doc opens with a YAML head that declares its identity, role, version, and relations. You learn a doc's place in the system from its first ~12 lines — you never read a body to find out what a doc *is*.
- **E — Explicit, two-way relations.** Authoring relations (`source_of` / `derived_from`) are declared on **both** ends. The doc graph lives in data — checkable by a skill, viewable in Obsidian.
- **E — Evolve with proportional ceremony.** Docs carry `doc_revision` + `app_version` + `updated`, but the process scales with risk: safety work gets full ceremony; light polish does not.
- **L — Light by default.** One super-index (`CLAUDE.md`) routes every task. The **catalog routes; the heads version.** Read the smallest bucket that answers the question.

This file is the spec. It is also the seed of the boilerplate: copy `docs/conventions/feel.md` + the `feel-*` skills + a `CLAUDE.md` skeleton into a new repo and you have FEEL.

---

## 1. The frontmatter head

Every Markdown doc under `docs/` (and `CLAUDE.md`) starts with a YAML head:

```yaml
---
title: Feature Specs & Acceptance Criteria  # human title (may differ from the H1)
id: feature-specs                           # kebab-case, unique, stable — the machine handle
role: spec                                  # see §2
status: canonical                           # see §2
doc_revision: 7                              # integer, bumped on each meaningful content change
app_version: 1.35.2
updated: 2026-05-30                         # YYYY-MM-DD of last meaningful content change
validated_prod_version: 1.10.0              # optional: prod app version observed during validation
validated_dev_version: 1.10.0               # optional: dev app version observed during validation
validated_at: 2026-05-30                    # optional: date of prod/dev validation
source_of: [user-guide, admin-guide]        # docs authored FROM this one (ids)
derived_from: []                            # docs this one is authored FROM (ids)
---
```

`id` is the stable machine handle. It answers "which doc is this?" Filenames can move (a doc relocating to `conventions/` keeps its `id`); links and relations reference the `id`, so nothing downstream breaks on a move.

**Derived docs inherit `app_version` from their source** and declare the back-link:

```yaml
---
title: User Guide
id: user-guide
role: guide
status: canonical
app_version: 1.35.2
updated: 2026-05-30
derived_from: [feature-specs]
source_of: []
---
```

Optional fields, used only when they earn their place:

- `related: [ids]` — non-authoring cross-links worth surfacing in the graph
- `supersedes` / `superseded_by: <id>` — for replaced docs
- `tracker: <external-id-or-url>` — optional back-link to the external work-tracker item (issue/ticket) currently driving this doc's changes. For docs maintained against a live plan in an external tracker. It is a convenience link, **not** part of the authoring graph: no symmetry is enforced, `feel-doc` does not validate it, and it should be removed when the work closes. *Which* tracker a project uses is declared in project data (`feel.config.yaml`), never hard-coded in this spec.
- `validated_prod_version`, `validated_dev_version`, `validated_at` — evidence that a visually or operationally sensitive doc was checked against live environments. Use them for UI, runbook, and environment docs where real deployment state matters; omit them for ordinary conceptual/spec edits.
- `toc: ["§1 Title", "§2 Title", …]` — H2-level section index, for docs with 4+ sections. Lets an AI reader understand the doc's full structure from the head alone and issue a targeted section read instead of loading the body. Generated and maintained by `feel-doc`.
- `head_lines: <int>` — line count of the navigational zone (YAML head + any post-YAML summary block). Tells a reader `Read(limit=N)` to get the full navigational picture. Only useful for docs that carry a post-YAML summary between `---` and the first `##`; omit otherwise.

---

## 2. Vocabularies

**`role`** — what kind of doc this is. Drives where it sits in the catalog and how heavily it's read.

| role | meaning | examples |
|---|---|---|
| `index` | navigational catalog or router | `index`, `feature-router` |
| `spec` | canonical product / feature specification | `feature-specs`, `developer-stories` |
| `reference` | stable factual reference | `invariants`, `glossary`, `api-reference` |
| `convention` | design / style / process choice | `feel`, `ui-design` |
| `guide` | derived how-to for an end user or operator | `user-guide`, `admin-guide`, `local-dev-setup` |
| `rationale` | design rationale / architecture | `architecture` |
| `log` | append-only historical record | `decisions` |
| `plan` | forward-looking plan; may be superseded by reality | `roadmap` |

**`status`** — the doc's lifecycle state.

| status | meaning |
|---|---|
| `living` | continuously updated to track reality |
| `canonical` | the authoritative source for its domain |
| `draft` | work in progress, not yet authoritative |
| `plan` | a plan not yet (fully) realized |
| `deprecated` | superseded; kept for history (set `superseded_by`) |

---

## 3. Versioning

Two stamps are required everywhere; a third binds docs to a **version stream** when the repo has one:

- **`doc_revision`** — *what local revision of this doc is this?* An integer, starting at `1`, bumped by `feel-doc` on each substantive edit. It is only an ordering counter inside the doc's own history, not a product reference and not an identity. Cosmetic touches (typos, adding the head) do **not** bump it.
- **`updated`** — *when was it last true?* The date of the last meaningful content change.
- **`app_version`** — *what was the product when this doc was last made true?* The `CHANGELOG.md` app semver current at `updated`. This is the product anchor: it ties a doc to app reality, so you can see at a glance whether a doc predates a feature.

**Version streams.** `app_version` is one binding of a general idea: a doc anchored to the release stream of the thing it describes. Use the binding that matches the repo:

| Repo shape | Stream field | Anchor |
|---|---|---|
| Shipping app (this repo) | `app_version` | `CHANGELOG.md` semver |
| Library / package | `lib_version` | package manifest version |
| Monorepo | one stream field per package; a doc carries the stream of the package it describes | each package's manifest |
| Docs-only / no release train | **omit the stream field** | `doc_revision` + `updated` carry versioning alone |

A repo without a release train is a first-class FEEL citizen, not an exception — the stream field is required only where a stream exists (Layer 4, §11). Docs describing FEEL itself carry `feel_version` instead (the version of this spec they conform to).

Optional validation stamps answer a narrower question: *which deployed app versions were actually observed when this doc was checked?* Use `validated_prod_version`, `validated_dev_version`, and `validated_at` when the doc's truth depends on seeing prod/dev reality, such as UX conventions, environment maps, and operational runbooks. Do not encode prod/dev versions in `doc_revision`; one doc edit can be conceptual, pre-release, post-release, or inherited from another doc.

**Inheritance ("or their groups/parents").** A derived doc (`derived_from` set) inherits its source's `app_version` — the guides move when the spec moves, not on their own clock. Group docs that share a parent can share a version this way instead of each carrying its own.

**Baseline (FEEL adoption, 2026-05-30).** At rollout every doc is seeded `doc_revision: 1`; `updated` = its known last-content date (from any prior "Last updated" line) or the adoption date; `app_version` = the semver current at that date. Thereafter `feel-doc` maintains all three.

---

## 4. Relations

`source_of` / `derived_from` capture the **authoring** relation: *"this doc is written FROM that one."* The guides are written from the feature spec; therefore:

- `feature-specs` → `source_of: [user-guide, admin-guide]`
- `user-guide` → `derived_from: [feature-specs]`
- `admin-guide` → `derived_from: [feature-specs]`

**Symmetry is law.** Every `source_of: [X]` MUST have a matching `derived_from` entry in `X`, and vice-versa. A dangling relation is a bug; `feel-doc` checks symmetry on every run.

**Links vs relations.** Two layers, on purpose:

- **Body links** use GitHub-flavored Markdown — `[the guide](../guides/user-guide.md)` — so the public repo renders correctly.
- **Relations** in frontmatter use `id`s — the machine-readable, move-proof layer that tools and Obsidian resolve.

**Obsidian is an optional lens.** Because relations are frontmatter `id`s, you can open `docs/` as an Obsidian vault for graph view and backlinks at any time. Nothing *depends* on Obsidian — don't put `[[wikilinks]]` in bodies (they don't render on GitHub).

---

## 5. Index-first reading (the light contract)

**The catalog routes; the heads version.**

- **`CLAUDE.md` is the super-index** — always loaded, the one map. It holds a compact **doc catalog** (`id · role · read-when · relations`) and the **change-type router** (changing X? → read these docs / code / tests). One glance routes any task; you should rarely need to open another doc just to find where to look.
- **The heads carry the versions.** When you need a doc's freshness or lineage, read its ~12-line head — not its body, and not a separate registry.
- **`docs/index.md`** is the public entry point for GitHub browsers: the public/local tier split plus a plain link list. It points at the `CLAUDE.md` super-index for routing rather than duplicating it.

Reading order for any change: `CLAUDE.md` (rules + router) → the bucket's docs → the code anchor → the concept test. Read the smallest bucket that matches; widen only if the task crosses a boundary.

The full traversal, as a contract:

```
CLAUDE.md (always loaded)
  └─ change-type router → which doc + code anchor
       └─ doc head → is it current? (app_version) · role? · relations?
            ├─ [derived_from set?] check source's app_version; if source is newer, read source first
            ├─ [source_of set?]   derived docs inherit app_version; feel-doc syncs them downstream
            └─ doc body → only if head confirms this is the right place
                 └─ code anchor → implementation
                      └─ concept test → executable truth
```

**Traversal rules:**
- Source is authority — on conflict, update source first; `feel-doc` syncs derived docs.
- Check the gap — before treating a derived doc as current, compare its `app_version` to the source's.
- Body links ≠ authoring relations — `[see architecture §4]` is navigation; only `source_of`/`derived_from` is the graph.
- Source + derived pair: read source head → relevant source section → derived head. Read derived body only for role-specific content the source doesn't carry.
- **Staleness rule (standing):** before acting on any doc's content, glance at `app_version`; if it predates the feature you're touching, update body + `/feel-doc` before relying on it.

---

## 6. Governance — the decision log is skill-only

`docs/history/decisions.md` is an append-only `log`. It is written **only** by the `feel-decision` skill — never by hand. Two operations:

- **append** — when a non-obvious decision is made, add one dated row: `| date | decision | codified in |`. The substance goes in the doc named under *codified in* (`architecture`, `invariants`, …), not in the log.
- **prune-audit** — routinely, verify each row's *codified in* target actually contains the decision now. If it does, the row has done its job: prune it. Git retains the full history. This keeps the live log a short rolling window instead of an ever-growing wall.

A decision "graduates" out of the log once it's incorporated elsewhere. The log is a staging area, not an archive — the archive is git.

**Division of labour.** The human owns intent, scope, approval of risky actions, and prune-audit judgment (only rows the human explicitly confirms get pruned — absorption is validated by a human read, not a file-existence check). The AI owns routing, execution, skill invocation per ceremony level, and doc-head maintenance — the human never manually bumps `doc_revision`/`app_version` or hunts for the authoritative file.

### Authoring with AI assistance

Three rules that apply whenever a human edits a FEEL-managed doc directly — in a text editor, via a chat UI, or by pasting into a file:

1. **Match the doc type before writing.** Every CLAUDE.md section should answer: *is this an invariant (must be true every session) or a tactic (how to execute one kind of task)?* Invariants — hard rules, non-negotiable guardrails, always-true workflow steps — belong in the super-index. Tactics — execution style, "when doing X do Y this time", plan-mode behaviour — belong in a decision-log entry, a guide, or said in-session. A tactic in CLAUDE.md adds permanent token cost with session-bounded value; it will be ignored once the model's in-context reasoning supersedes it.

2. **Manual edits need `/feel-doc` to close.** Edit freely; the skill is the hygiene step, not the authoring step. After any free-form addition, run `/feel-doc` to resync `doc_revision`, `updated`, and relations. A doc edited without closing the loop has a stale head — it will read as older than it is and may lose relation symmetry.

3. **Project adaptations live in CLAUDE.md fences, not in the spec.** Changes to `feel.md` propagate to every future FEEL adoption (the `feel_version` field tracks which spec revision a copy derives from). Project-specific rules — custom ceremony levels, domain guardrails, project-specific skill triggers — belong in `CLAUDE.md` behind `<!-- project rules -->` fences or in `feel.config.yaml` PROJECT DATA sections. If you genuinely want to evolve the spec itself, do it intentionally: bump `feel_version` and treat it as a FEEL release.

---

## 7. Ceremony levels

FEEL is not a tax. Pick the smallest ceremony that protects the risk:

| Level | Use for | Required behaviour |
|---|---|---|
| **Safety** | Poster writes, migrations, prod operations, auth, tenancy | Full guardrails: read the governing docs, use the named project skill, update load-bearing docs, record non-obvious decisions, and verify before prod impact. |
| **Normal** | Feature behaviour, user-visible flows, docs, changelog-worthy operator workflow | Sync the relevant spec/docs, add an Unreleased changelog note when behaviour changed, and run focused tests/checks. |
| **Light** | Copy, CSS, visual polish, internal refactors | Inspect nearby context, test only what risk justifies, and skip changelog/version/doc-head churn unless behaviour changed. |
| **Emergency / skip** | Explicit owner request: "skip ceremony", "no ceremony", "skip the skills", "quick one" | Do the work with no routine changelog/doc overhead. Safety ceremony still applies if safety areas are touched; log only safety-relevant actions. |

If a task mixes levels, follow the highest-risk level for the risky part and keep the rest light. The decision log is for choices that constrain future work, not for every implementation detail.

**Version bookkeeping is release-cut only.** While a stream is in flight, it adds `[Unreleased]` bullets and bumps `doc_revision` + `updated` on docs it actually changes. It never bumps `package.json` versions or sweeps `app_version` globally — that is the release cut's job, once, on the integration branch, via `<project>-release`.

---

## 8. The skill family

FEEL ships as skills (`.claude/commands/`). The naming line is the reusability boundary:

- **`feel-*` — framework-generic, portable to any project.** The active core is five skills:
  - `feel-doc` — create or update a doc to the FEEL standard: write/refresh the head, bump `doc_revision`, stamp `app_version` + `updated`, enforce relation symmetry, refresh the `CLAUDE.md` catalog.
  - `feel-decision` — the sole writer of `decisions.md` (append + prune-audit, §6).
  - `feel-repeat` — doc network health check: detects cross-doc staleness, missing relation declarations, within-doc concept duplication, and docs that have grown past the head-count thresholds defined in `docs/feel.config.yaml`. Run after any doc edit (`--diff`) or periodically as a full-graph scan.
  - `feel-session` — session-opening brief: reads git state, open changelog work, and the local planning pointer into a ≤20-line orient. Use at session start, not frequently.
  - `feel-health` — the **success gauge**: doc/skill token-footprint dashboard over `tools/feel/health.mjs` (session floor, per-role budgets, outlier docs). Together with `feel-repeat` it answers "is FEEL set up right and still working here?" — `feel-repeat` audits structural honesty (relations, staleness, duplication), `feel-health` audits weight (is the system still light?). A green pass on both is the objective "yes."
- **`<project>-*` — project-specific, stay with the project:** e.g. `<project>-changelog`, `<project>-migration`. These handle project-specific workflows (versioning, schema changes, API integration scripts).

**The extended set is archived, not deleted.** Eight further `feel-*` skills (`feel-ghost`, `feel-trace`, `feel-shrink`, `feel-contract`, `feel-mistake`, `feel-sibling`, `feel-seed`, `feel-diff`) live in `feel/skills/` — copy one back into `.claude/commands/` to reactivate it. They cover deferred-work queues, vertical feature tracing, doc compression, skill contracts, mistake/sibling analysis, session seeds, and diff extraction; useful at scale, but each adds per-session skill-text cost, so they stay out of the active set until a project earns them.

**Contracts.** Skills that carry a `## Contract` section (`requires / guarantees / never`) are chainable and auditable — the `never` clauses constrain what a skill will do in the hands of an AI that might otherwise hallucinate an action. New skills should always include a contract.

Skill files follow one shape: YAML frontmatter (`description` with triggers) → a first visible line that says what the skill does → numbered workflow steps → a final `## Argument` section. The first line matters in Claude Code UI; make it useful before adding detail.

---

## 9. Adopting FEEL in a new project

Adoption is **layered** — decide how deep to go with §11 first; every step below past step 1 is optional at the shallower layers.

The full seed:

1. Copy this file to `docs/conventions/feel.md`. Keep its `feel_version` — that records which FEEL spec your copy derives from, so when FEEL itself moves you can see the drift. Project-coupled adaptations of the spec belong in your project docs, not edits to the copy; if you fork the spec anyway, keep the original `feel_version` so the divergence point stays visible.
2. Copy the `feel-*` skills into `.claude/commands/`. At minimum: `feel-doc` and `feel-decision`; the recommended core adds `feel-repeat`, `feel-session`, and `feel-health` (§8). The extended set lives in `feel/skills/`.
3. Copy `feel.config.yaml` and replace the **PROJECT DATA** sections (audiences, docs, relations, comparison_groups) with your project's equivalents. Keep the **FRAMEWORK SCHEMA** sections (ceremony_levels, head_count, routine shape) as-is.
4. Start `CLAUDE.md` from the skeleton: **Identity · SUPER-INDEX (catalog + router) · Behavioral guidelines · Project excellency · Sticky facts**. Use `<!-- FEEL framework rules -->` / `<!-- project rules -->` fences to mark which sections are portable.
5. Create `docs/index.md` (public pointer) and `docs/history/decisions.md` (empty log with the skill-only header).
6. Give every doc a FEEL head from day one. The catalog grows itself.
7. Create your own `<project>-*` skills for project-specific workflows (changelog, migrations, API integration scripts). Don't put project-specific logic in `feel-*` skills.

That's the whole framework: heads that self-describe, one index that routes, a log that prunes itself, skills that keep it honest, and a config file with clear framework/project layering.

**Portability constraint.** FEEL is framework-generic — its design decisions, skill contracts, and naming conventions must not depend on any host project's domain, schema, or workflow. The host project may appear as a concrete example (allowed, useful), but never as the reason a FEEL rule exists. When designing a new `feel-*` skill or changing the convention, ask: _does this make sense in a project that has never heard of this codebase's domain?_ If not, it belongs in `<project>-*` or the project's own docs, not here.

**Config layering.** `feel.config.yaml` has two clearly marked layers: **FRAMEWORK SCHEMA** (ceremony levels, head_count thresholds, routine shape — portable) and **PROJECT DATA** (audiences, docs, relations, comparison groups — project-specific). When adopting FEEL, keep the framework sections and replace the project sections.

---

## 10. Scope — what FEEL heads are *for*

FEEL heads solve one specific problem: **the described thing can drift from the describing thing.** A doc describes a feature; the feature changes; the doc doesn't know. `app_version` bridges that gap. `source_of`/`derived_from` make the authoring graph explicit because it isn't structurally enforced anywhere else.

This condition is **absent for code files:**

- A code file IS the current state — it cannot be stale relative to itself.
- The import graph already IS the relationship graph, runtime-enforced (a comment that can drift vs. a module system that fails loudly).
- Git provides authorship, date, and line-level diff — more granular than any header field.

**The heuristic:** apply FEEL heads wherever described and describer can drift independently. Don't apply them where structural enforcement already guarantees consistency.

For code→doc traceability, prefer a central router (CLAUDE.md's change-type table) over per-file concept tags. One router update reaches every file in a module; distributed headers contradict each other silently and give no reverse direction.

---

## 11. Layers — adopt in stages

FEEL is four layers, not one religion. Each layer is independently useful, names what it costs, and requires only the layers below it. **Stopping at any layer is a valid adoption, not a partial one.**

| Layer | What it is | What you get | What it costs |
|---|---|---|---|
| **L1 — Heads** | YAML frontmatter (§1–2) + two-way relations (§4) on every doc | Docs self-describe; staleness and lineage visible from 12 lines; graph checkable | A head per doc; symmetry upkeep on relation changes |
| **L2 — Index** | The super-index file (§5): catalog + change-type router | Any task routes from one map; agents stop exploratory reading | Keeping the catalog and router current as docs/anchors move |
| **L3 — Ceremony** | Proportional process (§7), decision log (§6), the core skills (§8) | Docs stay *true*, not just structured; decisions don't evaporate | ~A few skill runs per working session (measured low single-digit % of session tokens in the host project) |
| **L4 — Release machinery** | Version streams (§3), release-cut sweeps, changelog discipline, worktree protocol | Docs anchored to shipped reality; "does this doc predate the feature?" answerable at a glance | A release-cut routine; only meaningful where a release train exists |

Typical mappings: a docs-only or library repo stops at L2; a maintained product takes L3; a shipping app with releases takes L4. The layers also name the sales boundary: L1–L2 are the portable artifact anyone can fork; L3–L4 are the practice.

---

## 12. Agent bindings

The heads/index/relations core (L1–L2) is plain Markdown and YAML — **agent-agnostic by construction**. Only two things bind to a specific tool, and both have cheap equivalents:

- **The super-index file.** `CLAUDE.md` is the Claude Code binding. The cross-agent convention is `AGENTS.md` (read by Codex, Cursor, Copilot, and others). Pick **one canonical file** for the content and make the other a one-line pointer at it — never maintain two divergent copies (that breaks "one map", §5). Claude-first repos (like this one) keep `CLAUDE.md` canonical with `AGENTS.md` pointing in; agent-mixed or public repos should author `AGENTS.md` as canonical and point `CLAUDE.md` at it.
- **Skills.** `.claude/commands/` is Claude Code's slash-command binding. A skill file is just a Markdown prompt with a contract — in any other agent it degrades gracefully to a **runbook**: reference it from the index, paste it, or wire it into that agent's equivalent (Cursor rules, Copilot prompt files). The `## Contract` section is what makes a skill auditable anywhere; the slash command is convenience, not substance.

Everything else — heads, relations, the router table, the decision log, ceremony levels — is tool-free text. An agent that can read files can run FEEL.

---

## 13. Scale envelope

Honesty about what's tested versus designed:

**Tested envelope (the host project): ~25 docs, one operator, one agent.** Inside it, one super-index routes everything and head upkeep is background noise. Beyond it, the following is **design guidance, not proven practice** — it says how FEEL is built to stretch, pending evidence:

- **Many docs (~50+).** Split the catalog by domain: the root index keeps the change-type router and a short catalog *of sub-indexes*; each domain gets its own `index`-role doc. "One map" means **one root**, not one flat list — depth is allowed, divergence is not. Keep any single router table under ~15 rows; past that, rows stop being scannable and the router needs a domain split.
- **Multiple operators.** The conflict surfaces are known and mostly mechanical: `doc_revision` collisions resolve as *take max + 1* (it's an ordering counter, not meaning); `updated` takes the later date; relation edits conflict like any code merge. Two rules prevent the painful cases: **version-stream sweeps are single-owner** (one person cuts the release; nobody else bumps stream fields mid-flight — already the law in §7), and **the decision log stays skill-only**, which serializes its writes.
- **Multiple agents / mixed tools.** Covered by §12 — bindings differ, the text layer is shared.

When a project crosses the envelope, treat the first month as an experiment and feed what breaks back into this section.

---

## 14. Quick-reference card

```
Starting a change?           → CLAUDE.md change-type router first
Reading a derived doc?       → compare its app_version to source's; if source newer, read source first
Choose ceremony level        → safety / normal / light / emergency-skip (§7)
Editing a source doc?        → feel-doc only for meaningful action-changing edits
Doc looks stale?             → update body + /feel-doc before relying on it
Behaviour changed?           → /<project>-changelog Unreleased note
Non-obvious decision?        → /feel-decision (never hand-edit decisions.md)
Schema change?               → /<project>-migration (files first, then apply)
Solo work?                   → commit directly to main (PR for sweeping changes)
≥2 parallel streams?         → node tools/worktree.mjs new <slug> (ws/<slug> worktree each)
Finishing a stream?          → node tools/worktree.mjs done <slug>
Ready to release?            → /<project>-release (version bump + doc sweep + CHANGELOG cut)
Too many permission prompts? → /fewer-permission-prompts
```

If Claude misses a skill, tune the trigger phrases in that skill's `description:` frontmatter — the cheapest fix before reaching for settings.json hooks.
