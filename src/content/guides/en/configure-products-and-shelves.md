---
id: "public-configure-products-and-shelves-en"
title: "Configure product shelf life and shelves"
summary: "Create physical shelves, choose what SORT tracks, and give each product an expiry rule."
locale: "en"
translationKey: "configure-products-and-shelves"
translationRevision: 6
slug: "configure-products-and-shelves"
diataxis: "how-to"
audience: "manager"
updated: "2026-09-19"
sourceRevision: 6
order: 40
pageKind: "article"
---

## Create storage locations

1. Open **Settings → Shelves**.
2. Add locations the team can identify in the café: Display, Fridge, Freezer, and Bar.
3. Enable **Track batch order** only where multiple batches of one item should be sold by expiry.
4. Choose a default waste reason for the café or for an individual shelf.

A shelf describes a physical location. Shelf life belongs to the product, not the shelf.

## Add product rules

1. Open **What to track**.
2. Choose **Track** or **No** for each item.
3. For a tracked item, enter shelf life in hours and minutes and choose its initial shelf.
4. For an item you want visible without expiry alerts, choose **Non-perishable**.
5. Save, then maintain the rule under **Product registry**.

**What to track** decides one thing: what SORT tracks. It never creates a batch. How much is on the shelf right now is a separate question, answered in [Manager decisions](/en/guides/resolve-manager-decisions/).

SORT uses the stock unit from Poster and never converts it. If an item or packaging is modelled incorrectly, fix Poster first. When configuration is complete, create a test supply and [confirm the new batch](/en/guides/confirm-or-correct-batch/).

## Configure linked write-offs only where needed

Under **Product registry → More → Written off with the batch**, add ingredients that Poster does not consume through its own recipe. Mark each barista-choice row explicitly as **Required** or **Optional**. In a **Barista chooses from shelf** row, the manager enters neither a unit nor an amount: the shelf may contain `kg`, `l`, and `pcs` ingredients, and SORT derives the unit from the ingredient the barista selects. A required row still needs a non-empty shelf with at least one valid-unit ingredient; the barista always enters the actual amount.

For `Фільтр_прихід`, choose **at confirmation**: beans are a required shelf choice, the paper filter is fixed at `1 pcs`, and extra blend rows are optional. SORT then blocks an incomplete brew before any state change or Poster call.
