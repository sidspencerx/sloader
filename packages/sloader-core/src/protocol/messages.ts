import type {
  CoreToPlatformMessage,
  PlatformToCoreMessage,
} from "./types";

export type { CoreToPlatformMessage, PlatformToCoreMessage } from "./types";

export function isErrorMessage(
  msg: PlatformToCoreMessage
): msg is Extract<PlatformToCoreMessage, { type: "ERROR" }> {
  return msg.type === "ERROR";
}
