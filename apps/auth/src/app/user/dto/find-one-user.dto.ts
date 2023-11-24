import { IsInt } from 'class-validator';

export class FindOneUserDto {
  @IsInt()
  id: number;
}
