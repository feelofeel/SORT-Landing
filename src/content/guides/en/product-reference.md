---
id: "public-product-reference-en"
title: "SORT roles, states, notifications, and limits"
summary: "A safe quick reference to who sees what in SORT, how to read states, and what the product does not do."
locale: "en"
translationKey: "product-reference"
translationRevision: 1
slug: "product-reference"
diataxis: "reference"
audience: "team"
updated: "2026-08-02"
sourceRevision: 1
order: 60
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

## Notifications

Shift start announces batches that are expiring. Shift end reminds the team about expired batches or those unable to last until the next opening. Managers set the schedule and enabled notification types.

## Known limits

- SORT does not replace Poster or correct its quantities and prices.
- SORT never writes off stock automatically; a person must act explicitly.
- Suggested remainders depend on supplies, prepared batches, and sales being recorded promptly in Poster.
- Live actions require a connection to SORT and Poster; a cached screen does not mean an action is synchronized.
