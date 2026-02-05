import type { IframeWithWindow } from "./types";

/**
 * Creates a hidden iframe for sloader to operate inside.
 */
export function createHiddenIframe(): IframeWithWindow {
  const iframe = document.createElement("iframe") as IframeWithWindow;
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);
  return iframe;
}

/**
 * Loads a URL into the iframe and waits for it to finish.
 */
export function loadUrlIntoIframe(
  iframe: IframeWithWindow,
  url: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const onLoad = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error(`Failed to load URL: ${url}`));
    };

    const cleanup = () => {
      iframe.removeEventListener("load", onLoad);
      iframe.removeEventListener("error", onError);
    };

    iframe.addEventListener("load", onLoad);
    iframe.addEventListener("error", onError);

    iframe.src = url;
  });
}

/**
 * Injects the sloader-core script into the iframe.
 * This assumes sloader-core is bundled as a single JS file.
 */
export async function injectSloaderCore(iframe: IframeWithWindow): Promise<void> {
  const win = iframe.contentWindow;
  if (!win) throw new Error("Iframe has no contentWindow");

  // You will replace this with your actual bundle path
  const scriptUrl = "/sloader-core/dist/index.global.js";

  return new Promise((resolve, reject) => {
    const script = win.document.createElement("script");
    script.src = scriptUrl;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to inject sloader-core"));
    win.document.head.appendChild(script);
  });
}
