export interface SloaderConfig {
  maxScrollAttempts?: number;
  scrollDelayMs?: number;
  extractionMode?: "dom" | "text" | "hybrid";
  includeRawHTML?: boolean;
  debug?: boolean;
}
