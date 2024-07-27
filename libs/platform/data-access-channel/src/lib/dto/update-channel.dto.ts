import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@zxcdesu/prisma-platform';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto
  extends PartialType(OmitType(CreateChannelDto, ['type'] as const))
  implements Prisma.ChannelUncheckedUpdateInput {}
