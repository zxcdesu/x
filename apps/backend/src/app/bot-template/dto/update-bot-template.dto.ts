import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateBotTemplateDto } from './create-bot-template.dto';

@ArgsType()
export class UpdateBotTemplateDto extends PartialType(CreateBotTemplateDto) {
  @Field(() => Int)
  id: number;
}
