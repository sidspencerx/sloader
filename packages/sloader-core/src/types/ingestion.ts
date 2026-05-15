import { IngestionDiagnostics } from './diagnostics';

export type IngestionResult = {
  text: string;
  html: string;
  diagnostics: IngestionDiagnostics;
};

export type IngestionRequest = {
  url: string;
  maxScrollSteps?: number;
};
