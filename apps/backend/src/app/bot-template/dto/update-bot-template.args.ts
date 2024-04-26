import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import type { UpdateBotTemplateDto } from '@zxcdesu/data-access-bot-template';
import { CreateBotTemplateArgs } from './create-bot-template.args';

@ArgsType()
export class UpdateBotTemplateArgs
  extends PartialType(CreateBotTemplateArgs)
  implements UpdateBotTemplateDto
{
  @Field(() => Int)
  id: number;
}
