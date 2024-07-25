import { Transform } from 'class-transformer';

export const TransformArrayUnique = (fn = <T>(value: T[]) => value) =>
  Transform(({ value }) => value && Array.from(new Set(fn(value)).values()));
