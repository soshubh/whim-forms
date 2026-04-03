---
title: "Generated forms now validate and export more reliably"
date: "2026-04-02"
summary: "Validation, helper text, and export behavior were tightened so the generated Framer form stays closer to the builder preview."
---

Validation behavior, helper text handling, webhook transport, and Google Apps Script field mapping were tightened so the exported Framer code behaves closer to the builder preview.

## What changed

- Validation logic now reflects the builder state more consistently.
- Helper messages and error behavior are more predictable in the exported result.
- Delivery handling is better aligned with the configured builder setup.

## Why it matters

The biggest product gap is when the preview feels right but the exported form behaves differently. This update closes more of that distance.
