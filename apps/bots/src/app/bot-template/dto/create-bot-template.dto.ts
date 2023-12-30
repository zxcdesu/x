import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Flow } from '../../bot/dto/compiler/flow.dto';
import { Category, Prisma } from '../../prisma.service';

export class CreateBotTemplateDto
  implements Omit<Prisma.BotTemplateUncheckedCreateInput, 'flow'>
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
  @IsNotEmptyObject()
  @ValidateNested()
  flow: Flow;
}
