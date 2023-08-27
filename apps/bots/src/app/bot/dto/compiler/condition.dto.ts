import { IsEnum, IsString } from 'class-validator';

export enum OperatorType {
  Eq = 'Eq',
  Neq = 'Neq',
  Lt = 'Lt',
  Lte = 'Lte',
  Gt = 'Gt',
  Gte = 'Gte',
  Includes = 'Includes',
  StartsWith = 'StartsWith',
  EndsWith = 'EndsWith',
}

export class Condition {
  @IsString()
  variable1: string;

  @IsEnum(OperatorType)
  operator: OperatorType;

  @IsString()
  variable2: string;
}
