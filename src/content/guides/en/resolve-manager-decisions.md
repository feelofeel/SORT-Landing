---
id: "public-resolve-manager-decisions-en"
title: "Resolve manager decisions"
summary: "Clear unknown expiry, removed batches, and Poster changes without unsafe retries."
locale: "en"
translationKey: "resolve-manager-decisions"
translationRevision: 6
slug: "resolve-manager-decisions"
diataxis: "how-to"
audience: "manager"
updated: "2026-09-19"
sourceRevision: 6
order: 70
pageKind: "article"
---

Open **Settings → Manager decisions**. This is an exception queue, not a list of routine tasks; a useful goal is to bring its counter back to zero.

## Choose the decision type

- **Unknown expiry:** add shelf life and, if needed, a shelf; or choose **Do not track**.
- **Removed:** restore a real batch by adding shelf life, or keep an irrelevant item outside tracking.
- **From barista:** review the proposed duration and choose **Save shelf life** so it applies to future supplies.
- **Poster changes:** read what changed and choose the action whose consequence is described on the card.

For a quantity discrepancy, **Fix** brings SORT in line with Poster's current stock but does not change Poster. If SORT has no batch for the item yet, **Fix** creates one, and the barista confirms it on **Today**. **Poster data is wrong** means the quantity should be corrected in Poster itself. **Accept as is** closes an unchanged difference without correcting either side.

SORT reconciles stock by itself at the start of every shift. If you have just recounted an item in Poster and don't want to wait for the next shift, tap **🔁 Reconcile stock with Poster** at the top of the **Poster changes** tab: SORT re-reads every warehouse and refreshes this list. It changes nothing — not in Poster, not in its own batches.

Small differences don't have to become decisions: in **Time and notifications → Allowed difference with Poster** set a threshold for piece (pcs), weight (g), and volume (ml) items. SORT does not compare quantities for non-perishable items such as cups and lids.

When a card shows **Actually used / Recorded in Poster / Linked to SORT batches / SORT discrepancy**, the full use is already in Poster. Negative Poster stock may be correct evidence. Check for a missing supply, an inventory count, or a late staff record, then choose **Mark as handled**. Do not create another write-off for this card.

If SORT cannot resolve the name, the card shows the item type and exact ID and disables **Fix**. Synchronize the catalog first; do not match a deleted ingredient to a new good merely because their names are similar. After a bulk closure, the journal retains the affected items and their Poster/SORT values.

If **Mark historical as reviewed (N)** appears above the list, these are one-time safety records created by the update for batches that had already finished. SORT cannot prove whether their ingredients were written off earlier, so it does not repeat the write-off. The action closes only those historical records and writes nothing to Poster; current failures and interrupted operations stay in the queue for individual review.

If a write-off outcome is marked unknown, do not retry it blindly. Check the record in Poster first, then confirm the matching decision in SORT. [Learn why the systems divide responsibility](/en/guides/sort-and-poster/).
