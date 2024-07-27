import { Prisma } from '@zxcdesu/prisma-platform';
import { Trim } from '@zxcdesu/util-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateHsmDto
  implements Omit<Prisma.HsmUncheckedCreateInput, 'projectId'>
{
  @Trim()
  @IsString()
  @Length(1, 120)
  name: string;

  @Trim()
  @IsString()
  @Length(1, 120)
  text: string;

  // @Type(() => MediaDto)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: any;

  // @Type(() => ButtonDto)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttons?: any;
}
