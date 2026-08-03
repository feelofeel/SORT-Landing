import { z } from "astro/zod";

export const guideSchema = z
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
		if (guide.pageKind === "landing" && guide.diataxis) {
			context.addIssue({
				code: "custom",
				path: ["diataxis"],
				message: "Landing pages must omit Diátaxis mode",
			});
		}
	});
