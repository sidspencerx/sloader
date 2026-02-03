import type {
  SloaderOptions,
  SloaderResult,
  CoreToPlatformMessage,
  PlatformToCoreMessage,
  PlatformBridge,
} from "../protocol/types";
import { createMessenger } from "./messenger";
import { createScroller } from "./scroller";
import { createExtractor } from "./extractor";
import { SloaderTimeoutError } from "./errors";

const DEFAULT_OPTIONS: Required<SloaderOptions> = {
  maxScrolls: 20,
  scrollDelayMs: 500,
  extractionMode: "text",
  timeoutMs: 30_000,
};

export function createEngine(bridge: PlatformBridge) {
  const messenger = createMessenger(bridge);
  const scroller = createScroller(messenger);
  const extractor = createExtractor(messenger);

  async function loadAndExtract(
    url: string,
    options: SloaderOptions = {}
  ): Promise<SloaderResult> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const start = Date.now();

    const timeoutPromise = new Promise<never>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new SloaderTimeoutError("Extraction timed out"));
      }, opts.timeoutMs);
    });

    const workPromise = (async () => {
      // Navigate
      messenger.send({ type: "NAVIGATE", url });
      await messenger.waitFor("NAVIGATED");

      let scrolls = 0;
      let lastPayload = "";

      while (scrolls < opts.maxScrolls) {
        await scroller.scroll(0.8);
        await scroller.delay(opts.scrollDelayMs);

        const payload = await extractor.extract(opts.extractionMode);
        lastPayload = payload;

        if (extractor.isLikelyComplete(payload)) {
          break;
        }

        scrolls++;
      }

      const durationMs = Date.now() - start;

      return {
        text: opts.extractionMode === "text" ? lastPayload : "",
        html: opts.extractionMode === "html" ? lastPayload : undefined,
        metadata: {
          url,
          scrolls,
          durationMs,
        },
      };
    })();

    return Promise.race([workPromise, timeoutPromise]);
  }

  return {
    loadAndExtract,
  };
}
