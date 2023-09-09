import { ArgsType, Field, Int, PickType } from '@nestjs/graphql';
import { CreateChannelDto } from './create-channel.dto';

@ArgsType()
export class UpdateChannelDto extends PickType(CreateChannelDto, ['name']) {
  @Field(() => Int)
  id: number;
}
