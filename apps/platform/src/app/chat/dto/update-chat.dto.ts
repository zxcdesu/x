import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateChatDto } from './create-chat.dto';

export class UpdateChatDto extends IntersectionType(
  PickType(CreateChatDto, ['projectId']),
  PartialType(OmitType(CreateChatDto, ['projectId'])),
) {
  @IsInt()
  id: number;
}
