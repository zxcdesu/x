import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateMessageDto } from './create-message.dto';

@ArgsType()
export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @Field(() => Int)
  id: number;
}
