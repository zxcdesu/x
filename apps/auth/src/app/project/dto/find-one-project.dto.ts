import { IsInt } from 'class-validator';

export class FindOneProjectDto {
  @IsInt()
  id: number;
}
