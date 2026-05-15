# @sloader/core

Deterministic ingestion core for sloader.

- Headless Chromium adapter (Playwright)
- Invariant core logic (scroll, lazy-load, extract)
- Minimal API:

```ts
const runtime = await createChromiumRuntime();
await runtime.load(url);
await runtime.scrollToBottom();
const result = await runtime.extract();
await runtime.close();
