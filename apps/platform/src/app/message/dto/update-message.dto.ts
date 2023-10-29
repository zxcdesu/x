import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends IntersectionType(
  PickType(CreateMessageDto, ['chatId'] as const),
  PartialType(OmitType(CreateMessageDto, ['chatId'] as const)),
) {
  @IsInt()
  id: number;
}
