import { MailingStatus, Prisma } from '@zxcdesu/prisma-mailing';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsHexColor,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MinDate,
  ValidateIf,
} from 'class-validator';

export class CreateMailingDto
  implements Omit<Prisma.MailingUncheckedCreateInput, 'projectId'>
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

  @IsHexColor()
  color: string;

  @IsInt()
  channelId: number;

  @IsInt({ each: true })
  tagIds: number[];

  @IsInt({ each: true })
  hsmIds: number[];

  @IsOptional()
  @IsEnum(MailingStatus)
  @IsIn([MailingStatus.Disabled, MailingStatus.Scheduled])
  status?: MailingStatus;

  @ValidateIf(
    (object: CreateMailingDto) => object.status === MailingStatus.Scheduled,
  )
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @MinDate(() => new Date())
  scheduledAt?: Date;
}
