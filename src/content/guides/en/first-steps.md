---
id: "public-first-steps-en"
title: "Prepare SORT for the first shift"
summary: "Connect a manager, configure products, and verify the first batch before the team starts."
locale: "en"
translationKey: "first-steps"
translationRevision: 3
slug: "first-steps"
diataxis: "tutorial"
audience: "manager"
updated: "2026-09-19"
sourceRevision: 3
order: 20
pageKind: "article"
---

By the end of this walkthrough, a test supply from Poster will appear in SORT with the correct name, quantity, shelf, and expiry.

## 1. Check the foundation in Poster

Make sure ready-made items are **Goods**, items made in the café have tech cards, supply units match stock units, and the account has a storage, named suppliers, and at least two waste reasons. The SORT team maintains a more detailed technical configuration reference.

## 2. Sign in as a manager

1. Open [app.getsort.app](https://app.getsort.app).
2. Enter the work email used as the employee `login` in Poster.
3. Open the email on the same device and follow the sign-in link.
4. Confirm that **⚙️ Settings** is visible. If it is not, check the employee role in Poster.

## 3. Create shelves and rules

In **Settings → Shelves**, create locations that match the real café, such as Display, Fridge, and Bar. Then open **What to track**, choose what SORT should track, and assign shelf life and an initial shelf. See [configure shelf life and shelves](/en/guides/configure-products-and-shelves/) for the focused procedure.

## 4. Set the shift rhythm

Under **Time and notifications**, set the time zone, weekday and weekend start times, shift end, and the required pushes. Allow notifications on the work tablet.

## 5. Run a test batch

1. Create a small test supply in Poster.
2. Open **Today** in SORT.
3. Compare its name, quantity, shelf, and date with the packaging.
4. Correct anything that differs, or tap **Confirm**.

## 6. Bring in what is already on the shelf

SORT creates batches from supplies. Stock that sat on the shelf before you connected SORT has no supply behind it, so enter it once by hand.

1. Run a stocktake in Poster so its leftovers are fresh. This is optional, but everything below reads those numbers.
2. Open **Manager decisions → Poster changes** and tap **🔁 Reconcile stock with Poster**.
3. Every tracked item that Poster has and SORT does not yet becomes a card.
4. For an item that really is on the shelf, tap **Fix** — SORT creates the batch and the barista confirms it on **Today**.
5. For a leftover not worth tracking from scratch, tap **Close with no change**.

Expiry on these batches is an estimate, not a date from the packaging: SORT has no supply date for stock it never saw. The barista sharpens it at confirmation.

Once the test passes, give the barista the [first-shift walkthrough](/en/guides/barista/first-shift/). If the batch is missing or has unknown expiry, open [Manager decisions](/en/guides/resolve-manager-decisions/).
