export type CoreCapabilities = {
  load(url: string): Promise<void>;
  scrollStep(): Promise<number>;
  getDOM(): Promise<string>;
  waitForNetworkIdle(): Promise<void>;
  evaluate<T>(fn: () => T | Promise<T>): Promise<T>;
};
