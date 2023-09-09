import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateMailingDto } from './create-mailing.dto';

export class UpdateMailingDto extends IntersectionType(
  PickType(CreateMailingDto, ['projectId']),
  PartialType(OmitType(CreateMailingDto, ['projectId'])),
) {
  @IsInt()
  id: number;
}
