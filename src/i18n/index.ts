import { en } from "./en";
import type { Content } from "./types";
// i18n helpers. Locale dictionaries live in uk.ts / en.ts; this module is the
// single import surface for components.
import { uk } from "./uk";

export type { Content };

export type Lang = "uk" | "en";

export const defaultLang: Lang = "uk";

// Short labels for the language switcher, in display order.
export const languages: { code: Lang; label: string }[] = [
	{ code: "uk", label: "УКР" },
	{ code: "en", label: "EN" },
];

const content: Record<Lang, Content> = { uk, en };

export function getContent(lang: Lang): Content {
	return content[lang] ?? content[defaultLang];
}

// Prefix root-relative paths with /en for the English locale. External links
// (http, mailto, tel, protocol-relative) and same-page anchors (#...) pass through.
export function localizePath(path: string, lang: Lang): string {
	if (/^(https?:|mailto:|tel:|\/\/|#)/.test(path)) return path;
	if (lang === defaultLang) return path;
	if (path === "/") return "/en/";
	return path.startsWith("/") ? `/en${path}` : path;
}

// The home URL for a locale — used by the language switcher.
export function homePath(lang: Lang): string {
	return lang === defaultLang ? "/" : "/en/";
}
