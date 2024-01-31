import { IsInt } from 'class-validator';

export class NotifyDto {
  // @IsOptional()
  // @IsInt()
  // projectId?: number

  // @IsOptional()
  @IsInt()
  userId: number; // optional?

  // TODO: тип события и прочие данные
}
