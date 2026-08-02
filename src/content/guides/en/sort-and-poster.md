---
id: "public-sort-and-poster-en"
title: "How SORT and Poster work together"
summary: "Understand why Poster owns stock records while SORT adds batches, expiry, and shift decisions."
locale: "en"
translationKey: "sort-and-poster"
translationRevision: 1
slug: "sort-and-poster"
diataxis: "explanation"
audience: "team"
updated: "2026-08-02"
sourceRevision: 1
order: 80
pageKind: "article"
---


Poster and SORT answer different questions.

**Poster is the system of record:** what is in the catalog, how much is in storage, and what arrived, sold, or was written off. **SORT is the system of expiry decisions:** which batches make up that stock, where each batch is, when it expires, and who should act today.

When a supply or prepared batch appears in Poster, SORT applies an expiry rule and shows a card to the team. When Poster reports a sale, SORT reduces the earliest eligible batch first. When a barista explicitly writes off the remainder, SORT creates the write-off in Poster and closes its matching batch.

This division protects the records: SORT does not create a second catalog, set prices, or automatically “correct” Poster stock. Poster, in turn, does not know the expiry of each individual batch and cannot produce the barista's morning action list by itself.

The practical result is simple: setup and daily operations in Poster must be timely, while dates and physical remainders in SORT must be confirmed honestly. Then both systems describe the same goods from complementary angles.
