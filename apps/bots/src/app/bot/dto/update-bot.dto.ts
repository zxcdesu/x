import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateBotDto } from './create-bot.dto';

export class UpdateBotDto extends IntersectionType(
  PickType(CreateBotDto, ['projectId'] as const),
  PartialType(OmitType(CreateBotDto, ['projectId'] as const)),
) {
  @IsInt()
  id: number;
}
