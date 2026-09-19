---
title: Lead Follow-up Templates & Outreach Playbook
id: lead-followup-templates
role: guide
status: canonical
doc_revision: 1
app_version: 1.0.0
updated: 2026-09-17
source_of: []
derived_from: [landing-page-definition]
diataxis: how-to
toc:
  - "§1 Overview & Lead Response SLA"
  - "§2 Primary Email Follow-up Template"
  - "§3 Telegram Outreach Templates"
  - "§4 Context-Specific Email Variations"
  - "§5 Response Handling Playbook"
---

# Lead Follow-up Templates & Outreach Playbook

> **Status: canonical outreach & lead response guide for SORT.**  
> Grounding: [Landing Page Definition](landing-page-definition.md) §5 (lead capture & onboarding flow).

---

## §1 Overview & Lead Response SLA

When leads submit contact details via [`getsort.app/#contact`](https://getsort.app/#contact), form submissions enter Supabase `public.leads` and trigger email/Telegram notifications.

Leads can provide:
- **Name** (optional)
- **Poster Subdomain** (e.g. `mycafe.joinposter.com` — optional)
- **Contact** (`@tg_username` or `email` — required)
- **Message** (optional note/question)

### Response SLA
- **Telegram contacts:** Respond within 1–2 hours during business hours (highest conversion rate).
- **Email contacts:** Respond within 24 hours.

---

## §2 Primary Email Follow-up Template

Use this universal, warm response template when replying to leads via email.

```markdown
Тема: Підключення SORT для [Назва закладу / Ім'я] ☕️

Вітаю, [Ім'я]!

Дякую за звернення через сайт SORT.

Я отримав(ла) ваш запит щодо підключення вашого Poster ([URL_аккаунту.joinposter.com або "вашого закладу"]).

Ми запускаємо перші заклади особисто та безкоштовно: допомагаємо налаштувати товари, полиці та терміни придатності під вашу щоденну рутину, щоб бариста бачили ризики ще до відкриття зміни.

Як нам зручніше зробити наступний крок?
1. Короткий созвон (10–15 хв): Я покажу на демо, як SORT працює поверх Poster, і ми обговоримо специфіку вашого закладу.
2. Асинхронний запуск: Ви надаєте нам доступ до Poster, ми налаштовуємо базовий реєстр товарів і надсилаємо вам готовий тестовий кабінет.

Підкажіть, який варіант вам зручніший або коли маєте вільне вікно на короткий здзвін?

З повагою,
[Ваше ім'я]
Команда SORT — контроль термінів придатності поверх Poster
🌐 https://getsort.app
💬 Telegram: https://t.me/feelofeel
```

---

## §3 Telegram Outreach Templates

If the prospect provided a Telegram handle (`@username`), contact them directly on Telegram for faster engagement.

### Standard Telegram Opening

> **Вітаю, [Ім'я]! 👋**  
> Це [Ваше ім'я] із **SORT** (https://getsort.app). Побачив(ла) вашу заявку на сайті щодо підключення Poster [до вашого закладу / poster_url].
> 
> Ми зараз особисто підключаємо перші заклади й налаштовуємо все під ваші товари/постачання, щоб ви забули про списання в нотатках чи чатах.
> 
> Підкажіть, вам зручніше здзвонитися на 10 хвилин і подивитися коротке демо, чи надіслати короткий відео-огляд і узгодити запуск тут у чаті?

---

## §4 Context-Specific Email Variations

### Option A: Lead Provided Poster Account Domain (`mycafe.joinposter.com`)

Use this when the lead explicitly included their Poster URL in the form.

```markdown
Тема: Запуск SORT для [poster_url] — наступний крок

Вітаю, [Ім'я]!

Дякую за заявку! Бачу ваш акаунт Poster: [poster_url].

Щоб ми могли під'єднати тестову інтеграцію та налаштувати SORT під ваші товари та постачання:

1. Надішліть нам доступ запрошеного користувача в Poster (з правами на перегляд товарів/постачань) на email: [ваш_email_для_poster].
2. Або давайте здзвонимося на 10 хвилин в Zoom/Google Meet — я покажу наочно, як створюються партії з термінами й робиться списання в один дотик.

Коли вам було б зручно поспілкуватися чи розпочати налаштування?

З повагою,
[Ваше ім'я] | https://getsort.app
```

### Option B: Lead Asked a Question in the Message Field

Use this when the lead wrote a custom message or asked how a specific feature works.

```markdown
Тема: Відповідь щодо SORT для [Ім'я / Заклад]

Вітаю, [Ім'я]!

Дякую за питання: «[Текст запитання ліда]».

Щодо цього:
[Коротка відповідь, наприклад: SORT не змінює ваш облік в Poster, а працює поверх нього. Коли бариста робить списання в SORT, запис автоматично створюється в Poster зі збереженням причин та кількості.]

Пропоную зробити короткий 10-хвилинний дзвінок, де я покажу це в дії на живому інтерфейсі.

Який день та час на цьому тижні вам підходить?

З повагою,
[Ваше ім'я] | https://getsort.app
```

---

## §5 Response Handling Playbook

1. **Check Form Payload:** Review `name`, `poster_subdomain`, `contact`, and `message` from Resend notification email or Supabase table `public.leads`.
2. **Determine Channel:**
   - If `contact_type == "telegram"`, open Telegram and send §3 template.
   - If `contact_type == "email"`, reply directly using §2 or §4 templates.
3. **Follow-Up Cadence:**
   - **Day 1:** Initial response (Templates above).
   - **Day 3 (if no reply):** Soft nudge ("Вітаю, [Ім'я]! Хотів(ла) уточнити, чи вдалося переглянути попереднє повідомлення щодо підключення SORT?").
   - **Day 7 (final check-in):** Low-friction closing message ("Вітаю! Якщо питання контролю термінів придатності буде актуальним пізніше — пишіть у будь-який момент.").
