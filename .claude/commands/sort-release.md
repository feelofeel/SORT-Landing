---
description: Prepare and verify every SORT Landing Cloudflare Pages deployment. Always records the deployment in CHANGELOG.md, syncs governed docs through feel-doc when behavior or documented facts changed, and runs the release checks. Triggers on /sort-release or any mention of deploy, deployment, release, publish, ship, push to production, or Cloudflare Pages preview.
---

# SORT release workflow

Prepare one traceable Cloudflare Pages preview or production deployment.

## 1. Establish the deployment diff

- Read `CLAUDE.md`, then inspect `git status` and the diff that Pages will build.
- For a feature/preview branch, compare with its merge base against `main`. For a
  production commit, compare with the first parent of the commit being deployed.
- Separate already-deployed history from the pending deployment; do not rewrite
  earlier entries unless explicitly reconstructing a missed deployment.

## 2. Close release documentation

- **Always update `CHANGELOG.md`.** Every Pages build is a deployment, including
  branch previews. Add a concise item under `[Unreleased]`; after deployment,
  include the deployed commit and timestamp when they are known.
- **Keep a `### Changed` heading under `[Unreleased]`.** FEFO's guide-sync
  exporter records each sync there and fails when it is missing (a test guards
  this), so re-create the heading if a release cut moves the section away.
- Route changed behavior through the `CLAUDE.md` change-type table. Update the
  authoritative spec or guide when implementation has made it stale.
- After any meaningful governed-doc edit, run the `feel-doc` workflow on the
  affected doc: increment `doc_revision`, set `updated`, preserve optional fields,
  check relation symmetry, and refresh the super-index/config only if structure
  changed. Never apply FEEL heads to `CHANGELOG.md`.
- Run the `feel-repeat --diff` audit after documentation changes. Only
  `feel-decision` may write `docs/history/decisions.md`.

## 3. Verify before the deployment

Run, in order:

```bash
pnpm release:check
pnpm test
pnpm build
```

`pnpm build` invokes `release:check` again through `prebuild`, which is the
non-optional Pages enforcement point. Fix failures; do not bypass the check.

## 4. Verify deployment evidence

- After the push/merge, confirm the Cloudflare Pages check for the exact commit.
- Report preview versus production, the commit SHA, outcome, and deployment time.
- If the deployment fails, keep the changelog entry and correct it in the next
  commit; the attempted change remains useful history.

## 5. Cutting a dated section (occasional, on request)

`[Unreleased]` logs deployments as they ship. Cut it only when Dee decides a
batch is coherent — never per deployment.

1. Rename `## [Unreleased]` to `## [x.y.z] — YYYY-MM-DD` (minor for user-visible
   content or features, patch for fixes only) and keep its body as is.
2. Add a fresh `## [Unreleased]` above it containing an empty `### Changed`
   heading (FEFO's guide-sync exporter requires it).
3. Bump `package.json` `version`, the CLAUDE.md "Package version" fact, and
   `app_version` on governed docs edited that day.
4. Run the section 3 checks; the new release section counts as the changelog record.

## Contract

**Requires**
- A Git worktree with `CHANGELOG.md`, `CLAUDE.md`, and the `feel-doc` workflow
- The deployment diff or commit to be identifiable

**Guarantees**
- Every preview and production deployment has a new changelog record
- Meaningfully affected governed docs are updated and closed through `feel-doc`
- Tests and the production build run with the release-doc guard enabled

**Never**
- Deploys a change with an unchanged or entry-free `CHANGELOG.md`
- Treats `CHANGELOG.md` as a FEEL-headed governed doc
- Hand-edits `docs/history/decisions.md`
- Bypasses a failed release-doc check

## Argument

`$ARGUMENTS` — optional target branch, commit, or short deployment description;
when empty, infer the pending deployment from the current Git diff.
