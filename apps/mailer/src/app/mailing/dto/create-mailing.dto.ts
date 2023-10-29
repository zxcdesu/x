import {
  IsDate,
  IsEnum,
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
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

  @IsEnum(MailingStatus)
  status?: MailingStatus;

  @ValidateIf(
    (object: CreateMailingDto) => object.status === MailingStatus.Scheduled,
  )
  @IsDate()
  scheduledAt?: Date;
}
