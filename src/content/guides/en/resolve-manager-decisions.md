---
id: "public-resolve-manager-decisions-en"
title: "Resolve manager decisions"
summary: "Clear unknown expiry, removed batches, and Poster changes without unsafe retries."
locale: "en"
translationKey: "resolve-manager-decisions"
translationRevision: 2
slug: "resolve-manager-decisions"
diataxis: "how-to"
audience: "manager"
updated: "2026-08-10"
sourceRevision: 2
order: 70
pageKind: "article"
---

Open **Settings → Manager decisions**. This is an exception queue, not a list of routine tasks; a useful goal is to bring its counter back to zero.

## Choose the decision type

- **Unknown expiry:** add shelf life and, if needed, a shelf; or choose **Do not track**.
- **Removed:** restore a real batch by adding shelf life, or keep an irrelevant item outside tracking.
- **From barista:** review the proposed duration and choose **Save shelf life** so it applies to future supplies.
- **Poster changes:** read what changed and choose the action whose consequence is described on the card.

For a quantity discrepancy, **Fix** brings SORT in line with Poster's current stock but does not change Poster. **Poster data is wrong** means the quantity should be corrected in Poster itself. **Accept as is** closes an unchanged difference without correcting either side.

If **Mark historical as reviewed (N)** appears above the list, these are one-time safety records created by the update for batches that had already finished. SORT cannot prove whether their ingredients were written off earlier, so it does not repeat the write-off. The action closes only those historical records and writes nothing to Poster; current failures and interrupted operations stay in the queue for individual review.

If a write-off outcome is marked unknown, do not retry it blindly. Check the record in Poster first, then confirm the matching decision in SORT. [Learn why the systems divide responsibility](/en/guides/sort-and-poster/).
