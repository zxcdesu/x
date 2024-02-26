import { ArgsType, Field, Int, PartialType, PickType } from '@nestjs/graphql';
import { CreateChannelDto } from './create-channel.dto';

@ArgsType()
export class UpdateChannelDto extends PartialType(
  PickType(CreateChannelDto, ['name'] as const),
) {
  @Field(() => Int)
  id: number;
}
