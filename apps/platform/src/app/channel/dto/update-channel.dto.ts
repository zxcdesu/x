import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto extends PartialType(
  PickType(CreateChannelDto, ['name'] as const),
) {}
