/**
 * These helpers are for when sloader-core runs directly in a browser context.
 * For WebView-based platforms, extraction is usually done via injected JS.
 */

export function extractVisibleText(root: Document = document): string {
  const walker = root.createTreeWalker(
    root.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.parentElement) return NodeFilter.FILTER_REJECT;
        const style = window.getComputedStyle(node.parentElement);
        if (style.visibility === "hidden" || style.display === "none") {
          return NodeFilter.FILTER_REJECT;
        }
        const trimmed = node.textContent?.trim() ?? "";
        return trimmed ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    },
  );

  const parts: string[] = [];
  let current: Node | null = walker.nextNode();
  while (current) {
    parts.push((current.textContent ?? "").trim());
    current = walker.nextNode();
  }

  return parts.join("\n");
}
