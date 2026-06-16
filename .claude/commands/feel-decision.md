---
description: The only sanctioned writer of docs/history/decisions.md. Append a dated decision row, or run a prune-audit that removes rows already incorporated into architecture.md / invariants.md (git keeps the full history). Triggers on /feel-decision or any mention of "log a decision", "record a decision", "decision log", "prune decisions", "clean the decision log".
---

# FEEL decision-log workflow

`docs/history/decisions.md` is an append-only `log`, and **this skill is its only writer** — never hand-edit the file. It is a short rolling window of recent, not-yet-absorbed decisions, not an archive. Git is the archive. Full rule: `docs/conventions/feel.md` §6.

The file is a set of dated tables grouped by phase, each row: `| date | decision | codified in |`. "Codified in" points to the doc that holds the substance (`architecture`, `invariants`, a spec, etc.).

## Mode A — append (a new decision was made)

Use when a non-obvious choice is made that future work must respect.

1. Confirm it's worth logging: it's non-obvious, and someone could reasonably do the opposite later. Obvious choices don't go here.
2. Put the **substance** in the right home first — `architecture.md` (rationale) or `invariants.md` (load-bearing rule) or the relevant spec. Run `/feel-doc` on that doc.
3. Add **one** row to the most recent phase table (or start a new dated phase heading): `| YYYY-MM-DD | <one-line decision> | <doc> §<section> |`. Keep it to one line — the *why* lives in the codified-in doc, not here.

## Mode B — prune-audit (routine cleanup)

Use periodically, or when the log feels long, to keep it light.

1. For each row, open its "codified in" target and check whether that doc **actually contains** the decision now.
2. If it does → the row has graduated. **Delete it.** Git history preserves it; the codified-in doc is now the source of truth.
3. If it doesn't → leave the row (the decision isn't fully absorbed yet) — or, if you can, absorb it now via `/feel-doc`, then delete the row.
4. Fix any dead links a prune created (a deleted target, a renamed doc).
5. Aim to leave only recent or not-yet-absorbed rows. A short log is the goal.

## After either mode

- Keep the file's FEEL head honest: bump `updated` (and `app_version`) on the log itself.
- Never expand a row into a paragraph here. If it needs explaining, it belongs in the codified-in doc.

## Argument

`$ARGUMENTS` selects the mode: a decision sentence → **append** that decision; `prune` / `clean` / `audit` → run **prune-audit**. If empty, infer from context — a just-made decision means append; a request to tidy means prune.
