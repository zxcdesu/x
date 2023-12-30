import { Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Flow } from '../../bot/dto/compiler/flow.dto';
import { Category, Prisma } from '../../prisma.service';

export class CreateBotTemplateDto
  implements Prisma.BotTemplateUncheckedCreateInput
{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @Type(() => Flow)
  @ValidateNested()
  flow: any;
}
