export class SloaderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SloaderError";
  }
}

export class SloaderTimeoutError extends SloaderError {
  constructor(message = "Sloader timed out") {
    super(message);
    this.name = "SloaderTimeoutError";
  }
}
