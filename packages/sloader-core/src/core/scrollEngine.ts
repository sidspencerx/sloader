import { CoreCapabilities } from '../types';

export async function runScrollEngine(
  caps: CoreCapabilities,
  maxSteps: number
): Promise<{ steps: number; totalHeight: number }> {
  let previousHeight = 0;
  let steps = 0;

  while (steps < maxSteps) {
    const height = await caps.scrollStep();
    steps++;

    if (height === previousHeight) {
      break;
    }

    previousHeight = height;
    await delay(500);
  }

  return { steps, totalHeight: previousHeight };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
