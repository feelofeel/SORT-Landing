---
id: "public-resolve-manager-decisions-en"
title: "Resolve manager decisions"
summary: "Clear unknown expiry, removed batches, and Poster changes without unsafe retries."
locale: "en"
translationKey: "resolve-manager-decisions"
translationRevision: 8
slug: "resolve-manager-decisions"
diataxis: "how-to"
audience: "manager"
updated: "2026-09-25"
sourceRevision: 8
order: 80
pageKind: "article"
---

Open **Settings → Manager decisions**. This is an exception queue, not a list of routine tasks; a useful goal is to bring its counter back to zero. The counter includes only what waits for your decision: the **Unknown expiry**, **From barista**, and **Removed** tabs, and the **Needs your decision** section of the **Poster changes** tab. When no tab is chosen, the page opens on the first one that has work.

## Choose the decision type

- **Unknown expiry:** add shelf life and, if needed, a shelf; or choose **Do not track**.
- **Removed:** restore a real batch by adding shelf life, or keep an irrelevant item outside tracking. Items you have already marked **Do not track** are neither shown nor counted here.
- **From barista:** review the proposed duration and choose **Save shelf life** so it applies to future supplies.
- **Poster changes:** the cards are sorted into three sections by what you can do.

## Poster changes: three sections

- **Needs your decision** — what SORT will not close without you: a quantity discrepancy, a new delivery on an empty Poster balance, a new catalog item, an unfinished write-off. The oldest cards come first; from the second day a card shows how many days it has been waiting.
- **Fix in Poster** — the cause is in Poster itself: negative stock (a supply was never entered) or a write-off that was changed or deleted. SORT cannot fix it: tap **Open Poster ↗** and correct it there. **Close without changes** only removes the card; **Close all without changes** in this section closes only its own cards.
- **For information** (collapsed) — nothing to do: the decision is already made, the barista resolves it on **Today**, or the record only explains what happened.

For a quantity discrepancy, **Fix** brings SORT in line with Poster's current stock but does not change Poster. If SORT has no batch for the item yet, **Fix** creates one, and the barista confirms it on **Today**. That batch's received date and expiry count from the Poster supply the stock most likely came from, not from your tap, so it may already be expired — have the barista check it on the shelf. For an item marked **Do not track**, **Fix** only closes the decision. **Poster data is wrong** means the quantity should be corrected in Poster itself. **Close without changes** closes the difference without correcting either side. When a **Sold** action or a corrected remainder explains the difference, the card's main button is **Close without changes**.

SORT remembers your decision: after **Close without changes**, **Poster data is wrong**, or **This is a new supply — the goods are here**, the same difference does not come back until it changes. A new delivery that nobody has confirmed still gets its own card.

SORT reconciles stock by itself at the start of every shift. If you have just recounted an item in Poster and don't want to wait for the next shift, tap **🔁 Reconcile stock with Poster** at the top of the **Poster changes** tab: SORT re-reads every warehouse and refreshes this list. The message says how many decisions it opened or refreshed and how many differences you had already accepted. The check changes nothing — not in Poster, not in its own batches.

Small differences don't have to become decisions: in **Time and notifications → Allowed difference with Poster** set a threshold for piece (pcs), weight (g), and volume (ml) items. SORT does not compare quantities for non-perishable items such as cups and lids.

When a card shows **Actually used / Recorded in Poster / Linked to SORT batches / SORT discrepancy**, the full use is already in Poster. Negative Poster stock may be correct evidence. Check for a missing supply, an inventory count, or a late staff record, then choose **Mark as handled**. Do not create another write-off for this card.

If SORT cannot resolve the name, the card shows the item type and exact ID. **Fix** first checks that ID in Poster's current catalog: if the item is gone and SORT has no batches of it, the decision closes; if batches remain, the card tells you what to do. Do not match a deleted ingredient to a new good merely because their names are similar. After a bulk closure, the journal retains the affected items and their Poster/SORT values.

If **Mark historical as reviewed (N)** appears in the **For information** section, these are one-time safety records created by the update for batches that had already finished. SORT cannot prove whether their ingredients were written off earlier, so it does not repeat the write-off. The action closes only those historical records and writes nothing to Poster; current failures and interrupted operations stay in the queue for individual review.

If a write-off outcome is marked unknown, do not retry it blindly. Check the record in Poster first, then confirm the matching decision in SORT. [Learn why the systems divide responsibility](/en/guides/sort-and-poster/).
