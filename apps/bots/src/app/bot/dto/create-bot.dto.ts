import { Transform, Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  ValidateNested,
} from 'class-validator';
import { Prisma } from '../../prisma.service';
import { Flow } from './compiler/flow.dto';

export class CreateBotDto
  implements Omit<Prisma.BotUncheckedCreateInput, 'projectId' | 'flow'>
{
  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 20)
  name: string;

  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @Type(() => Flow)
  @IsNotEmptyObject()
  @ValidateNested()
  flow: Flow;
}
