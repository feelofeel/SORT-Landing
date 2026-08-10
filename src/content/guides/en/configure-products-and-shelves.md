---
id: "public-configure-products-and-shelves-en"
title: "Configure product shelf life and shelves"
summary: "Create physical shelves, choose what SORT tracks, and give each product an expiry rule."
locale: "en"
translationKey: "configure-products-and-shelves"
translationRevision: 3
slug: "configure-products-and-shelves"
diataxis: "how-to"
audience: "manager"
updated: "2026-08-05"
sourceRevision: 3
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

1. Open **Import from Poster**.
2. Choose **Track** or **No** for each item.
3. For a tracked item, enter shelf life in hours and minutes and choose its initial shelf.
4. For an item you want visible without expiry alerts, choose **Non-perishable**.
5. Save, then maintain the rule under **Product registry**.

SORT uses the stock unit from Poster and never converts it. If an item or packaging is modelled incorrectly, fix Poster first. When configuration is complete, create a test supply and [confirm the new batch](/en/guides/confirm-or-correct-batch/).

## Configure linked write-offs only where needed

Under **Product registry → More → Written off with the batch**, add ingredients that Poster does not consume through its own recipe. Mark each barista-choice row explicitly as **Required** or **Optional**. A required row needs a canonical unit and a non-empty source shelf whose items use one compatible unit. Its suggested amount may be blank; in that case the barista must enter the actual amount.

For `Фільтр_прихід`, choose **at confirmation**: beans are a required shelf choice, the paper filter is fixed at `1 pcs`, and extra blend rows are optional. SORT then blocks an incomplete brew before any state change or Poster call.
