import { CoreCapabilities } from '../types';
import { runScrollEngine } from './scrollEngine';
import { waitForLazyLoad } from './lazyLoadDetector';
import { extractTextFromDOM } from './domExtractor';
import { sanitizeHTML } from './sanitizer';
import { waitForStabilization } from './stabilization';
import { IngestionResult, IngestionDiagnostics } from '../types';

export async function runCoreIngestion(
  caps: CoreCapabilities,
  url: string,
  maxScrollSteps: number = 50
): Promise<IngestionResult> {
  const start = Date.now();

  await caps.load(url);
  await caps.waitForNetworkIdle();

  const { steps, totalHeight } = await runScrollEngine(caps, maxScrollSteps);
  await waitForLazyLoad(caps);
  await waitForStabilization(caps);

  const rawHtml = await caps.getDOM();
  const html = sanitizeHTML(rawHtml);
  const text = await extractTextFromDOM(caps);

  const diagnostics: IngestionDiagnostics = {
    scrollSteps: steps,
    totalScrollHeight: totalHeight,
    loadTimeMs: Date.now() - start,
  };

  return { text, html, diagnostics };
}
