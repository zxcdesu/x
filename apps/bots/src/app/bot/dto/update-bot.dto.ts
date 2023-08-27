import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateBotDto } from './create-bot.dto';

export class UpdateBotDto extends IntersectionType(
  PickType(CreateBotDto, ['projectId']),
  PartialType(CreateBotDto),
) {
  @IsInt()
  id: number;
}
