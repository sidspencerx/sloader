export enum SloaderMessageType {
  INIT = "INIT",
  READY = "READY",
  SCROLL_PROGRESS = "SCROLL_PROGRESS",
  EXTRACT = "EXTRACT",
  RESULT = "RESULT",
  ERROR = "ERROR",
  LOG = "LOG"
}

export interface SloaderInitMessage {
  type: SloaderMessageType.INIT;
  config: unknown;
}

export interface SloaderReadyMessage {
  type: SloaderMessageType.READY;
}

export interface SloaderScrollProgressMessage {
  type: SloaderMessageType.SCROLL_PROGRESS;
  progress: number; // 0–1
  pixelsScrolled: number;
}

export interface SloaderExtractMessage {
  type: SloaderMessageType.EXTRACT;
}

export interface SloaderResultMessage<T = unknown> {
  type: SloaderMessageType.RESULT;
  payload: T;
}

export interface SloaderErrorMessage {
  type: SloaderMessageType.ERROR;
  error: string;
  stack?: string;
}

export interface SloaderLogMessage {
  type: SloaderMessageType.LOG;
  level: "debug" | "info" | "warn" | "error";
  message: string;
}

export type SloaderOutboundMessage =
  | SloaderReadyMessage
  | SloaderScrollProgressMessage
  | SloaderResultMessage
  | SloaderErrorMessage
  | SloaderLogMessage;

export type SloaderInboundMessage =
  | SloaderInitMessage
  | SloaderExtractMessage;
