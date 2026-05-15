import { CoreCapabilities } from '../types';

export async function waitForLazyLoad(_caps: CoreCapabilities): Promise<void> {
  // Minimal placeholder: we already wait between scroll steps.
  // Later: DOM mutation observers, network heuristics, etc.
  return;
}
