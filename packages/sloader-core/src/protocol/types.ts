export type ExtractionMode = "text" | "html";

export interface SloaderOptions {
  maxScrolls?: number;
  scrollDelayMs?: number;
  extractionMode?: ExtractionMode;
  timeoutMs?: number;
}

export interface SloaderResult {
  text: string;
  html?: string;
  metadata: {
    url: string;
    scrolls: number;
    durationMs: number;
  };
}

export type SloaderErrorType =
  | "TIMEOUT"
  | "NAVIGATION_FAILED"
  | "EXTRACTION_FAILED"
  | "PLATFORM_ERROR";

export interface SloaderErrorPayload {
  type: SloaderErrorType;
  message: string;
  details?: unknown;
}

export type CoreToPlatformMessage =
  | { type: "NAVIGATE"; url: string }
  | { type: "SCROLL"; amount: number }
  | { type: "EXTRACT"; mode: ExtractionMode }
  | { type: "DONE" }
  | { type: "ERROR"; error: SloaderErrorPayload };

export type PlatformToCoreMessage =
  | { type: "NAVIGATED" }
  | { type: "SCROLLED" }
  | { type: "EXTRACT_RESULT"; payload: string }
  | { type: "ERROR"; error: SloaderErrorPayload };

export type PlatformMessageType = PlatformToCoreMessage["type"];

export interface PlatformBridge {
  send(message: CoreToPlatformMessage): void;
  subscribe(handler: (message: PlatformToCoreMessage) => void): void;
}
