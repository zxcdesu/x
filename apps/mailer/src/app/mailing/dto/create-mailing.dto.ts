import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsHexColor,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinDate,
  ValidateIf,
} from 'class-validator';
import { MailingStatus, Prisma } from '../../prisma.service';

export class CreateMailingDto implements Prisma.MailingUncheckedCreateInput {
  @IsInt()
  projectId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsHexColor()
  color: string;

  @IsInt()
  channelId: number;

  @IsInt({ each: true })
  tagIds?: number[];

  @IsInt({ each: true })
  hsmIds?: number[];

  @IsOptional()
  @IsEnum(MailingStatus)
  @IsIn([MailingStatus.Disabled, MailingStatus.Scheduled])
  status?: MailingStatus;

  @ValidateIf(
    (object: CreateMailingDto) => object.status === MailingStatus.Scheduled,
  )
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(() => new Date())
  scheduledAt?: Date;
}
