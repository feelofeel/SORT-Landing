import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const CHANGELOG_PATH = "CHANGELOG.md";

function git(args, cwd) {
	return execFileSync("git", args, {
		cwd,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
	}).trim();
}

function lines(value) {
	return value ? value.split(/\r?\n/).filter(Boolean) : [];
}

export function hasAddedChangelogRecord(diff) {
	return diff
		.split(/\r?\n/)
		.filter((line) => line.startsWith("+") && !line.startsWith("+++"))
		.map((line) => line.slice(1).trim())
		.some(
			(line) =>
				/^[-*]\s+\S/.test(line) ||
				(/^##\s+\[[^\]]+\]/.test(line) && line !== "## [Unreleased]"),
		);
}

export function verifyDeployDocs(cwd = process.cwd()) {
	try {
		git(["rev-parse", "--is-inside-work-tree"], cwd);
	} catch {
		throw new Error(
			"Release-doc check requires Git history; refusing to build a deployment without traceable changes.",
		);
	}

	const trackedChanges = lines(
		git(["diff", "--name-only", "--relative", "HEAD"], cwd),
	);
	const untrackedChanges = lines(
		git(["ls-files", "--others", "--exclude-standard"], cwd),
	);
	const workingChanges = [...new Set([...trackedChanges, ...untrackedChanges])];

	let changedFiles;
	let changelogDiff;
	let evidence;

	if (workingChanges.length > 0) {
		changedFiles = workingChanges;
		changelogDiff = git(
			["diff", "--no-ext-diff", "HEAD", "--", CHANGELOG_PATH],
			cwd,
		);
		evidence = "working tree against HEAD";
	} else {
		let parent;
		try {
			parent = git(["rev-parse", "HEAD^1"], cwd);
		} catch {
			parent = null;
		}

		if (parent) {
			changedFiles = lines(
				git(["diff", "--name-only", "--relative", parent, "HEAD"], cwd),
			);
			changelogDiff = git(
				["diff", "--no-ext-diff", parent, "HEAD", "--", CHANGELOG_PATH],
				cwd,
			);
			evidence = `${parent.slice(0, 7)}..HEAD`;
		} else {
			changedFiles = lines(git(["ls-tree", "-r", "--name-only", "HEAD"], cwd));
			changelogDiff = git(
				["show", "--format=", "--no-ext-diff", "HEAD", "--", CHANGELOG_PATH],
				cwd,
			);
			evidence = "initial commit";
		}
	}

	if (!changedFiles.includes(CHANGELOG_PATH)) {
		throw new Error(
			`Deployment blocked: ${CHANGELOG_PATH} is unchanged in ${evidence}. Every Cloudflare deployment, including previews, needs a changelog entry. Run /sort-release.`,
		);
	}

	if (!hasAddedChangelogRecord(changelogDiff)) {
		throw new Error(
			`Deployment blocked: ${CHANGELOG_PATH} changed in ${evidence}, but no new list item or release section was added. Record what this deployment changes, then run /sort-release again.`,
		);
	}

	return { changedFiles, evidence };
}

const isMain =
	process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isMain) {
	try {
		const result = verifyDeployDocs();
		console.log(
			`Release-doc check passed: ${CHANGELOG_PATH} contains a new record (${result.evidence}; ${result.changedFiles.length} changed files).`,
		);
	} catch (error) {
		console.error(error instanceof Error ? error.message : error);
		process.exitCode = 1;
	}
}
