import { CoreCapabilities } from '../types';

export async function extractTextFromDOM(caps: CoreCapabilities): Promise<string> {
  return caps.evaluate(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );
    const parts: string[] = [];
    let node: Node | null;

    while ((node = walker.nextNode())) {
      const value = node.nodeValue?.trim();
      if (value) parts.push(value);
    }

    return parts.join('\n');
  });
}
