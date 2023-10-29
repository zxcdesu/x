import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends IntersectionType(
  PickType(CreateTagDto, ['projectId'] as const),
  PartialType(OmitType(CreateTagDto, ['projectId'] as const)),
) {
  @IsInt()
  id: number;
}
