import { IsInt } from 'class-validator';

export class UpdateProjectUserDto {
  @IsInt()
  id: number;

  // TODO: access
}
