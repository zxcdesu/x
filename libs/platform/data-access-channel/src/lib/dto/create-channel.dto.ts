import { ChannelType, Prisma } from '@zxcdesu/prisma-platform';
import { Trim } from '@zxcdesu/util-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateChannelDto
  implements Omit<Prisma.ChannelUncheckedCreateInput, 'projectId'>
{
  @Trim()
  @IsString()
  @Length(1, 120)
  name: string;

  @IsEnum(ChannelType)
  type: ChannelType;

  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsDefined()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any;
}
