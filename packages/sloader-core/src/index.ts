import { createEngine } from "./core/engine";
import { PlatformBridge, SloaderOptions, SloaderResult } from "./protocol/types";


/**
 * Public entrypoint for sloader-core.
 * The platform (android/ios/web) must provide a PlatformBridge implementation.
 */
export async function loadAndExtract(
  url: string,
  options: SloaderOptions,
  bridge: PlatformBridge
): Promise<SloaderResult> {
  const engine = createEngine(bridge);
  return engine.loadAndExtract(url, options);
}

export * from "./protocol/types";
