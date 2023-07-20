import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsInt()
  id: number;
}
