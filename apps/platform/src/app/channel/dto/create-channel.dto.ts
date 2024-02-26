import { Transform } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ChannelType, Prisma } from '../../prisma.service';

export class CreateChannelDto
  implements Omit<Prisma.ChannelUncheckedCreateInput, 'projectId'>
{
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
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
