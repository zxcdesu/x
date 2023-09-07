import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateHsmDto implements Prisma.HsmUncheckedCreateInput {
  @IsInt()
  projectId: number;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsObject({ each: true })
  attachments?: any[];

  @IsOptional()
  @IsObject({ each: true })
  buttons?: any[];
}
