import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateHsmDto } from './create-hsm.dto';

export class UpdateHsmDto extends IntersectionType(
  PickType(CreateHsmDto, ['projectId']),
  PartialType(OmitType(CreateHsmDto, ['projectId'])),
) {
  @IsInt()
  id: number;
}
