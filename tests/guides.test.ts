import { describe, expect, it } from "vitest";
import { guideSchema } from "../src/lib/guide-schema";
import {
	type GuideRecord,
	alternateGuidePaths,
	guidePath,
	guidesIndexPath,
	validateGuideCollection,
} from "../src/lib/guides";

function guide(
	locale: "uk" | "en",
	overrides: Partial<GuideRecord["data"]> = {},
): GuideRecord {
	return {
		id: `${locale}/first-steps.md`,
		data: {
			id: `first-steps-${locale}`,
			locale,
			translationKey: "first-steps",
			translationRevision: 2,
			slug: "getting-started/first-shift",
			order: 10,
			audience: "manager",
			...overrides,
		},
	};
}

describe("guide routes", () => {
	it("preserves the unprefixed Ukrainian route and prefixes English", () => {
		expect(guidesIndexPath("uk")).toBe("/guides/");
		expect(guidesIndexPath("en")).toBe("/en/guides/");
		expect(guidePath("uk", "first-steps")).toBe("/guides/first-steps/");
		expect(guidePath("en", "setup/first-steps")).toBe(
			"/en/guides/setup/first-steps/",
		);
	});

	it("builds hreflang paths from a translation pair", () => {
		const paths = alternateGuidePaths(
			[guide("uk"), guide("en")],
			"first-steps",
		);
		expect(paths).toEqual({
			uk: "/guides/getting-started/first-shift/",
			en: "/en/guides/getting-started/first-shift/",
		});
	});
});

describe("guide collection validation", () => {
	it("accepts complete translations at the same revision", () => {
		expect(() =>
			validateGuideCollection([guide("uk"), guide("en")]),
		).not.toThrow();
	});

	it("rejects missing translations", () => {
		expect(() => validateGuideCollection([guide("uk")])).toThrow(
			"must have both uk and en translations",
		);
	});

	it("rejects translation revision drift", () => {
		expect(() =>
			validateGuideCollection([
				guide("uk"),
				guide("en", { translationRevision: 3 }),
			]),
		).toThrow("mismatched translation revisions");
	});

	it("rejects duplicate localized routes", () => {
		expect(() =>
			validateGuideCollection([
				guide("uk"),
				guide("uk", { translationKey: "other" }),
			]),
		).toThrow("Duplicate guide route");
	});
});

describe("guide page-kind schema", () => {
	const article = {
		id: "public-first-steps-en",
		title: "Prepare SORT for the first shift",
		summary: "A guided first run.",
		locale: "en",
		translationKey: "first-steps",
		translationRevision: 1,
		slug: "first-steps",
		audience: "manager",
		updated: "2026-08-02",
		sourceRevision: 1,
		order: 10,
		pageKind: "article",
	} as const;

	it("requires one Diátaxis mode for an article", () => {
		expect(() => guideSchema.parse(article)).toThrow(
			"Article pages must declare one primary Diátaxis mode",
		);
	});

	it("accepts an article with one Diátaxis mode", () => {
		expect(() =>
			guideSchema.parse({ ...article, diataxis: "tutorial" }),
		).not.toThrow();
	});

	it("rejects a Diátaxis mode on a landing page", () => {
		expect(() =>
			guideSchema.parse({
				...article,
				pageKind: "landing",
				diataxis: "tutorial",
			}),
		).toThrow("Landing pages must omit Diátaxis mode");
	});

	it("accepts a landing page without a Diátaxis mode", () => {
		expect(() =>
			guideSchema.parse({ ...article, pageKind: "landing" }),
		).not.toThrow();
	});
});
