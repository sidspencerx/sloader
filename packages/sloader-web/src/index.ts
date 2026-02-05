import { loadAndExtract, PlatformBridge, SloaderOptions, SloaderResult } from "sloader-core";
import { createIframeBridge } from "./web/bridge";
import { createHiddenIframe, loadUrlIntoIframe, injectSloaderCore } from "./web/iframe-loader";

/**
 * High-level entrypoint for using sloader in a browser.
 */
export async function loadWithSloaderWeb(
  url: string,
  options: SloaderOptions
): Promise<SloaderResult> {
  const iframe = createHiddenIframe();
  const bridge: PlatformBridge = createIframeBridge(iframe);

  try {
    await loadUrlIntoIframe(iframe, url);
    await injectSloaderCore(iframe);

    return await loadAndExtract(url, options, bridge);
  } finally {
    iframe.remove();
  }
}

export type { SloaderOptions, SloaderResult } from "sloader-core";
