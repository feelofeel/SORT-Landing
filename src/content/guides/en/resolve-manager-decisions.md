---
id: "public-resolve-manager-decisions-en"
title: "Resolve manager decisions"
summary: "Clear unknown expiry, removed batches, and stock differences without unsafe retries."
locale: "en"
translationKey: "resolve-manager-decisions"
translationRevision: 9
slug: "resolve-manager-decisions"
diataxis: "how-to"
audience: "manager"
updated: "2026-10-16"
sourceRevision: 9
order: 90
pageKind: "article"
---

Open **Settings → Manager decisions**. This is an exception queue, not a list of routine tasks; a useful goal is to bring its counter back to zero. The counter includes only what waits for your decision: the red line at the top, the **Unknown expiry**, **From barista**, and **Waiting for manager** tabs, and the **Needs your decision** section of the **Stock** tab. When no tab is chosen, the page opens on the first one that has work.

## First, the red line at the top

When a write-off was not confirmed by Poster, or an offline tap from the tablet arrived late, a red line appears at the top of every tab (and on the Settings home page): "3 write-offs were not confirmed in Poster — check today". Tap it to see the cards. SORT also nudges you with a notification at the end of the shift.

- **One barista action is one card.** If confirming a batch fired several linked write-offs and Poster did not answer for more than one, they sit in one card, one line per write-off.
- The card checks Poster by itself and looks for the record carrying SORT's exact request time. Records that already belong to other SORT write-offs are never offered. The result is one sentence and one recommended button: **Confirm: it is not in Poster** or **Confirm write-off №N**. When the answer is the same for every line, one button decides the whole action.
- Under **It is not in Poster** the card says what follows. A plain batch that is still on the shelf can be written off again by a barista. For a linked write-off or a closed batch, SORT repeats nothing — enter the write-off in Poster by hand.
- Never retry an unknown Poster answer blindly: SORT does not create the write-off a second time; it only records what you found in Poster.

## Choose the decision type

- **Unknown expiry:** add shelf life and, if needed, a shelf; or choose **Do not track**.
- **Waiting for manager:** batches a barista set aside or removed. Restore a real batch by adding shelf life, or keep an irrelevant item outside tracking. Items you have already marked **Do not track** are neither shown nor counted here.
- **From barista:** review the proposed duration and choose **Save shelf life** so it applies to future supplies.
- **Stock:** differences between SORT and Poster, and what only Poster can fix.

## Stock

- **Needs your decision** — what SORT will not close without you: a quantity discrepancy, a new delivery on an empty Poster balance, a new catalog item. The oldest cards come first; from the second day a card shows how many days it has been waiting.
- **Still checking** (collapsed) — differences SORT has just noticed by itself. Many disappear on their own, so we ask about them after 12 hours or after the next check; they are not in the counter. A difference found by your own **🔁 Reconcile stock with Poster** shows up at once.
- **Fix in Poster** — a short list of what only Poster can fix: negative stock (a supply was never entered) or a write-off that was changed or deleted. Each line says what is wrong, with **Poster ↗** (open Poster) and **Hide**; **Details** shows the full card. **Hide** only removes the line from the list. This list is not in the counter.

Differences with one cause — one delivery, one Poster stocktake, one start-of-shift check — are collected into one card, for example "After delivery №5052 · 10 items", with a **⟳ Fix all (10)** button. It fixes the items one by one, re-reading each in Poster first, and stops at the first one that fails. **Show items** opens the ordinary cards, **Other options** holds **Close all without changes**. Differences where you must pick the side (**Not on the shelf**, a corrected remainder, a shelf recount) have no such button. Every verdict sentence on a card ends with what to do next.

For a quantity discrepancy, **Fix** brings SORT in line with Poster's current stock but does not change Poster. If Poster already holds a delivery that SORT has not received yet, **Fix** refuses and asks you to wait: SORT creates the batches itself when Poster sends the delivery. If SORT has no batch for the item yet, **Fix** creates one, and the barista confirms it on **Today**. That batch's received date and expiry count from the Poster supply the stock most likely came from, not from your tap, so it may already be expired — have the barista check it on the shelf. For an item marked **Do not track**, **Fix** only closes the decision. **Poster data is wrong** means the quantity should be corrected in Poster itself. **Close without changes** closes the difference without correcting either side. When a **Sold** action or a corrected remainder explains the difference, the card's main button is **Close without changes**. If an item keeps coming back, its card says "Repeats: N times in 30 days" — another fix will not remove the cause; check that deliveries are entered in Poster on time.

SORT remembers your decision: after **Close without changes**, **Poster data is wrong**, or **This is a new supply — the goods are here**, the same difference does not come back until it changes. A new delivery that nobody has confirmed still gets its own card.

SORT reconciles stock by itself at the start of every shift. If you have just recounted an item in Poster and don't want to wait for the next shift, tap **🔁 Reconcile stock with Poster** at the top of the **Stock** tab: SORT re-reads every warehouse and refreshes this list. The message says how many decisions it opened or refreshed and how many differences you had already accepted. The check changes nothing — not in Poster, not in its own batches.

Small differences don't have to become decisions: in **Time and notifications → Allowed difference with Poster** set a threshold for piece (pcs), weight (g), and volume (ml) items. SORT does not compare quantities for non-perishable items such as cups and lids.

When a card shows **Actually used / Recorded in Poster / Linked to SORT batches / SORT discrepancy**, the full use is already in Poster. Negative Poster stock may be correct evidence. Check for a missing supply, an inventory count, or a late staff record, then choose **Mark as handled**. Do not create another write-off for this card.

If SORT cannot resolve the name, the card shows the item type and exact ID. **Fix** first checks that ID in Poster's current catalog: if the item is gone and SORT has no batches of it, the decision closes; if batches remain, the card tells you what to do. Do not match a deleted ingredient to a new good merely because their names are similar. After a bulk closure, the journal retains the affected items and their Poster/SORT values.

[Learn why the systems divide responsibility](/en/guides/sort-and-poster/).
