export interface ErrorFactory<T = unknown> {
  errorFactory(error?: T): Error;
}
