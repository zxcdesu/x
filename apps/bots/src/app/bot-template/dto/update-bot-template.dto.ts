import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateBotTemplateDto } from './create-bot-template.dto';

export class UpdateBotTemplate extends PartialType(CreateBotTemplateDto) {
  @IsInt()
  id: number;
}
