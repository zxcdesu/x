export interface ErrorFactory<T = never> {
  errorFactory(error?: T): Error;
}
