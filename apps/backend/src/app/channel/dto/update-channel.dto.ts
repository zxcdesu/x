import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateChannelDto } from './create-channel.dto';

@ArgsType()
export class UpdateChannelDto extends PartialType(CreateChannelDto) {
  @Field(() => Int)
  id: number;
}
