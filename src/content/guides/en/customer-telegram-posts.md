---
id: "public-customer-telegram-posts-en"
title: "Post to your customers on Telegram"
summary: "Connect your customers' Telegram group and publish the fresh-today and discount-today posts only after you have checked the text."
locale: "en"
translationKey: "customer-telegram-posts"
translationRevision: 3
slug: "customer-telegram-posts"
diataxis: "how-to"
audience: "manager"
updated: "2026-10-11"
sourceRevision: 3
order: 70
pageKind: "article"
---

The page **Settings → Reports → Telegram posts** (shown in the app as «Дописи в Telegram») prepares two short posts for your customers' group: what is fresh today and what is discounted today. You read the text, edit it if needed, and tap **Publish** (**Опублікувати**) yourself. **SORT never posts on its own**: there is no schedule and no automatic retry.

This section is for managers and owners; baristas do not see it.

## How a post is written

An AI (Claude) writes the wording, and SORT inserts the facts: product names, counts in pieces, the discount percentage, and a coffee's facts from its confirmed customer description. The AI is never given counts, prices, or data about staff or customers, changes nothing in SORT, and never contacts Poster. It describes taste, origin or processing only from a confirmed description; without one it says nothing about them. If the AI fails or writes something unusual (a number, a price, a link, a name SORT didn't give it), SORT builds a plain template instead. Either way, you read and approve the text.

## Add a customer description

For the post to say what a coffee is like, the coffee needs a confirmed description. We prepare draft descriptions from the roaster's catalog for the coffees the barista picks when writing off with the batch: country, region, variety, process and a short note on taste. You only check and confirm them.

1. Open **Settings → Item registry**. A coffee with a draft description has a dimmed coffee-bean mark with a «?» ("customer description waiting for confirmation").
2. Tap the card: **More (Додатково) → Customer description (Опис для гостей)** opens straight away.
3. Read the rows (**Country**, **Region**, **Variety**, **Process**…) and the **Description**. If all is right, tap **Confirm** (**Підтвердити**). If not, correct it, tap **Save**, then **Confirm**.

Once confirmed, the mark turns solid and the status line shows "Confirmed 10.10". You can also add a description by hand to any item in the same place. If you change it later without confirming again, it goes back to a draft and leaves the posts.

## Set up Telegram once

1. In Telegram, open the bot **@BotFather**, create a bot, and copy its token. A token looks like `123456789:AA…`. Whoever knows the token controls the bot, so do not send it in chats or screenshots.
2. Create a group for customers (or use an existing one), add the bot, and make it an administrator; otherwise it cannot post.
3. Find the group ID (see below).
4. Enter the token and ID in SORT and check the group.

### How to find the group ID

A group ID is a number with a minus sign, most often like `-100…`. The Telegram app does not show it, so ask the bot. The addresses below contain your token, so open them only in your own browser: do not paste one into a chat, email, or ticket, and do not share a screenshot of it.

**Option 1: the bot's recent events.** Add the bot to the group (or remove and re-add it), then open `https://api.telegram.org/bot<TOKEN>/getUpdates` in your browser, replacing `<TOKEN>` with yours. Find the `my_chat_member` entry: its `chat` → `id` is the number you need. If the list is empty, add the bot to the group again and reload the page.

**Option 2: a public group with a name like `@name`.** Open `https://api.telegram.org/bot<TOKEN>/getChat?chat_id=@name`. The number in the `id` field is the group ID.

When an ordinary group becomes a supergroup, Telegram changes its ID. SORT then tells you which new ID to save.

## Set up the posts in SORT

In the **Customer group** block («Група покупців»), fill in:

- **Bot token**. SORT only accepts the token and never shows it again; it says "saved". To replace the token, enter a new one.
- **Group ID**. This is the customers' group. Staff reminders never go to this group: if the ID equals your staff group's ID, staff reminders are not sent there.
- **Shelves for posts**. Tick the shelves whose items may be advertised. Usually that is the display case and coffee.
- **Discount, %**. The café's discount on everything that expires today, a whole number from 1 to 90. If you leave it empty, the post says "with a discount" without a number.

Tap **Save**, then **Check group**. The check only reads from Telegram and **does not send any test message**. It answers that the bot can post in the group "…", or tells you what to fix: wrong token, the bot is not in the group, the bot is not an administrator, or the group became a supergroup. It also says whether AI writing is connected. If it is not, every post is built from the plain template and the page works the same way.

Every item in a discount post gets the discount at the till, so tell your team which discount is running.

## The two posts

Only items that are confirmed, on a chosen shelf, not set aside, in stock according to SORT, and expiring **later today with at least two hours left** can appear. Anything already overdue never does.

- **Fresh today**. What arrived or was prepared today, for example filter coffee, together with the coffees the barista picked when writing off with the batch. When a coffee has a confirmed description, the text talks about it and SORT adds its facts as a quote (lines like «Країна: …», «Обробка: …»). No numbers except those in the description (an altitude, say). Each **Prepare again** takes a different angle, and SORT remembers the last five published posts so the same beans don't read the same every day.
- **Discount today**. What arrived on an earlier day and expires today: exactly the items marked **🏷️ Discount today** on the tablet. Today's fresh coffee gets no discount. Items counted in pieces show SORT's count as "N pcs"; weighed and poured items carry no number.

## Prepare, check, and publish

1. Tap **Prepare** under the post you want.
2. Read the text. The **AI** badge means Claude wrote the wording and SORT inserted the facts. The **Template** badge means SORT's plain template. Under the text you see the list of items it used.
3. Edit the text on screen if needed. Its counts come from SORT, so correct one if you know better.
4. Tap **Publish**. Exactly the text on screen goes to the group. Lines that start with «>» become a quote in Telegram; everything else is plain text without formatting. The page shows "Published at HH:MM".

If nothing qualifies today, the page says so and offers no **Publish** button.

### When to prepare again

A draft lasts 10 minutes. If you changed the settings, an item ran out, its count changed, or less than two hours are left before it expires, SORT asks you to tap **Prepare again** instead of publishing stale text. Your edits are never silently rewritten.

SORT will not accept the same text twice within 10 minutes, even from another device.

If the whole list does not fit in one post, SORT keeps only complete item lines and writes "Not all items fit: N". It never cuts a name or a count. If even one item does not fit, shorten the names in Poster and prepare the post again.

### If the outcome is unknown

Sometimes Telegram does not answer in time and SORT cannot tell whether the post arrived. It then shows that Telegram's answer was lost and **does not resend on its own**. Open the customers' group and check whether the post is there. That same text stays blocked for 24 hours so you cannot end up with a duplicate. After you have checked the group, you can prepare a different post.

Each publication is recorded in the **Event log**: which post it was, AI or template, whether you edited it, and the text itself.

[See why SORT and Poster split responsibility](/en/guides/sort-and-poster/).
