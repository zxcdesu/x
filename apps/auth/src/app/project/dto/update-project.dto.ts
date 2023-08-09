import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { FindOneProjectDto } from './find-one-project.dto';

export class UpdateProjectDto extends IntersectionType(
  FindOneProjectDto,
  PartialType(CreateProjectDto),
) {}
