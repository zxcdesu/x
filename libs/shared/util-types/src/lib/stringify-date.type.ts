/**
 * Convert all date properties to string
 */
export type StringifyDate<T> = {
  [P in keyof T]: T[P] extends Date ? string : T[P];
};
