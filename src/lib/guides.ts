export type GuideLocale = "uk" | "en";
export type GuideAudience = "manager" | "barista" | "team";

export type GuideRecord = {
	id: string;
	data: {
		id: string;
		locale: GuideLocale;
		translationKey: string;
		translationRevision: number;
		slug: string;
		order: number;
		audience: GuideAudience;
	};
};

export function guidesIndexPath(locale: GuideLocale): string {
	return locale === "en" ? "/en/guides/" : "/guides/";
}

export function guidePath(locale: GuideLocale, slug: string): string {
	return `${locale === "en" ? "/en" : ""}/guides/${slug}/`;
}

export function sortGuides<T extends GuideRecord>(guides: T[]): T[] {
	return [...guides].sort(
		(a, b) =>
			a.data.order - b.data.order || a.data.slug.localeCompare(b.data.slug),
	);
}

export function validateGuideCollection(guides: GuideRecord[]): void {
	const routes = new Set<string>();
	const translations = new Map<string, Map<GuideLocale, GuideRecord>>();

	for (const guide of guides) {
		const route = `${guide.data.locale}:${guide.data.slug}`;
		if (routes.has(route)) {
			throw new Error(`Duplicate guide route: ${route}`);
		}
		routes.add(route);

		const pair = translations.get(guide.data.translationKey) ?? new Map();
		if (pair.has(guide.data.locale)) {
			throw new Error(
				`Duplicate ${guide.data.locale} translation for ${guide.data.translationKey}`,
			);
		}
		pair.set(guide.data.locale, guide);
		translations.set(guide.data.translationKey, pair);
	}

	for (const [translationKey, pair] of translations) {
		const uk = pair.get("uk");
		const en = pair.get("en");
		if (!uk || !en) {
			throw new Error(
				`Guide ${translationKey} must have both uk and en translations`,
			);
		}
		if (uk.data.translationRevision !== en.data.translationRevision) {
			throw new Error(
				`Guide ${translationKey} has mismatched translation revisions: uk=${uk.data.translationRevision}, en=${en.data.translationRevision}`,
			);
		}
	}
}

export function alternateGuidePaths(
	guides: GuideRecord[],
	translationKey: string,
): Record<GuideLocale, string> {
	const pair = guides.filter(
		(guide) => guide.data.translationKey === translationKey,
	);
	const uk = pair.find((guide) => guide.data.locale === "uk");
	const en = pair.find((guide) => guide.data.locale === "en");
	if (!uk || !en) {
		throw new Error(
			`Guide ${translationKey} does not have a complete translation pair`,
		);
	}
	return {
		uk: guidePath("uk", uk.data.slug),
		en: guidePath("en", en.data.slug),
	};
}
