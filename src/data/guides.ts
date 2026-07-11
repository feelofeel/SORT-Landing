import type { Lang } from "@/i18n";

export type GuideKey = "firstSteps" | "manager";

export type GuideSection = {
	title: string;
	intro?: string;
	items: string[];
	callout?: string;
};

export type Guide = {
	key: GuideKey;
	kicker: string;
	title: string;
	description: string;
	readTime: string;
	updated: string;
	sections: GuideSection[];
	rhythm?: { title: string; items: { label: string; text: string }[] };
	cta: { title: string; body: string; action: string };
};

export type GuideIndex = {
	kicker: string;
	title: string;
	description: string;
	featured: string;
	cards: { key: GuideKey; label: string; title: string; description: string; meta: string }[];
	help: { title: string; body: string; action: string };
};

const uk: Record<GuideKey, Guide> = {
	firstSteps: {
		key: "firstSteps",
		kicker: "Початок роботи",
		title: "Підготуйте SORT до першої зміни",
		description:
			"Простий запуск для менеджера: підготуйте дані, налаштуйте те, що бачить команда, і пройдіть першу зміну разом.",
		readTime: "10 хв читання",
		updated: "Оновлено у липні 2026",
		sections: [
			{
				title: "1. Підготуйте заклад",
				intro: "SORT працює поверх Poster. Перед запуском переконайтеся, що щоденний облік у кафе відображає реальність.",
				items: [
					"У Poster є актуальний каталог: готові товари та рецепти не дублюються, а назви легко впізнати команді.",
					"Постачання та приготування вносять у Poster одразу, у тих самих одиницях, якими команда користується щодня.",
					"Є свіжа інвентаризація. Тоді приблизні залишки в SORT починаються з реальної точки.",
					"У команді домовилися про зрозумілі причини списань: наприклад, «прострочено», «пошкоджено» або «дегустація».",
				],
				callout: "Не треба готувати все самостійно: на старті ми підключаємо заклад і допомагаємо перевірити базові налаштування.",
			},
			{
				title: "2. Увійдіть і оберіть заклад",
				items: [
					"Відкрийте SORT на робочому телефоні, планшеті або комп'ютері.",
					"Увійдіть за робочою поштою, яка прив'язана до вашого профілю в Poster.",
					"Якщо ви відповідаєте за кілька закладів, оберіть потрібний — пізніше його можна змінити в налаштуваннях.",
				],
			},
			{
				title: "3. Налаштуйте товари, полиці й ритм",
				intro: "У Налаштуваннях визначте, що саме SORT має показувати команді.",
				items: [
					"Для швидкопсувних товарів додайте термін придатності й полицю: «Вітрина», «Бар», «Холодильник» — так, як їх називає ваша команда.",
					"Товари, які не потребують контролю терміну, можна не відстежувати. Для корисних запасів без терміну залиште їх на полиці як непсувні.",
					"Поставте час повідомлення на початок зміни та, за потреби, коротке нагадування наприкінці.",
				],
			},
			{
				title: "4. Проведіть першу зміну разом",
				intro: "Першого дня достатньо показати команді один короткий цикл.",
				items: [
					"На екрані «Сьогодні» подивіться, що потребує уваги: нові, термінові та прострочені партії.",
					"Підтвердіть нові партії та перевірте, чи зрозумілі назви, полиці й дати.",
					"Якщо щось залишилося непридатним, списуйте одразу з правильною причиною — запис залишиться у Poster.",
					"Поясніть просте правило: спочатку використовуємо те, що має закінчитися раніше.",
				],
				callout: "Команді не треба вчити нову систему обліку. Їхня щоденна дія — побачити підказку й підтвердити або списати партію.",
			},
		],
		rhythm: {
			title: "Перші 7 днів: короткий чекліст",
			items: [
				{ label: "Щодня", text: "Перевіряйте «Сьогодні» та відповідайте на нові запити менеджера." },
				{ label: "Після постачання", text: "Переконайтеся, що нові партії мають зрозумілий термін і свою полицю." },
				{ label: "Наприкінці тижня", text: "Відкрийте звіт списань і подивіться, які товари або причини повторюються." },
			],
		},
		cta: {
			title: "Готові підключити свій заклад?",
			body: "Перші кафе запускаємо особисто: допоможемо підготувати Poster і налаштувати SORT під ваш ритм.",
			action: "Підключити Poster",
		},
	},
	manager: {
		key: "manager",
		kicker: "Для менеджера",
		title: "Керуйте термінами без ручного контролю",
		description:
			"Ваш робочий ритм у SORT: що перевіряти щодня, як підтримувати порядок на полицях і як перетворювати списання на кращі рішення.",
		readTime: "12 хв читання",
		updated: "Оновлено у липні 2026",
		sections: [
			{
				title: "1. Починайте з «Рішень менеджера»",
				intro: "Це коротка черга всього, що потребує саме вашого рішення. Добра ціль — тримати її порожньою.",
				items: [
					"Новий товар без правила: додайте термін і полицю, або позначте, що його не потрібно відстежувати.",
					"Партія, яку команда прибрала з полиці: поверніть її з правильними даними або приберіть, якщо вона не потрібна в SORT.",
					"Невідповідність між фактичним залишком і даними: звіртеся з реальною ситуацією в кафе, перш ніж приймати рішення.",
				],
				callout: "Не залишайте незнайомі позиції «на потім»: один правильно налаштований товар автоматично полегшує всі наступні постачання.",
			},
			{
				title: "2. Тримайте реєстр товарів актуальним",
				items: [
					"Додавайте правило для кожного нового швидкопсувного товару: скільки він зберігається та де лежить.",
					"Якщо умови змінилися — наприклад, постачальник або рецепт — перегляньте термін, а не покладайтеся на старе правило.",
					"Відокремте те, що справді потребує уваги, від витратних матеріалів і запасів без терміну. Так екран команди лишається чистим.",
				],
			},
			{
				title: "3. Допоможіть команді діяти вчасно",
				items: [
					"На початку зміни команда відкриває «Сьогодні»: червоне — списати, жовте — використати або перевірити насамперед.",
					"Для кількох партій одного товару працює просте правило: спочатку використовуйте ту, що закінчиться раніше.",
					"Якщо дата на конкретній партії не відповідає етикетці, її можна виправити прямо на картці — це краще, ніж залишити неточні дані.",
				],
			},
			{
				title: "4. Списуйте послідовно",
				intro: "Списання — не лише облік. Це сигнал, який допомагає зрозуміти втрати.",
				items: [
					"Списуйте партію тоді, коли рішення прийнято, а не збирайте все наприкінці тижня.",
					"Обирайте реальну причину списання. Так звіт відділяє прострочення від браку, дегустацій чи інших робочих витрат.",
					"Якщо списується лише частина, вкажіть фактичний залишок — решта партії лишиться на полиці.",
				],
			},
			{
				title: "5. Перетворюйте звіти на рішення",
				items: [
					"Раз на тиждень дивіться аналітику: які товари списуються найчастіше, на яку суму і з яких причин.",
					"Шукайте повторювані причини: можливо, замовлення завелике, полиця невдала або команда отримує попередження запізно.",
					"Якщо залишок виглядає дивно, перевірте фактичну кількість у кафе та дані Poster. SORT допомагає помітити питання, але рішення залишається за вами.",
				],
			},
		],
		rhythm: {
			title: "Ритм менеджера",
			items: [
				{ label: "Щодня · 3 хв", text: "Перевірити «Рішення менеджера» і «Сьогодні», відповісти на нові винятки." },
				{ label: "Щотижня · 15 хв", text: "Переглянути списання, оновити правила для нових товарів і обговорити повторювані причини з командою." },
				{ label: "Після змін", text: "Коли з'явився новий товар, постачальник або рецепт — переглянути його термін і полицю в SORT." },
			],
		},
		cta: {
			title: "Потрібно оновити налаштування?",
			body: "Почніть із правил для товарів і ритму повідомлень. Якщо потрібна допомога — ми підкажемо, як налаштувати SORT під ваш заклад.",
			action: "Написати нам",
		},
	},
};

const en: Record<GuideKey, Guide> = {
	firstSteps: {
		key: "firstSteps",
		kicker: "Getting started",
		title: "Prepare SORT for the first shift",
		description:
			"A simple launch for managers: prepare your data, set up what the team sees, and run the first shift together.",
		readTime: "10 min read",
		updated: "Updated July 2026",
		sections: [
			{
				title: "1. Prepare your café",
				intro: "SORT works on top of Poster. Before launch, make sure the café's daily records reflect what is actually happening.",
				items: [
					"Your Poster catalogue is current: ready-made products and recipes are not duplicated, and names are clear to the team.",
					"Supplies and preparation are entered in Poster right away, in the units the team uses every day.",
					"You have a recent stock count. That gives SORT's approximate stock a real starting point.",
					"The team has agreed clear write-off reasons, such as expired, damaged, or tasting.",
				],
				callout: "You do not have to prepare this alone: at launch, we connect your café and help check the essentials.",
			},
			{
				title: "2. Sign in and choose your café",
				items: [
					"Open SORT on your work phone, tablet, or computer.",
					"Sign in with the work email linked to your Poster profile.",
					"If you manage more than one location, choose the right café. You can switch it later in settings.",
				],
			},
			{
				title: "3. Set up products, shelves, and timing",
				intro: "In Settings, decide exactly what SORT should show your team.",
				items: [
					"For perishable products, add a shelf life and shelf: Display, Bar, Fridge — using the names your team already uses.",
					"Products that do not need expiry control can be left untracked. Useful stock without a shelf life can stay visible as non-perishable.",
					"Set the notification time for shift start and, if helpful, a short reminder at the end of the shift.",
				],
			},
			{
				title: "4. Run the first shift together",
				intro: "On day one, simply show the team one short cycle.",
				items: [
					"On Today, look at what needs attention: new, urgent, and expired batches.",
					"Confirm new batches and make sure their names, shelves, and dates make sense.",
					"If something is no longer usable, write it off immediately with the right reason — the record remains in Poster.",
					"Share one simple rule: use what expires first, first.",
				],
				callout: "The team does not need to learn a new accounting system. Their daily action is to see the prompt, then confirm or write off a batch.",
			},
		],
		rhythm: {
			title: "The first 7 days: quick checklist",
			items: [
				{ label: "Daily", text: "Check Today and respond to any new manager requests." },
				{ label: "After a supply", text: "Make sure new batches have a clear shelf life and a shelf." },
				{ label: "End of week", text: "Open the write-off report and look for repeated products or reasons." },
			],
		},
		cta: {
			title: "Ready to connect your café?",
			body: "We personally launch the first cafés: we will help prepare Poster and set up SORT around your rhythm.",
			action: "Connect Poster",
		},
	},
	manager: {
		key: "manager",
		kicker: "For managers",
		title: "Manage expiry without manual checks",
		description:
			"Your operating rhythm in SORT: what to check each day, how to keep shelves orderly, and how to turn write-offs into better decisions.",
		readTime: "12 min read",
		updated: "Updated July 2026",
		sections: [
			{
				title: "1. Start with Manager decisions",
				intro: "This is the short queue of things that need your decision. A good goal is to keep it empty.",
				items: [
					"A new product without a rule: add its shelf life and shelf, or mark it as not tracked.",
					"A batch the team removed from a shelf: return it with the right details, or remove it if it does not belong in SORT.",
					"A mismatch between physical stock and the data: check the real situation in the café before deciding what to do.",
				],
				callout: "Do not leave unfamiliar products for later: one properly configured product makes every next supply easier automatically.",
			},
			{
				title: "2. Keep your product registry current",
				items: [
					"Add a rule for each new perishable product: how long it keeps and where it belongs.",
					"When conditions change — a supplier or recipe, for example — review the shelf life instead of relying on an old rule.",
					"Separate what truly needs attention from supplies and stock with no shelf life. It keeps the team's screen clean.",
				],
			},
			{
				title: "3. Help the team act in time",
				items: [
					"At shift start, the team opens Today: red means write off; amber means use or check first.",
					"For several batches of one product, use a simple rule: use the one that expires sooner first.",
					"If the date on a batch does not match the label, correct it directly on the card. Accurate data is better than a guess.",
				],
			},
			{
				title: "4. Write off consistently",
				intro: "Write-offs are not just records. They are the signal that helps you understand loss.",
				items: [
					"Write off a batch when the decision is made; do not collect everything until the end of the week.",
					"Choose the real reason. The report can then separate expiry from damage, tasting, or other operating costs.",
					"If only part is written off, enter the actual remainder. The rest of the batch stays on the shelf.",
				],
			},
			{
				title: "5. Turn reports into decisions",
				items: [
					"Once a week, review analytics: which products are written off most, for how much, and why.",
					"Look for repeated reasons: perhaps an order is too large, a shelf is unsuitable, or the team gets warned too late.",
					"If a quantity looks wrong, check physical stock and Poster. SORT helps surface the question, but the decision remains yours.",
				],
			},
		],
		rhythm: {
			title: "Manager rhythm",
			items: [
				{ label: "Daily · 3 min", text: "Check Manager decisions and Today; respond to new exceptions." },
				{ label: "Weekly · 15 min", text: "Review write-offs, update rules for new products, and discuss repeated reasons with the team." },
				{ label: "After changes", text: "When a new product, supplier, or recipe appears, revisit its shelf life and shelf in SORT." },
			],
		},
		cta: {
			title: "Need to update your setup?",
			body: "Start with product rules and notification timing. If you need a hand, we can help tailor SORT to your café.",
			action: "Write to us",
		},
	},
};

const index: Record<Lang, GuideIndex> = {
	uk: {
		kicker: "База знань SORT",
		title: "Посібники для спокійної зміни",
		description:
			"Усе, що потрібно менеджеру та команді, щоб менше перевіряти вручну й вчасно бачити товари, які потребують уваги.",
		featured: "Почніть із цього",
		cards: [
			{ key: "firstSteps", label: "Початок роботи", title: "Підготуйте SORT до першої зміни", description: "Від підготовки закладу до простого циклу на першій зміні.", meta: "10 хв читання" },
			{ key: "manager", label: "Для менеджера", title: "Керуйте термінами без ручного контролю", description: "Щоденний ритм, рішення, списання та звіти без зайвої технічної мови.", meta: "12 хв читання" },
		],
		help: { title: "Потрібна допомога з запуском?", body: "Підключаємо перші заклади особисто й допомагаємо налаштувати SORT під ваші процеси.", action: "Написати в Telegram" },
	},
	en: {
		kicker: "SORT knowledge base",
		title: "Guides for a calmer shift",
		description:
			"Everything managers and teams need to check less by hand and see the products needing attention in time.",
		featured: "Start here",
		cards: [
			{ key: "firstSteps", label: "Getting started", title: "Prepare SORT for the first shift", description: "From preparing your café to a simple first-shift routine.", meta: "10 min read" },
			{ key: "manager", label: "For managers", title: "Manage expiry without manual checks", description: "Daily rhythm, decisions, write-offs, and reports without technical detours.", meta: "12 min read" },
		],
		help: { title: "Need a hand getting started?", body: "We personally connect the first cafés and help shape SORT around your workflow.", action: "Write on Telegram" },
	},
};

export function getGuide(lang: Lang, key: GuideKey) {
	return (lang === "en" ? en : uk)[key];
}

export function getGuideIndex(lang: Lang) {
	return index[lang];
}
