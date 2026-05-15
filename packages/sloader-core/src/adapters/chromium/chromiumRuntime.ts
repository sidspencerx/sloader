import { chromium, Browser, Page } from 'playwright';
import { IngestionResult } from '../../types';
import { createChromiumCapabilities } from './chromiumCapabilities';
import { runCoreIngestion } from '../../core';

export type ChromiumRuntime = {
  load(url: string): Promise<void>;
  scrollToBottom(maxSteps?: number): Promise<void>;
  extract(): Promise<IngestionResult>;
  close(): Promise<void>;
};

export async function createChromiumRuntime(): Promise<ChromiumRuntime> {
  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  const caps = createChromiumCapabilities(page);
  let lastUrl: string | null = null;
  let lastResult: IngestionResult | null = null;

  return {
    async load(url: string) {
      lastUrl = url;
      await caps.load(url);
    },

    async scrollToBottom(maxSteps: number = 50) {
      if (!lastUrl) {
        throw new Error('load(url) must be called before scrollToBottom()');
      }
      // Scroll is handled inside runCoreIngestion; this is a no-op placeholder
      // if you want a manual scroll-only phase later.
      await caps.scrollStep();
    },

    async extract(): Promise<IngestionResult> {
      if (!lastUrl) {
        throw new Error('load(url) must be called before extract()');
      }
      lastResult = await runCoreIngestion(caps, lastUrl);
      return lastResult;
    },

    async close() {
      await browser.close();
    },
  };
}
