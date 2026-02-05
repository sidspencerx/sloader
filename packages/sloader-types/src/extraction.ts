export interface SloaderExtractedNode {
  tag: string;
  text?: string;
  attrs?: Record<string, string>;
  children?: SloaderExtractedNode[];
}

export interface SloaderExtractionResult {
  url: string;
  timestamp: number;
  content: SloaderExtractedNode[];
  rawHTML?: string;
}
