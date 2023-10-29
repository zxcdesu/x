import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateChatDto } from './create-chat.dto';

export class UpdateChatDto extends IntersectionType(
  PickType(CreateChatDto, ['projectId'] as const),
  PartialType(OmitType(CreateChatDto, ['projectId'] as const)),
) {
  @IsInt()
  id: number;
}
