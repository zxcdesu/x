import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto extends IntersectionType(
  PickType(CreateChannelDto, ['projectId'] as const),
  PartialType(OmitType(CreateChannelDto, ['projectId'] as const)),
) {
  @IsInt()
  id: number;
}
