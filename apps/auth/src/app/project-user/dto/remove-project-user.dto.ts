import { IsInt } from 'class-validator';

export class RemoveProjectUserDto {
  @IsInt()
  id: number;
}
