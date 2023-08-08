import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';
import { Prisma, Project } from '../../../prisma/generated';

export class CreateProjectDto implements Prisma.ProjectUncheckedCreateInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

export class FindOneProjectDto {
  @IsInt()
  id: number;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsInt()
  id: number;
}

export class RemoveProjectDto extends FindOneProjectDto {}

export class ProjectDto implements Project {
  id: number;

  name: string;

  description: string;

  imageUrl: string;

  createdAt: Date;

  updatedAt: Date;
}
