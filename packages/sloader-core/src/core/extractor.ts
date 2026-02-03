import type {
  ExtractionMode,
  CoreToPlatformMessage,
} from "../protocol/types";
import type { ReturnTypeOfCreateMessenger } from "./types";

export function createExtractor(messenger: ReturnTypeOfCreateMessenger) {
  async function extract(mode: ExtractionMode): Promise<string> {
    const msg: CoreToPlatformMessage = { type: "EXTRACT", mode };
    messenger.send(msg);
    const result = await messenger.waitFor("EXTRACT_RESULT");
    return result.payload;
  }

  function isLikelyComplete(payload: string): boolean {
    // Very naive heuristic for now:
    // - if payload length stops growing, or
    // - if it exceeds some threshold
    // This can be improved later.
    return payload.length > 20_000;
  }

  return {
    extract,
    isLikelyComplete,
  };
}
