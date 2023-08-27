import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Condition } from './condition.dto';

export enum ComparisonType {
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
