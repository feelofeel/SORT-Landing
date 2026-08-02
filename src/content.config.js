import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const post = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/post" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		read: z.number().optional(),
		tags: z.array(z.string()).optional(),
		img: z.string().optional(),
		img_alt: z.string().optional(),
		featured: z.boolean().optional(),
	}),
});

const changelog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/changelog" }),
	schema: z.object({
		title: z.string(),
		publishDate: z.coerce.date(),
		version: z.string().optional(),
		description: z.string().optional(),
	}),
});

const guideSchema = z
	.object({
		id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
		title: z.string().min(1),
		summary: z.string().min(1),
		locale: z.enum(["uk", "en"]),
		translationKey: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
		translationRevision: z.number().int().positive(),
		slug: z
			.string()
			.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/),
		diataxis: z
			.enum(["tutorial", "how-to", "reference", "explanation"])
			.optional(),
		audience: z.enum(["manager", "barista", "team"]),
		updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
		sourceRevision: z.number().int().positive(),
		order: z.number().int().nonnegative(),
		pageKind: z.enum(["article", "landing"]),
	})
	.strict()
	.superRefine((guide, context) => {
		if (guide.pageKind === "article" && !guide.diataxis) {
			context.addIssue({
				code: "custom",
				path: ["diataxis"],
				message: "Article pages must declare one primary Diátaxis mode",
			});
		}
	});

const guides = defineCollection({
	// Markdown and MDX only: the FEFO exporter also writes a JSON manifest here.
	// Include the locale directory in Astro's collection ID. The loader's default
	// uses frontmatter `slug` as the ID, which would make uk/en translations collide.
	loader: glob({
		pattern: "{uk,en}/**/*.{md,mdx}",
		base: "./src/content/guides",
		generateId: ({ entry }) =>
			entry.replace(/\\/g, "/").replace(/\.(md|mdx)$/, ""),
	}),
	schema: guideSchema,
});

export const collections = { post, changelog, guides };
