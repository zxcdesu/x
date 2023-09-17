import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends IntersectionType(
  PickType(CreateTagDto, ['projectId']),
  PartialType(OmitType(CreateTagDto, ['projectId'])),
) {
  @IsInt()
  id: number;
}
