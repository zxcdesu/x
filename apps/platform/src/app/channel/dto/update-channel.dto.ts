import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto extends IntersectionType(
  PickType(CreateChannelDto, ['projectId']),
  PartialType(OmitType(CreateChannelDto, ['projectId'])),
) {
  @IsInt()
  id: number;
}
