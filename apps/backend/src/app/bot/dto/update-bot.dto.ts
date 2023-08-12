import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateBotDto } from './create-bot.dto';

@ArgsType()
export class UpdateBotDto extends PartialType(CreateBotDto) {
  @Field(() => Int)
  id: number;
}
