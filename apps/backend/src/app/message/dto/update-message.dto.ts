import {
  ArgsType,
  Field,
  Int,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CreateMessageDto } from './create-message.dto';

@ArgsType()
export class UpdateMessageDto extends IntersectionType(
  PickType(CreateMessageDto, ['chatId'] as const),
  PartialType(OmitType(CreateMessageDto, ['chatId'] as const)),
) {
  @Field(() => Int)
  id: number;
}
