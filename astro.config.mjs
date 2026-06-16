import path from "node:path";
import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Get the site URL from environment variables, or use the default value if not set.
// Read process.env first: on Cloudflare Pages the build-time env vars land in
// process.env, but import.meta.env is NOT populated at astro.config load time —
// using only import.meta.env here silently falls back to the .pages.dev default
// and breaks canonical/OG/sitemap on the real domain.
const siteUrl =
	process.env.PUBLIC_SITE_URL ||
	import.meta.env.PUBLIC_SITE_URL ||
	"https://sort-landing.pages.dev/";

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	base: "/",
	envPrefix: "PUBLIC_",

	// Ukrainian is primary (served at /), English at /en/. hreflang in Meta.astro
	// does the SEO work; prefixDefaultLocale:false keeps the UA URLs clean.
	i18n: {
		defaultLocale: "uk",
		locales: ["uk", "en"],
		routing: { prefixDefaultLocale: false },
	},
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	},

	server: {
		port: 5200,
	},

	integrations: [mdx(), sitemap()],
});
