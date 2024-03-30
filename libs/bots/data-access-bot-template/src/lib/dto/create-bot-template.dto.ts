import { FlowDto } from '@zxcdesu/data-access-bot';
import { Category, Prisma } from '@zxcdesu/prisma-bots';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateBotTemplateDto
  implements Omit<Prisma.BotTemplateUncheckedCreateInput, 'flow'>
{
  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 20)
  name: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 1000)
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @Type(() => FlowDto)
  @IsNotEmptyObject()
  @ValidateNested()
  flow: FlowDto;
}
