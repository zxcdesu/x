import { PartialType } from '@nestjs/mapped-types';
import { CreateBotTemplateDto } from './create-bot-template.dto';

export class UpdateBotTemplateDto extends PartialType(CreateBotTemplateDto) {}
