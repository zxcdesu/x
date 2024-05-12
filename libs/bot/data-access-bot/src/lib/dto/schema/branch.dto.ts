import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

enum OperatorType {
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

class Condition {
  @IsString()
  variable1: string;

  @IsEnum(OperatorType)
  operator: OperatorType;

  @IsString()
  variable2: string;
}

enum ComparisonType {
  All = 'All',
  Any = 'Any',
}

export class Branch {
  @IsEnum(ComparisonType)
  type: ComparisonType;

  @Type(() => Condition)
  @ValidateNested({ each: true })
  conditions: Condition[];

  @IsOptional()
  @IsString()
  next?: string;
}
