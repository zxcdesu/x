import { IsInt } from 'class-validator';

export class CheckAdminDto {
  @IsInt()
  userId: number;
}
