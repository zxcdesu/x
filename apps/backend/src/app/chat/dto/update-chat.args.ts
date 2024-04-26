import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import type { UpdateChatDto } from '@zxcdesu/data-access-chat';
import { CreateChatArgs } from './create-chat.args';

@ArgsType()
export class UpdateChatArgs
  extends PartialType(CreateChatArgs)
  implements UpdateChatDto
{
  @Field(() => Int)
  id: number;
}
