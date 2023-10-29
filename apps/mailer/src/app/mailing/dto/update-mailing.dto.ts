import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateMailingDto } from './create-mailing.dto';

export class UpdateMailingDto extends IntersectionType(
  PickType(CreateMailingDto, ['projectId'] as const),
  PartialType(OmitType(CreateMailingDto, ['projectId'] as const)),
) {
  @IsInt()
  id: number;
}
