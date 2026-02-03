import type { CoreToPlatformMessage } from "../protocol/types";
import type { ReturnTypeOfCreateMessenger } from "./types";
import { wait } from "../utils/wait";

export function createScroller(messenger: ReturnTypeOfCreateMessenger) {
  async function scroll(amount: number) {
    const msg: CoreToPlatformMessage = { type: "SCROLL", amount };
    messenger.send(msg);
    await messenger.waitFor("SCROLLED");
  }

  async function delay(ms: number) {
    await wait(ms);
  }

  return {
    scroll,
    delay,
  };
}
