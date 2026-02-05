import {
  PlatformBridge,
  CoreToPlatformMessage,
  PlatformToCoreMessage
} from "sloader-core";
import type { IframeWithWindow } from "./types";

/**
 * Creates a PlatformBridge that forwards messages between
 * sloader-core (running inside the iframe) and the host page.
 */
export function createIframeBridge(iframe: IframeWithWindow): PlatformBridge {
  const win = iframe.contentWindow;
  if (!win) throw new Error("Iframe has no contentWindow");

  const subscribers: Array<(msg: PlatformToCoreMessage) => void> = [];

  // Listen for messages from the iframe
  window.addEventListener("message", (event) => {
    if (event.source !== win) return;
    const msg = event.data;
    subscribers.forEach((handler) => handler(msg));
  });

  return {
    send(message: CoreToPlatformMessage): void {
      win.postMessage(message, "*");
    },

    subscribe(handler: (msg: PlatformToCoreMessage) => void): void {
      subscribers.push(handler);
    }
  };
}
