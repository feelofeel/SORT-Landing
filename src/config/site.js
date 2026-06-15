// Site URL from env; set PUBLIC_SITE_URL in .env / Cloudflare Pages after first deploy.
const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://sort-landing.pages.dev';

export const siteConfig = {
	title: "SORT",
	author: "feelofeel",
	url: SITE_URL,
	mail: "hello@feelofeel.coffee",
	telegram: "https://t.me/feelofeel",
	telegramHandle: "@feelofeel",
	utm: {
		source: `${SITE_URL}`,
		medium: "referral",
		campaign: "landing",
	},
	meta: {
		title: "SORT — контроль термінів придатності поверх Poster",
		description:
			"SORT під'єднується до вашого Poster і сповіщає баристу, що псується сьогодні. Менше списань, нуль ручного обліку, без навчання. Підключіть свій заклад.",
		keywords:
			"облік термінів придатності, прострочка кафе, контроль термінів кав'ярня, списання продуктів, Poster інтеграція, термін придатності бариста",
		image: `${SITE_URL}/og.jpg`,
		twitterHandle: "",
	},
	// Telegram is the primary channel for the UA café audience; github kept as a
	// harmless alias so any leftover template reference still resolves to contact.
	social: {
		telegram: "https://t.me/feelofeel",
		telegramName: "@feelofeel",
		github: "https://t.me/feelofeel",
		blog: SITE_URL,
	},
};

// Footer social icons
export const socialLinks = [
	{
		name: 'Telegram',
		url: 'https://t.me/feelofeel',
		icon: `<svg class="icon ic-telegram" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>`
	},
];
