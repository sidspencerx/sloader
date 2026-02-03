import type {
  CoreToPlatformMessage,
  PlatformToCoreMessage,
  PlatformBridge,
  PlatformMessageType,
} from "../protocol/types";

type Resolver = (msg: PlatformToCoreMessage) => void;

export function createMessenger(bridge: PlatformBridge) {
  const waiters = new Map<PlatformMessageType, Resolver[]>();

  bridge.subscribe((msg) => {
    const list = waiters.get(msg.type);
    if (!list || list.length === 0) return;
    const resolver = list.shift();
    if (resolver) resolver(msg);
  });

  function send(message: CoreToPlatformMessage) {
    bridge.send(message);
  }

  function waitFor<T extends PlatformMessageType>(
    type: T
  ): Promise<Extract<PlatformToCoreMessage, { type: T }>> {
    return new Promise((resolve) => {
      const list = waiters.get(type) ?? [];
      list.push(resolve as Resolver);
      waiters.set(type, list);
    });
  }

  return {
    send,
    waitFor,
  };
}
