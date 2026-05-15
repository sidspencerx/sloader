import { Page } from 'playwright';
import { CoreCapabilities } from '../../types';

export function createChromiumCapabilities(page: Page): CoreCapabilities {
  return {
    async load(url: string) {
      await page.goto(url, { waitUntil: 'networkidle' });
    },
    async scrollStep() {
      return page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
        return document.documentElement.scrollHeight;
      });
    },
    async getDOM() {
      return page.content();
    },
    async waitForNetworkIdle() {
      // Already handled by goto; placeholder for future refinement.
      return;
    },
    async evaluate<T>(fn: () => T | Promise<T>): Promise<T> {
      return page.evaluate(fn);
    },
  };
}
