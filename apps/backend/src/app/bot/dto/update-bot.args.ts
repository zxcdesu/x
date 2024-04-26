import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateBotArgs } from './create-bot.args';

@ArgsType()
export class UpdateBotArgs
  extends PartialType(CreateBotArgs)
  implements UpdateBotArgs
{
  @Field(() => Int)
  id: number;
}
