// English content tree. Typed as `Content` so it stays structurally in sync with uk.ts.
import type { Content } from "./types";

export const en: Content = {
	meta: {
		title: "SORT — expiry date control on top of Poster",
		description:
			"SORT connects to your Poster and tells your barista what's expiring today. Fewer write-offs, zero manual accounting, no training. Connect your café.",
		keywords:
			"expiry date tracking, café food waste, shelf life control coffee shop, food write-offs, Poster integration, barista expiry dates",
		ogLocale: "en_US",
	},

	header: {
		cta: "Connect Poster",
		navLabel: "Navigation",
		themeToggle: "Toggle theme",
		openMenu: "Open menu",
		closeMenu: "Close menu",
		langAria: "Change language",
	},

	nav: [
		{ name: "Problem", url: "/#problem" },
		{ name: "How it works", url: "/#how" },
		{ name: "Features", url: "/#features" },
		{ name: "Pricing", url: "/#pricing" },
		{ name: "FAQ", url: "/#faq" },
	],

	hero: {
		badges: ["On top of Poster", "For coffee shops"],
		headline: "Your barista sees what's expiring — before the first guest.",
		sub: "SORT connects to your Poster, runs expiry-aware batches on its own, and shows the team what is expiring, what to write off and what to sell first. Fewer manual checks, fewer manager interruptions, no new accounting system to learn.",
		ctaConnect: "Connect your Poster",
		ctaTelegram: "Telegram",
		note: "We onboard the first cafés personally and for free.",
		frame: {
			url: "sort · Today",
			title: "«Today» screenshot on a tablet",
			desc: "red «Expired» section + amber «Discount today». To be captured on dev with demo data.",
			img: "/Screenshots/F2-centered.png",
			alt: "The SORT Today screen with an expired batch and a batch ending today.",
		},
	},

	problem: {
		title: "Right now, expiry dates rely on memory and luck",
		description: "Replace manual checks with a system you can trust",
		thManual: "Manual approach",
		thSort: "With SORT",
		comparison: [
			{
				manual: "Dates live on stickers, notes or chat messages",
				sort: "Every batch gets its expiry automatically from a Poster supply — no manual entry",
			},
			{
				manual: "To find an exact date, you dig through chat or another system",
				sort: "All dates in one place — visible in seconds, no searching",
			},
			{
				manual:
					"Stock and display state are tracked separately — in notes or photos",
				sort: "The SORT shelf mirrors your real stock: items, approximate quantity and dates together",
			},
			{
				manual: "Write-offs are collected and logged at the end of the shift",
				sort: "One tap on «Write off» — the quantity is prefilled, the record goes to Poster",
			},
			{
				manual: "It's unclear what gets written off most often, and why",
				sort: "Analytics show what to buy less of and what not to reorder",
			},
		],
		note: "Ordering decisions stay with the manager in Poster — SORT only makes the incoming data visible.",
	},

	how: {
		title: "One reliable cycle instead of manual steps",
		description:
			"Four steps — and expiry is under control without a single spreadsheet.",
		steps: [
			{
				n: "1",
				title: "Supply in Poster",
				desc: "SORT creates batches with expiry dates, no manual entry.",
			},
			{
				n: "2",
				title: "SORT runs the batches",
				desc: "Sorts them across shelves, follows sales and the rhythm of the shift.",
			},
			{
				n: "3",
				title: "A transparent shift",
				desc: "Reminds you what's expired, what spoils today and what's actually in stock.",
			},
			{
				n: "4",
				title: "Write off in one tap",
				desc: "The barista writes off during the day or at shift end — accounting stays in Poster.",
			},
		],
	},

	features: {
		title: "Features that solve real operational pain",
		description: "Not another accounting system. A short loop: see the risk, act in time, understand the cause of losses.",
		items: [
			{
				ico: "🔔",
				title: "Risks before opening",
				desc: "SORT shows expired batches and what expires today at the start of the shift — the team does not learn about the issue from a guest.",
				shot: "F1 · lock-screen push",
				img: "",
				alt: "A SORT push notification mockup about expired batches at the start of the shift.",
			},
			{
				ico: "📋",
				title: "Prioritized «Today» screen",
				desc: "Red, amber and new batches in one action order. The barista does not have to decide what to check first.",
				shot: "F2 · «Today» screenshot",
				img: "/Screenshots/F2-centered.png",
				alt: "The SORT Today screen with priorities for expired and urgent batches.",
			},
			{
				ico: "🗑️",
				title: "Write-offs without double work",
				desc: "Quantity is prefilled from sales, the reason is selected on the spot, and the record goes to Poster. Fewer end-of-day guesses.",
				shot: "F3 · write-off card",
				img: "/Screenshots/F3.png",
				alt: "A SORT write-off card with quantity, write-off reason and a write-off-all button.",
			},
			{
				ico: "✓",
				title: "Batches without manual entry",
				desc: "Poster supplies become expiry-aware batches. For the barista, it is a confirmation, not a form.",
				shot: "F4 · «New batches»",
				img: "/Screenshots/F4.png",
				alt: "A new batch in SORT with a confirm button and shelf selector.",
			},
			{
				ico: "📊",
				title: "Analytics by loss reason",
				desc: "The manager sees where money burns: expiry, daily write-offs, tastings, supply issues. That becomes input for purchasing.",
				shot: "F5 · analytics by reason",
				img: "/Screenshots/F5.png",
				alt: "SORT write-off analytics with loss reasons, batch counts and loss amounts.",
			},
			{
				ico: "🥛",
				title: "A shelf without chat photos",
				desc: "Items, approximate quantity and expiry are visible together. Fewer «how much is left?» interruptions and better pre-order decisions.",
				shot: "F6 · shelf and stock",
				img: "",
				alt: "A SORT shelf mockup with batches, approximate remaining quantity and expiry dates.",
			},
		],
		chips: [
			"📶 Works offline",
			"🇺🇦 In Ukrainian",
			"📒 Poster — source of truth",
			"📚 Event log",
			"⚖️ Sales reconciliation",
		],
	},

	shelf: {
		frame: {
			url: "sort · Shelf",
			title: "«Shelf» screenshot",
			desc: "batches by real shelves (emoji) + stock visualization — the shot that looks most like a café.",
			img: "",
			alt: "The SORT Shelf screen with batches grouped by real café shelves.",
		},
		badge: "Convenience",
		title: "A shelf like in real life",
		body: "Shelves in SORT mirror your café's real stock — you can see what's there, roughly how much is left and when it expires. It does not replace the manager's decision, but it removes display photos, notes and «how much is left?» questions in the middle of the shift.",
		tagline: "Built to be a pleasure to use.",
	},

	objection: {
		title: "Doesn't Poster already do this?",
		description: "Your POS knows the number. SORT tells the person.",
		posterLabel: "Poster",
		posterBody:
			"Knows stock and cost — for accounting. But it doesn't know expiry dates.",
		sortLabel: "SORT",
		sortBody:
			"Adds an expiry to every batch, reminds the barista during the shift and prepares one-tap write-offs — on top of your Poster data, changing nothing in your accounting.",
		note: "SORT doesn't replace Poster — it makes your existing Poster data visible where and when you need it.",
	},

	docs: {
		title: "Guides for everyday work",
		description:
			"Short, clear guides with no technical detours: prepare your café, set the rhythm and keep expiry under control.",
		allGuides: "All guides",
		items: [
			{
				label: "Getting started · 10 min",
				title: "Prepare SORT for the first shift",
				description:
					"What to check in Poster, how to sign in, and how to set up products, shelves and notifications.",
				url: "/guides/first-steps/",
			},
			{
				label: "For managers · 12 min",
				title: "Manage expiry without manual checks",
				description:
					"Your daily rhythm, manager decisions, write-offs and reports — everything needed to work with confidence.",
				url: "/guides/manager/",
			},
		],
	},

	pricing: {
		title: "Costs less than what you throw out in a week",
		description:
			"A free plan to try everything. Paid — once you see what works.",
		recommended: "Recommended",
		plans: [
			{
				name: "Free",
				price: "₴0",
				suffix: "forever",
				desc: "Try everything at a single location.",
				features: [
					"Push at the start and end of the shift",
					"One-tap confirm and write-off",
					"Up to ~15 items in the registry",
					"7-day analytics",
				],
				cta: "Try it",
				popular: false,
			},
			{
				name: "Pro · per location",
				price: "from ₴…",
				suffix: "/mo",
				desc: "For a café's daily work.",
				features: [
					"Everything in Free, no limits",
					"Unlimited batches and shelves",
					"90-day analytics",
					"Sub-batches, rotation, roles",
				],
				cta: "Connect your Poster",
				popular: true,
			},
		],
		footnote:
			"We launch the first cafés personally — we'll agree the exact price at onboarding.",
	},

	faq: {
		title: "Frequently asked questions",
		items: [
			{
				question: "Does SORT replace Poster?",
				answer:
					"No. SORT works on top of Poster — it stays your accounting system. Poster knows stock and cost but doesn't store expiry dates; SORT adds exactly that layer and makes your existing data visible at the right moment.",
			},
			{
				question: "How long does it take to train a barista?",
				answer:
					"Almost no training: one action, a Ukrainian interface. Confirm, write off — in one tap.",
			},
			{
				question: "Will SORT add work for baristas?",
				answer:
					"No. SORT can be used as a manager-only tool: baristas never have to interact with it. When the team does join in, it is not heavy training or a new accounting system — confirming a batch or writing off a leftover takes one or two taps. In many cases it saves time: fewer photos, fewer chat messages and fewer manager questions during the shift.",
			},
			{
				question: "What's needed to connect?",
				answer:
					"Access to your Poster. Everything else — the expiry registry, schedule, settings — we set up together with you.",
			},
			{
				question: "What if we make our own — pastries or dishes?",
				answer:
					"For purchased goods (milk, syrups, ready-made pastries from a supplier) SORT creates a batch automatically from a Poster supply. For your own production the barista opens a batch manually and sets the prep time — one action, the same interface. The main thing stays the same: whatever is on the display, its expiry is visible and under control.",
			},
			{
				question: "Can a write-off be undone?",
				answer:
					"Yes. Every write-off is reversible in Poster, and the app has an «Undo» window.",
			},
			{
				question: "Does it work if the internet drops?",
				answer:
					"Yes. Data is shown from cache, and actions queue up and sync themselves once the connection is back.",
			},
			{
				question: "How much does it cost?",
				answer:
					"There's a free plan. Paid — from ₴… per location per month; we'll agree the exact price at onboarding.",
			},
		],
	},

	contact: {
		title: "Connect your café",
		body: "Leave your contact — we'll connect your Poster personally and for free. We launch the first cafés by hand, together with you.",
		orWrite: "Or write to us directly:",
		telegramPrefix: "Telegram",
		form: {
			nameLabel: "Name",
			namePh: "Your name",
			posterLabel: "Poster account URL",
			posterPh: "myname.joinposter.com",
			contactLabel: "Contact for us to reach you",
			requiredAria: "required field",
			contactPh: "@tg_username or email",
			contactHint: "Enter a @Telegram handle (e.g. @ivanka) or an email",
			submit: "Connect your Poster",
			errorMsg:
				"Couldn't send. Write to us on Telegram — the link is on the left.",
		},
		success: {
			title: "Thank you!",
			body: "We'll get back to you within a day.",
		},
	},

	footer: {
		tagline:
			"An expiry-awareness layer on top of Poster. Make write-off and reorder decisions on time, in one tap.",
		productHeading: "Product",
		contactHeading: "Contact",
		productLinks: [
			{ name: "Features", url: "/#features" },
			{ name: "How it works", url: "/#how" },
			{ name: "Guides", url: "/guides/" },
			{ name: "Pricing", url: "/#pricing" },
			{ name: "FAQ", url: "/#faq" },
		],
		contactLinks: [
			{
				name: "Telegram @feelofeel",
				url: "https://t.me/feelofeel",
				external: true,
			},
			{ name: "Connect your café", url: "/#contact", external: false },
			{ name: "Log in", url: "https://app.getsort.app/today", external: true },
		],
		rights: "",
	},

	schema: {
		offerDescription: "Free plan for a single location.",
	},

	logo: {
		aria: "SORT — home",
	},
};
