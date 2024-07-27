import { MediaType, Prisma } from '@zxcdesu/prisma-platform';
import { Trim } from '@zxcdesu/util-transformer';
import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateMediaDto
  implements Omit<Prisma.MediaUncheckedCreateInput, 'messageId'>
{
  @Trim()
  @IsOptional()
  @IsString()
  @Length(1, 20)
  name?: string;

  @IsUrl()
  url: string;

  @IsEnum(MediaType)
  type: MediaType;
}
