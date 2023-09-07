import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ChannelType, Prisma } from '../../prisma.service';

export class CreateChannelDto
  implements Omit<Prisma.ChannelUncheckedCreateInput, 'status'>
{
  @IsInt()
  projectId: number;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ChannelType)
  type: ChannelType;

  @IsString()
  @IsNotEmpty()
  accountId: string;

  @Expose()
  token: any;
}
