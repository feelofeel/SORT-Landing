---
title: Landing Page Definition — SORT marketing site
id: landing-page-definition
role: spec
status: canonical
doc_revision: 4
app_version: 1.0.0
updated: 2026-09-17
source_of: [lead-followup-templates]
derived_from: []
toc:
  - "§0 How to read and maintain this doc"
  - "§1 Product charter"
  - "§2 Audience"
  - "§3 Message hierarchy and copy"
  - "§4 Page structure"
  - "§5 CTA and onboarding"
  - "§6 SEO"
  - "§7 Marketing instrumentation"
  - "§8 Tech and infrastructure"
  - "§9 Resolved implementation decisions"
  - "§10 Maintenance checklist"
  - "Appendices — traceability and exclusions"
---

# SORT — Landing Page Definition

> **Status: canonical product-intent and page-structure spec.** Ukrainian is primary; English mirrors the accepted meaning. Exact shipped strings live in `src/i18n/{uk,en}.ts`, but copy and visual-direction changes start here so implementation and rationale do not drift.
>
> Grounding: the FEFO/SORT repository owns [app user stories](https://github.com/feelofeel/fefo/blob/main/docs/product/app-user-stories.md), [positioning research](https://github.com/feelofeel/fefo/blob/main/docs/research/competitor-research-brief.md), [pricing/GTM](https://github.com/feelofeel/fefo/blob/main/docs/research/pricing-and-gtm.md), [feature decomposition](https://github.com/feelofeel/fefo/blob/main/docs/product/decomposition.md), and the [tenant-onboarding guide](https://github.com/feelofeel/fefo/blob/main/docs/guides/onboarding-tenant.md). Jira [SCRUM-11](https://feelofeel.atlassian.net/browse/SCRUM-11) / [SCRUM-35](https://feelofeel.atlassian.net/browse/SCRUM-35) track self-serve onboarding.

---

## 0. How to read and maintain this doc

Use the numbered sections to review intent and acceptance criteria. When a shipped behavior changes, update the relevant section first, update both localized dictionaries/markup, then close the doc through `/feel-doc` and the deployment through `/sort-release`.

- **§9.1 Page language** — Ukrainian default plus English at `/en/`.
- **§9.2 CTA mechanism** — short lead form plus Telegram.
- **§9.3 Domain/brand** — landing at `getsort.app`, application at `app.getsort.app`.
- **§9.4 Tech approach** — separate Astro 7 site on Cloudflare Pages.

Everything else has a recommended default already baked in.

---

## 1. Concept & positioning (the strategic spine)

### 1.1 The one-sentence concept
**SORT turns expiry from something your team holds in their heads into a system that tells the right person at the right moment — without replacing Poster.** It is the *system of decision* sitting on top of Poster, the *system of record*.

### 1.2 The narrative the whole page tells
Today, a café manages expiry by **manual orchestration**: date stickers, mental notes, a manager's Sunday spreadsheet, a barista walking to the fridge to check, a phone call to ask "should I bin this?", end-of-shift guesswork on write-offs, and a month-end waste number nobody can explain. Every step depends on a human remembering. **SORT replaces that orchestration with one reliable loop:** Poster supply → batch with a real expiry → shift-start push → one-tap action → Poster record. Nobody has to remember; the system does.

This is the thread the user asked to lead with: **"a reliable system that replaces manually orchestrated processes."** Every section should reinforce *manual & fragile → automatic & reliable*.

### 1.3 Positioning statement (internal, not printed)
> For independent cafés already running Poster, SORT is the expiry-awareness layer that warns the barista before the first customer and records the write-off back into Poster — so waste stops being a month-end surprise. Unlike the POS inventory module (which knows the *quantity*), SORT tells the *person*, at the *moment*, in *one tap*.

### 1.4 The altitude line (the core differentiator, repeated as a motif)
**"Your POS knows the number. SORT tells the person."** *(«Ваш POS знає цифру. SORT каже людині.»)* — this is the single most important sentence per the competitor brief §8.1; it pre-empts the "Poster already does this" objection. Use it as a recurring motif (hero sub-thread + objection section).

### 1.5 What SORT is NOT (keeps the page honest and on-charter)
Not an inventory system, not a POS replacement, not a HACCP/compliance suite, not a label printer, not a scanner. Stating this *builds* trust with operators who've been pitched bloated suites. One quiet line near the bottom.

### 1.6 The second thread — the shelf that mirrors your café (time + quality-of-life)
SORT began as **FEFO** (first-expired-first-out — the repo name). Under the **SORT** name it grew a second job that rides on the *same* shelf data: **the shelf board mirrors the café's real storage composition.** A manager or barista can *see* the cold shelf — items, estimated remaining (milk, bakery), and expiry — **without the manual ceremony most cafés run today**: photographing the fridge at set times, hand-writing the leftovers, asking the barista "скільки лишилось?". Yes, leftovers also live in Poster — but Poster shows a stock *list*, not a *spatial, real-life composition with expiry attached*. The win here is **mental/time saving and quality-of-life**, not a new system of record.

The QoL angle is its own narrative thread Dee wants stated plainly: **features built for convenience, so the app is pleasant to use** — staff *feel better* using it, and a frontline tool only gets adopted if it feels good in the hand. Page line candidate: «Зроблено, щоб користуватись було приємно.» *(Made to be pleasant to use.)*

### 1.7 Charter guardrail (so this thread doesn't drift)
The shelf-composition / leftover thread is **secondary and supporting**, not a pivot into inventory or ordering. Per CLAUDE.md rule 13, SORT's core value stays **expiry awareness**; "see what's left / decide what to order" is a *convenience that falls out of the shelf view*, framed as time-saved + QoL — **never** "SORT does your ordering" or "SORT is your stock count." Keep the claim honest: remaining quantity is an *estimate* (FEFO sales attribution, barista-confirmed), not a precise live count. Lead with expiry; let composition/QoL ride second.

### 1.8 Value-prop hierarchy (calibrated with Dee's input)
1. **Primary — headline + hero:** expiry / waste — *"barista knows before the first guest; less binned."* Charter core, unchanged.
2. **Secondary — own section + feature emphasis:** the shelf mirrors your café → less time on inventory photos/notes/leftover-referrals; QoL.
3. **Tertiary — trust strip:** Poster-native, one-tap, offline, Ukrainian.

The CTA is unchanged (§5). The calibration Dee asked about is *where the secondary thread lives*: a dedicated "manual ceremonies / error surfaces" Problem block (§4.2) + the shelf/visual-cards features (§4.6 F2/F6 and §4.6.1) carry it, while the hero stays expiry-first so the charter holds.

---

## 2. Audience & the single job

### 2.1 Primary visitor
The **owner/manager of an independent coffee shop (1–3 locations) already on Poster**, in Lviv / wider Ukraine first ([pricing-and-GTM research](https://github.com/feelofeel/fefo/blob/main/docs/research/pricing-and-gtm.md) §7.1). Operator, **not technical** — speaks "shift / barista / write-off / waste", not "SKU / webhook / batch ID".

### 2.2 Their job-to-be-done on this page
"Show me, in 30 seconds, that this stops me throwing money away and won't be a hassle to run — then tell me how to get it." The page's only job is to earn **one action: contact us to connect your Poster** (§5).

### 2.3 Reading rules this forces (from web research §6)
- 5-second clarity test above the fold: *what it is, who it's for, what to do*.
- Benefit-led, not feature-led. Numbers and concrete scenes over adjectives.
- Short sentences. No dev terms. Operator vocabulary only.

---

## 3. Messaging system (voice + the lines that carry the page)

### 3.1 Voice rules
1. **Pain → mechanism → outcome** in every block (e.g. *"You find out at the till → SORT pushes at shift start → you act before the first guest."*).
2. **Specific over generic:** "встигни до першого гостя" beats "економте час".
3. **One idea per sentence**, max two clauses.
4. **Operator words only** — partia/термін/зміна/списання, never SKU/batch/webhook.

### 3.2 Hero headline — 3 options to choose from
- **A (core value, recommended):** «Бариста бачить прострочку ще до першого гостя.» *(The barista sees what's expired before the first guest.)*
- **B (system reframe):** «Терміни придатності — на автоматі, а не на пам'яті.» *(Expiry on autopilot, not on memory.)*
- **C (waste/ROI):** «Менше викидати. Без таблиць і нагадувань.» *(Throw away less. No spreadsheets, no reminders.)*

### 3.3 Hero subhead (recommended, pairs with A)
«SORT під'єднується до вашого Poster, сам рахує термін кожної партії й надсилає баристі сповіщення на початку зміни. Без таблиць, без ручного обліку, без навчання — одна дія.»
*(SORT connects to your Poster, calculates each batch's expiry itself, and notifies the barista at shift start. No spreadsheets, no manual tracking, no training — one action.)*

### 3.4 Primary CTA label (recommended)
Button: **«Підключити свій Poster»** *(Connect your Poster)*
Microcopy under it: «Перші заклади під'єднуємо особисто й безкоштовно.» *(We connect the first cafés personally, for free.)* — turns "manual onboarding" into a white-glove benefit, not a gap.

### 3.5 The before/after reframe block (one line, high impact)
| Раніше (вручну) | Із SORT (система) |
|---|---|
| Стікери з датами, нотатки, дзвінки менеджеру | Партія з терміном з'являється сама з постачання Poster |
| «Здається, це ще норм?» | Пуш на початку зміни: що прострочено, що псується сьогодні |
| Списання навмання в кінці дня | Одне натискання «Списати» → запис у Poster |
| Фото холодильника й нотатки «скільки лишилось» | Полиця показує склад і приблизний залишок — без фото |
| «Скільки молока?» — питаєш баристу на зміні | Залишок і термін видно поруч на екрані |
| Сюрприз у звіті наприкінці місяця | Аналітика: за що саме викинули гроші |

*(Render as a two-column "manual vs system" comparison — this is the literal embodiment of "replaces manually orchestrated processes.")*

---

## 4. Page structure (section-by-section)

Order follows the high-converting B2B pattern (web research §1): hero → problem → reframe → how-it-works → features → objection → trust → pricing → FAQ → final CTA → footer. **Single primary CTA**, repeated; no competing buttons.

> For each section: **Purpose · Copy direction · Visual state · Alt text.** Visual entries distinguish what is deployed from what remains a placeholder.

### 4.1 Hero
- **Purpose:** 5-second clarity + the one CTA.
- **Copy:** headline §3.2(A) · subhead §3.3 · CTA §3.4. One trust line of microproof beneath ("Працює поверх Poster. Нічого не змінює у вашому обліку." *— Runs on top of Poster. Changes nothing in your accounting.*)
- **Visual state:** the hero currently shows an honest branded **“video coming soon”** panel inside the browser frame. It is ready for a privacy-enhanced YouTube embed (`youtube-nocookie.com`) once `youtubeId` is populated; do not restore an untracked screenshot placeholder.
- **Accessible text:** localized title, description, and status explain the upcoming video without relying on imagery.

### 4.2 Problem — the manual ceremonies SORT replaces (the error surfaces)
- **Purpose:** make the visitor feel the orchestration tax — and *name the exact manual rituals* their café runs today, so the page thesis ("replaces manually orchestrated processes") is concrete, not abstract.
- **Copy direction:** open on a concrete morning scene — *"Ранок. Гість замовляє, а ви розумієте, що молоко скисло вчора. Хтось мав перевірити — але всі забули."* — then surface the ceremonies below. Different cafés run different subsets (some mandatory, some ad-hoc, some none); listing them lets any operator recognize their own.

**Manual ceremonies & where they break:**

| Ceremony many cafés run today | Where errors creep in | SORT instead |
|---|---|---|
| Date stickers / mental notes on expiry | stickers fall off, notes forgotten, FEFO order not followed → expired served | auto batch with expiry + shift-start push + FEFO order |
| **Photograph the cold shelf** at set times to eyeball state & decide orders | forgotten; quantities unreadable from a photo; interpretation varies by who looks; no expiry in a photo | shelf board **mirrors the real shelf** live — items, est. remaining, expiry in one place |
| **Hand-write "how much milk / bakery left"** | miscounted, illegible, lost, stale by the time you order | estimated remaining on each card (visual fill, Feature 20) |
| **Verbal "скільки лишилось?"** barista ↔ manager | interrupts the shift; memory-based; telephone-game error | manager just opens the shelf and sees it — no interruption |
| Decide **what / how much to order** from photos + notes | over/under-order; order things that will expire; no waste feedback loop | composition view + waste analytics *inform* the order\* |
| End-of-day **write-off by eye** | under/over write-off, wrong or blank reason, not recorded | one-tap write-off, leftover pre-filled, recorded in Poster |
| Figure out the **right assortment variant** on a supply | wrong variant / wrong expiry tracked | assortment / sub-batch handling (secondary feature) |

> \*Ordering stays the manager's decision in Poster — SORT only makes the inputs visible (charter guardrail §1.7). This table is the **"list of possible errors / manually orchestrated processes"** Dee asked to foreground; it is the strongest embodiment of the page thesis.

- **Visual:** a **"manual orchestration" collage** — a phone photo of a fridge, a handwritten leftovers note, a sticky date dot, a question-mark — deliberately a bit chaotic, as contrast bait for the clean SORT shelf shown later. Line-art or a styled photo collage, not a screenshot.
- **Alt text:** "Колаж ручних процесів у кафе: фото холодильника, нотатки про залишки, стікери з датами — розрізнені й ненадійні."

### 4.3 The reframe — manual → reliable system
- **Purpose:** the pivot. One strong line + the before/after table §3.5.
- **Copy:** section title «Від ручного контролю — до системи, якій можна довіряти» *(From manual control to a system you can trust.)* + the §3.5 table.
- **Visual:** the **two-column comparison** itself is the visual (styled table / split panel). No screenshot needed.
- **Alt text:** n/a (text).

### 4.4 How it works — the loop in 4 steps
- **Purpose:** show it's automatic and low-effort.
- **Copy (UA, terse):**
  1. «Постачання в Poster» → SORT створює партію з терміном придатності.
  2. «Бариста підтверджує» одним дотиком — без вводу даних.
  3. «На початку зміни — пуш»: що прострочено, що псується сьогодні.
  4. «Списати в один дотик» → запис іде в Poster.
- **Visual:** a **horizontal 4-step flow diagram** (Poster icon → batch card → push bell → trash/Poster), arrows left-to-right. Clean, branded. This is the only "diagram" on the page; everything else is real UI.
- **Alt text:** "Схема роботи SORT у чотири кроки: постачання, підтвердження, пуш на зміні, списання в Poster."

### 4.5 Feature showcase — the value points that matter (detail in §5? no — §4.6 cards)
Covered as its own block below (§5 of *the page*); see **doc §5… actually feature detail is §4.6**.

### 4.6 Feature cards (the important/cool ones)
A grid of cards, each **pain → mechanism → outcome + one visual**. Selection follows the FEFO/SORT [feature decomposition](https://github.com/feelofeel/fefo/blob/main/docs/product/decomposition.md): lead with **core loop** features; show one or two "cool" satellites; keep niche satellites (sub-batches, concurrent rotation, thermal) off the first pitch.

| # | Feature (UA card title) | Pain → Mechanism → Outcome (English direction) | Source feature | Demo-surface? |
|---|---|---|---|---|
| F1 | **Ризики до відкриття** *(Risk before opening)* | "You learn at the till" → SORT shows expired / expiring-today batches at shift start → "the team is ready before the first guest." **The core promise.** | [Feature 1 & 12](https://github.com/feelofeel/fefo/blob/main/docs/product/app-user-stories.md) | core |
| F2 | **Пріоритетний екран «Сьогодні»** *(Today, one prioritized screen)* | "Scattered checks" → one screen: overdue (red) / today (amber) / new to confirm → "barista sees the next action order." | Feature 1 | core |
| F3 | **Списання без подвійної роботи** *(Write-off without double work → Poster)* | "Leaving the bar for Poster's form / guessing later" → tap «Списати», quantity pre-filled from sales, reason chosen on the spot → "waste recorded in Poster while context is fresh." | Feature 4 | core |
| F4 | **Партії без ручного вводу** *(Batches without manual entry)* | "Typing products & dates" → batches appear from Poster supplies, barista just confirms → "no data entry, no training-heavy process." | Feature 2 & 27 | core |
| F5 | **Аналітика причин втрат** *(Loss reason analytics)* | "Month-end mystery number" → write-offs grouped by reason over 7/30/90 days → "manager sees where money burns and can adjust purchasing." | Feature 25 | yes |
| F6 | **Полиця без фото в чаті** *(Shelf without chat photos)* | "Manager asks / barista photographs / note goes stale" → shelf shows item, approximate remaining, expiry together → "fewer shift interruptions and better order inputs." | Feature 14 & 20 | optional |

**Trust strip under the cards (small, 4 chips, no images):** «Працює офлайн» *(works offline, Feature 26)* · «Українською» *(Ukrainian-only UI)* · «Poster — джерело правди» *(Poster stays the record)* · «Все оборотне в Poster» *(every write-off reversible).*

**Deployed visual per card:**
- **F1:** curated phone lock-screen push mock at `public/Screenshots/F1-push.png`.
- **F2:** «Сьогодні» priority screen at `public/Screenshots/F2-centered.png`.
- **F3:** write-off card at `public/Screenshots/F3.png`.
- **F4:** «Нові партії» confirmation state at `public/Screenshots/F4.png`.
- **F5:** loss-reason analytics at `public/Screenshots/F5.png`.
- **F6:** card crop at `public/Screenshots/F6-shelf-card.png`; the full shelf view is reused in §4.6.1.
- **Alt text:** each describes the screen in Ukrainian, naming the SORT screen shown (per SEO §6.4).

> **Screenshot maintenance:** recapture from **`dev.fefo.pages.dev`** with the demo seed ([SCRUM-18](https://feelofeel.atlassian.net/browse/SCRUM-18)), curate/annotate locally, and commit only the assets intentionally published by `.gitignore`.

### 4.6.1 Secondary-thread block — «Полиця, як у житті» (the shelf that mirrors your café)
- **Purpose:** carry the second value thread (§1.6) — the shelf board + visual cards mean *less manual inventory ceremony* and a tool that's **pleasant to use** (QoL). Placed *after* the core feature cards so expiry stays the headline (value hierarchy §1.8).
- **Copy:** title «Полиця, як у житті» *(A shelf like real life)*. Two lines: *"Полиці в SORT відтворюють реальний склад вашого закладу — видно, що стоїть, скільки приблизно лишилось і коли псується. Менше фото холодильника, менше нотаток, менше «скільки лишилось?» на зміні."* + the QoL line «Зроблено, щоб користуватись було приємно.»
- **Visual:** deployed full shelf board at `public/Screenshots/F6-shelf.png`, with the card crop at `public/Screenshots/F6-shelf-card.png`.
- **Alt text:** "Екран «Полиця» SORT: партії згруповані за реальними полицями кафе з візуалізацією залишку."
- **Honesty caveat (not printed):** remaining is an estimate (FEFO attribution); frame as convenience/time-saved, never a precise stock count (§1.7).

### 4.7 Objection handler — "Doesn't Poster already do this?"
- **Purpose:** the single biggest deal-killer ([competitor brief](https://github.com/feelofeel/fefo/blob/main/docs/research/competitor-research-brief.md) §8.1). Address it head-on.
- **Copy:** title «Хіба Poster цього вже не вміє?» + the altitude line §1.4. Two short sentences: *Poster знає залишок і собівартість. SORT створює фізичну партію, штовхає баристу на зміні й готує списання в один дотик — те, чого модуль складу не робить.*
- **Visual:** a **tiny two-row contrast** — "Poster: кількість на складі" vs "SORT: рішення в потрібний момент". Text/icon, no screenshot.
- **Alt text:** n/a.

### 4.8 Trust / proof
- **Purpose:** de-risk for an operator.
- **Copy direction:** (a) "Built on Poster, changes nothing in your accounting." (b) one **pilot reference** when available (Lviv lighthouse café logo/quote — §7.1 GTM bets on this; placeholder until you have it). (c) "Reversible, one-tap, Ukrainian, works offline."
- **Visual:** pilot café logo/photo (when available); until then, a clean "Poster-native" badge + the Poster logo with "Офіційна інтеграція" *(once the marketplace listing [SCRUM-35] is live — don't claim it before).* 
- **Alt text:** describes the logo/badge.

### 4.9 Pricing teaser (honest, light) — recommended to include
- **Purpose:** operators distrust "contact for pricing" black boxes; a light, honest frame converts better than hiding it.
- **Copy direction (from [pricing-and-GTM research](https://github.com/feelofeel/fefo/blob/main/docs/research/pricing-and-gtm.md) §3):** "Коштує менше, ніж ви викидаєте за тиждень." A **Free tier to try** (capped) + a **single paid tier per location** (band ~$9–13 / ₴400–520, shown as "від ₴…/міс за заклад"). One line: "Перші заклади запускаємо особисто — пишіть нам." Do **not** print final numbers if not decided; show the band + the ROI line.
- **Visual:** a simple **2-column plan card** (Безкоштовно / Pro) — not 4 tiers (§3 says resist laddering). Optional; can be a single ROI line if pricing isn't ready to show.
- **Alt text:** n/a.

### 4.10 FAQ (schema-enabled — see SEO §6.5)
6–8 questions, operator-framed:
1. «Чи замінює SORT Poster?» — Ні, працює поверх нього; Poster лишається обліком.
2. «Скільки навчати баристу?» — Майже не треба: одна дія, українською.
3. «Чи додасть SORT роботи баристам?» — Ні: SORT може бути manager-only. Якщо бариста долучаються, це один-два дотики, не новий облік; часто економить час на фото, чатах і питаннях менеджеру.
4. «Що потрібно для підключення?» — Доступ до вашого Poster; решту робимо ми.
5. «Чи можна скасувати списання?» — Так, усе оборотне в Poster.
6. «Працює, якщо впав інтернет?» — Так, дані з кешу, дії синхронізуються потім.
7. «Скільки коштує?» — Є безкоштовний тариф; платний — від ₴… за заклад.
- **Visual:** none (accordion). Each Q/A also emitted as `FAQPage` JSON-LD.

### 4.11 Final CTA (pre-footer)
- **Copy:** «Підключіть свій заклад» + repeat primary button §3.4 + the white-glove microcopy §3.4. One alternate contact line (Telegram/email — §9.2).
- **Visual:** none, or a calm repeat of the hero device at small size.

### 4.12 Footer
The deployed footer contains the wordmark/tagline, product navigation, Telegram contact, onboarding CTA, and application login. **Open gap:** publish and link a privacy notice because the site collects lead contact data.

---

## 5. The CTA & onboarding flow (manual now → automatic later)

### 5.1 The CTA goal
One conversion: **prospect asks feelofeel/Dee to connect their Poster account.** Not self-serve signup — by design, because the first ~10 cafés are onboarded **100% manually** (white-glove).

### 5.2 What the form captures (three visible fields)
1. Ім'я *(name)* — optional
2. URL / subdomain Poster *(e.g. `yourcafe.joinposter.com`)* — optional but useful for qualification and onboarding
3. Контакт: Telegram username або email — required and format-validated

The form carries UTM/referrer context, includes a hidden `company_url` honeypot, and the endpoint applies IP/contact rate limits. No reCAPTCHA at this volume. Button reads «Підключити свій Poster», not "Submit".

### 5.3 What happens after submit (the manual playbook, framed as a benefit)
On the page: thank-you state + "ми напишемо вам у Telegram протягом доби". Behind it, Dee's onboarding playbook (existing tooling):
1. Contact prospect → short screen-share/visit.
2. Run **Poster OAuth** for their account (the account-specific OAuth URL pattern; app ID 4946).
3. Seed the shelf-life registry via **«Імпорт з Poster»** (Feature 27) + `remap-shelf-life.js`.
4. Set the **shift schedule** (Feature 12), invite the manager (magic-link, role from Poster).
5. Verify first push → hand off.

This feeds the FEFO/SORT [tenant-onboarding guide](https://github.com/feelofeel/fefo/blob/main/docs/guides/onboarding-tenant.md); the landing only captures the lead.

### 5.4 The automatic future (so the page is built to swap)
The same CTA component is designed to **swap later** from "contact us" to "self-install" once:
- **[SCRUM-11](https://feelofeel.atlassian.net/browse/SCRUM-11)** — self-serve OAuth onboarding (visit `/onboard` → Poster consent → tenant auto-provisioned). *In progress.*
- **[SCRUM-35](https://feelofeel.atlassian.net/browse/SCRUM-35)** — Poster marketplace listing (self-install from Poster's app catalog; ~23k Poster locations see it). *Idea, blocked by SCRUM-11.*

**Landing implication:** keep the CTA a single component with a config flag (`contact` | `self_serve`), and design the hero so the button can become «Встановити з Poster» without a redesign. Note this for the build session.

---

## 6. SEO spec (on-page, for a brand-new domain)

### 6.1 Realistic expectation
A new domain with no backlinks ranks for **branded + long-tail UA terms** in 3–6 months; SEO is a slow compounding channel. The **real early channels are Telegram/Instagram/community + the Poster ecosystem** ([pricing-and-GTM research](https://github.com/feelofeel/fefo/blob/main/docs/research/pricing-and-gtm.md) §7) — SEO is hygiene, not the growth engine. Do it right, don't over-invest.

### 6.2 Title & meta (UA primary)
- **Title (≤60 chars):** «SORT — контроль термінів придатності поверх Poster»
- **Meta description (≤160):** «SORT під'єднується до Poster і сповіщає баристу, що псується сьогодні. Менше списань, нуль ручного обліку. Підключіть свій заклад.»

### 6.3 Heading hierarchy (one H1, section H2s = the §4 titles)
H1 = hero headline; H2s = Problem / Як це працює / Можливості / Хіба Poster не вміє / Ціни / Часті запитання; H3s = feature card titles + FAQ questions. Semantic HTML (`header/section/article/figure/figcaption/footer`).

### 6.4 Image alt text
Every screenshot gets descriptive Ukrainian alt naming the SORT screen (drafts in §4). Critical because the page is image-heavy.

### 6.5 Structured data (JSON-LD)
- `Organization` (feelofeel + contact).
- `SoftwareApplication` (name SORT, category BusinessApplication, operatingSystem Web).
- `FAQPage` (the §4.10 Q/A) — best SERP ROI for a single page.

### 6.6 Social & crawl
- Open Graph + Twitter `summary_large_image` use the curated `public/og.jpg` (1200×630), including explicit secure URL, type, dimensions, and localized alt metadata.
- `sitemap.xml`, `robots.txt`, `canonical`.
- **hreflang** ready for `uk` now and `ru`/`en` later (matches the GTM localization sequence §7.7).

### 6.7 Core Web Vitals (a ranking + conversion factor)
LCP < 2.5s, CLS < 0.1, INP < 200ms. Tactics: WebP/AVIF hero < 300KB, reserve image dimensions, defer analytics, minimal JS. **This is where the tech choice (§7) pays off** — a static page hits these by default.

### 6.8 UA keyword seeds (for copy + meta, not stuffing)
«облік термінів придатності кафе», «контроль прострочки кав'ярня», «списання продуктів Poster», «термін придатності інтеграція Poster», «зменшити списання кафе».

---

## 7. Marketing instrumentation (set up now, pays off later)

### 7.1 Analytics — **Plausible** (recommended over GA4)
Privacy-friendly, no cookie banner, ~1KB (won't hurt §6.7), enough for lead-gen. GA4 is overkill and a CWV/consent tax for a single page.

### 7.2 Events to track from day one
`cta_click_hero`, `form_view`, `form_submit`, `telegram_click`, `faq_expand`. These are the funnel.

### 7.3 UTM scheme (so Telegram/Instagram/Poster traffic is attributable)
`utm_source` (telegram/instagram/poster/roaster), `utm_medium` (social/referral/community), `utm_campaign` (lviv_launch). Hand these links to community posts and the Poster listing later.

### 7.4 Lead handling (CRM-lite)
Form → (a) **email to Dee** + (b) **row in Supabase** `leads` table (you already run Supabase — keep lead data in-house, no new SaaS). Optional Telegram notification to Dee on submit. No Airtable/Zapier needed at this scale unless you prefer the UI.

### 7.5 Deliberately skipped for now
Retargeting pixels (privacy cost > ROI below ~50 leads/wk) and A/B testing (needs ~500 visitors/mo to be meaningful). Note as "later".

---

## 8. Tech and infrastructure

### 8.1 Implemented architecture
**A separate static Astro 7 marketing site deployed on Cloudflare Pages at `getsort.app`.** A **Cloudflare Pages Function** handles the lead form, writes to Supabase `leads`, and sends the best-effort Resend notification.

### 8.2 Why separate, not a route in the PWA
| Option | SEO | Perf (CWV) | Effort | Verdict |
|---|---|---|---|---|
| **Astro static on CF Pages (new project)** | Pre-rendered HTML, ideal | 100 by default | ~2–3 days | **Recommended** |
| Static HTML/CSS hand-rolled | Ideal | Ideal | ~1 day | OK but no components/iteration |
| Route in existing Vite PWA (`fefo.pages.dev`) | SPA = JS-rendered, weak for a new domain; bloats app bundle | Worse | ~3 days | **Reject** — the app is a logged-in PWA, wrong tool for a public marketing page |
| Next.js/Remix on Railway | Fine | Fine | ~1 wk | Over-engineered |

Keeping it separate also means **marketing iteration never risks the prod PWA**, and the app bundle stays lean.

### 8.3 Why it fits the existing stack
- **Cloudflare Pages** already hosts the PWA — same account, same Git-deploy muscle memory, free tier covers it.
- **Supabase** already runs — a `leads` table is trivial and keeps data in-house ([reuse, don't add SaaS]).
- **Resend** (or Cloudflare Email) for the notification email; Pages Functions for the endpoint — no new Railway service needed.
- Do **not** serve the landing from the PWA root; the public landing is `getsort.app` and the application is `app.getsort.app`.

### 8.4 Form endpoint
`POST /api/lead` (Pages Function) → honeypot and rate-limit checks → validate contact and length bounds → insert Supabase `leads` → send Resend email to Dee → return structured JSON. Upstream insert failures return an error; a missing service-role key returns `persisted: false` instead of claiming the lead was stored.

### 8.5 Operational configuration
Cloudflare Pages needs `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `PUBLIC_PLAUSIBLE_DOMAIN`, and `PUBLIC_SITE_URL`; the public Supabase project URL is fixed in the function. Keep the authoritative inventory in `.env.example` and verify production/preview values in the Pages dashboard.

---

## 9. Resolved implementation decisions

### 9.1 Page language — Ukrainian default plus English
Ukrainian is canonical at `/`; English is published at `/en/`. The native Astro i18n routes, manual language switcher, and `uk`/`en`/`x-default` hreflang are live.

### 9.2 CTA mechanism — contact form plus Telegram
The short form is primary and a direct `@feelofeel` Telegram link is the low-friction alternative. No calendar is embedded.

### 9.3 Domain / brand — `getsort.app`
The landing is live at `getsort.app`; the application is linked at `app.getsort.app`.

### 9.4 Tech approach — separate Astro site
The landing is a separate Astro 7 repository and Cloudflare Pages project, so marketing iteration remains isolated from the FEFO/SORT PWA.

### 9.5 Pricing — light honest teaser
The page shows Free plus one Pro card with an intentionally uncommitted `від ₴…` price and personal-onboarding note.

### 9.6 Product visuals — real UI, curated
All six feature surfaces are represented with committed Ukrainian UI assets; the hero remains an honest video placeholder until a real walkthrough is ready.

---

## 10. Maintenance checklist

1. Start copy/visual changes in this spec, then update both locale dictionaries and markup.
2. Recapture visuals from the FEFO/SORT demo seed; commit only curated public assets.
3. Run `pnpm test` and `pnpm build`; visually verify Ukrainian/English desktop and mobile output when layout changes.
4. Run `/feel-doc` after meaningful spec edits and `feel-repeat --diff` after any doc change.
5. Run `/sort-release` for every Cloudflare preview or production deployment; `CHANGELOG.md` is mandatory.
6. Periodically verify Pages environment variables, lead persistence/notification behavior, analytics events, schema, and Core Web Vitals.

---

## Appendix A — feature → page mapping (traceability)

| Page element | Source (app-user-stories) | Notes |
|---|---|---|
| Hero «Сьогодні» shot | Feature 1 | Money shot; red/amber sections |
| F1 shift-start push | Features 1, 12 | Core promise |
| F2 Today | Feature 1 | Prioritized surface |
| F3 one-tap write-off | Feature 4 | FEFO leftover pre-fill + undo |
| F4 zero data entry | Features 2, 27 | Confirm + Poster import |
| F5 waste analytics | Feature 25 | "see why" ROI proof |
| F6 shelf without chat photos | Feature 14 & 20 | Secondary manager-value proof; visual stock cards support the value |
| Trust strip | Features 26, 4; invariants | Offline, reversible, Poster-record |
| Objection block | competitor-brief §8.1 | Altitude line |
| Onboarding flow | onboarding-tenant guide; SCRUM-11/35 | Manual now → self-serve later |
| Pricing teaser | pricing-and-gtm §3 | Free + one paid band |

## Appendix B — what's deliberately NOT on the page
Sub-batches/derivation, concurrent-batch rotation, thermal shelves, remove-from-shelf manager queue — all **satellites** ([feature decomposition](https://github.com/feelofeel/fefo/blob/main/docs/product/decomposition.md) §4, §7) that distract from the core loop in a first pitch. Mention "and more" at most; don't feature them.
