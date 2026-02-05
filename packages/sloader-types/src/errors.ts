export enum SloaderErrorCode {
  TIMEOUT = "TIMEOUT",
  NETWORK = "NETWORK",
  SCRIPT_INJECTION = "SCRIPT_INJECTION",
  DOM_EXTRACTION = "DOM_EXTRACTION",
  UNKNOWN = "UNKNOWN"
}

export class SloaderError extends Error {
  constructor(
    public code: SloaderErrorCode,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "SloaderError";
  }
}
