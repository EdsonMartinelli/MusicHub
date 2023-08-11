export class URLError extends Error {
  constructor() {
    super("URL isn't available anymore or is wrong.");
  }
}
