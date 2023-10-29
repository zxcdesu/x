export interface ErrorFactory {
  errorFactory<T = unknown>(error?: T): Error;
}
