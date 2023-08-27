import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsSemVer,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Prisma } from '../../prisma.service';
import { Flow } from './compiler/flow.dto';

export class CreateBotDto implements Prisma.BotUncheckedCreateInput {
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
  @ValidateNested()
  flow: any;
}
