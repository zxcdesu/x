import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateChatDto } from './create-chat.dto';

@ArgsType()
export class UpdateChatDto extends PartialType(CreateChatDto) {
  @Field(() => Int)
  id: number;
}
