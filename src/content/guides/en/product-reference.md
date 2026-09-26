---
id: "public-product-reference-en"
title: "SORT roles, states, notifications, and limits"
summary: "A safe quick reference to who sees what in SORT, how to read states, and what the product does not do."
locale: "en"
translationKey: "product-reference"
translationRevision: 3
slug: "product-reference"
diataxis: "reference"
audience: "team"
updated: "2026-08-26"
sourceRevision: 3
order: 70
pageKind: "article"
---

## Roles

| Role | Access |
|---|---|
| Barista | **Today**, **Shelf**, and actions to confirm, correct, move, or write off batches |
| Manager or owner | Everything a barista sees, plus Settings, Product registry, Shelves, Decisions, reports, and the event journal |

The role comes from the Poster employee. The SORT sign-in email must match that employee's `login` in Poster.

## Visible states

- **New batch** — waiting to be checked against the physical item.
- **Normal** — active, with expiry not yet close.
- **Today** — expires today.
- **Expired** — expiry has passed; the item does not disappear without a write-off.
- **Unknown expiry** — no rule exists; a barista enters the date and a manager can save the rule.
- **Sold?** — SORT estimates zero remainder and asks for a physical confirmation.
- **Removed** — hidden from the shelf without creating a Poster write-off.
- **Inventory health** — a manager recommendation of `aligned` / `early signal` / `inventory due`, based on transparent accounting signals and saved at the start or end of a shift. The card names when it was checked; before the first scheduled check, it gives no recommendation. It is neither an emergency nor an automatic action.

## Notifications

Shift start announces batches that are expiring and saves an inventory-health check. Shift end reminds the team about expired batches or those unable to last until the next opening, saves a fresh check, and may send a manager or owner a separate inventory reminder when at least two signals agree. A successful reminder is not repeated for seven days. Managers set the schedule and enabled notification types.

## Known limits

- SORT does not replace Poster or correct its quantities and prices.
- SORT does not perform an inventory: the recommendation opens Poster's existing workflow, and SORT reads the completed physical count from Poster.
- SORT never writes off stock automatically; a person must act explicitly.
- Suggested remainders depend on supplies, prepared batches, and sales being recorded promptly in Poster.
- Live actions require a connection to SORT and Poster; a cached screen does not mean an action is synchronized.
