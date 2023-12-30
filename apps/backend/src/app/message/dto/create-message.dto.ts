import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ContentDto } from './content.dto';

@ArgsType()
export class CreateMessageDto {
  @Field(() => Int)
  chatId: number;

  @Field(() => ContentDto)
  content: ContentDto;
}
