import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends IntersectionType(
  PickType(CreateContactDto, ['projectId']),
  PartialType(OmitType(CreateContactDto, ['projectId'])),
) {
  @IsInt()
  id: number;
}
