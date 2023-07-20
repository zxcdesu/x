export interface ErrorFactory {
  (error?: any): Error;
}

export interface Options {
  errorFactory: ErrorFactory;
}
