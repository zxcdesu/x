import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

export class CloseContactDto {
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  closedReason?: string;
}
