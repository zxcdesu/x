import { PartialType } from '@nestjs/mapped-types';
import { CreateBotTemplateDto } from './create-bot-template.dto';

export class UpdateBotTemplate extends PartialType(CreateBotTemplateDto) {}
