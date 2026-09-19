import { execFileSync } from "node:child_process";
import {
	appendFileSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
	hasAddedChangelogRecord,
	verifyDeployDocs,
} from "../tools/release/verify-deploy-docs.mjs";

function git(cwd: string, ...args: string[]) {
	execFileSync("git", args, { cwd, stdio: "ignore" });
}

describe("release documentation guard", () => {
	it("accepts an added changelog bullet", () => {
		expect(
			hasAddedChangelogRecord(
				"@@ -8,0 +9,1 @@\n+- Published the new landing-page visuals.\n",
			),
		).toBe(true);
	});

	it("accepts a newly cut release section", () => {
		expect(
			hasAddedChangelogRecord("@@ -8,0 +9,1 @@\n+## [1.0.1] — 2026-08-21\n"),
		).toBe(true);
	});

	it("rejects headings and whitespace without a release record", () => {
		expect(hasAddedChangelogRecord("@@ -8,0 +9,2 @@\n+### Changed\n+\n")).toBe(
			false,
		);
	});

	it("blocks a clean deployable commit without a changelog update", () => {
		const cwd = mkdtempSync(join(tmpdir(), "sort-release-docs-"));
		try {
			git(cwd, "init");
			git(cwd, "config", "user.name", "SORT test");
			git(cwd, "config", "user.email", "sort-test@example.invalid");
			writeFileSync(
				join(cwd, "CHANGELOG.md"),
				"# Changelog\n\n## [Unreleased]\n\n- Initial site.\n",
			);
			git(cwd, "add", "CHANGELOG.md");
			git(cwd, "commit", "-m", "chore: initialize changelog");

			writeFileSync(join(cwd, "site.txt"), "deploy me\n");
			git(cwd, "add", "site.txt");
			git(cwd, "commit", "-m", "feat: deploy without docs");

			expect(() => verifyDeployDocs(cwd)).toThrow(/CHANGELOG\.md is unchanged/);

			appendFileSync(
				join(cwd, "CHANGELOG.md"),
				"- Record the guarded deployment.\n",
			);
			git(cwd, "add", "CHANGELOG.md");
			git(cwd, "commit", "-m", "docs: record deployment");

			expect(verifyDeployDocs(cwd).changedFiles).toContain("CHANGELOG.md");
		} finally {
			rmSync(cwd, { recursive: true, force: true });
		}
	});
});

describe("FEFO guide-sync contract", () => {
	// FEFO's export-public.mjs records each sync under the first `### Changed`
	// heading and throws when none exists, which would silently stop the sync PR.
	it("keeps a `### Changed` heading inside [Unreleased]", () => {
		const changelog = readFileSync(
			new URL("../CHANGELOG.md", import.meta.url),
			"utf8",
		);
		const unreleased = changelog.split(/^## \[/m)[1] ?? "";
		expect(unreleased.startsWith("Unreleased]")).toBe(true);
		expect(unreleased).toMatch(/^### Changed\s*$/m);
	});
});
