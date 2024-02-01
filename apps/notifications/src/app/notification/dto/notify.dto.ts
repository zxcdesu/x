import { IsInt } from 'class-validator';

export class NotifyDto {
  @IsInt()
  userId: number;

  // TODO: тип события и прочие данные
}
