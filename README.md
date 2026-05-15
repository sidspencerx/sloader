# sloader

**Deterministic ingestion for agentic systems.**

sloader is a minimal, cross‑platform ingestion primitive designed to give agents a stable, predictable way to load, scroll, and extract content from the web — without brittle automation, heuristics, or scraping hacks.

At its core, sloader provides:

- a deterministic ingestion engine  
- a capability surface that adapters implement  
- a headless Chromium adapter (Playwright)  
- a clean, minimal API  
- a monorepo structure for future adapters (browser extension, mobile, webview, etc.)

sloader is not a scraper, crawler, or automation tool.  
It is a **primitive** — a foundational capability that other systems build on.


