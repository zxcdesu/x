import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmptyObject,
  IsOptional,
  IsSemVer,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Prisma } from '../../prisma.service';
import { Flow } from './compiler/flow.dto';

export class CreateBotDto
  implements Omit<Prisma.BotUncheckedCreateInput, 'flow'>
{
  @IsInt()
  projectId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsSemVer()
  version?: string;

  @Type(() => Flow)
  @IsNotEmptyObject()
  @ValidateNested()
  flow: Flow;
}
