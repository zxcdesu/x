import { ArgsType, Field, Int, OmitType, PartialType } from '@nestjs/graphql';
import type { UpdateChannelDto } from '@zxcdesu/data-access-channel';
import { CreateChannelArgs } from './create-channel.args';

@ArgsType()
export class UpdateChannelArgs
  extends PartialType(OmitType(CreateChannelArgs, ['type'] as const))
  implements UpdateChannelDto
{
  @Field(() => Int)
  id: number;
}
