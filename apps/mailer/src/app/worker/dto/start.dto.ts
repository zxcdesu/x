import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInt, MinDate } from 'class-validator';
import { MailingStatus } from '../../prisma.service';

export class StartDto {
  @IsInt()
  id: number;

  @IsInt()
  projectId: number;

  @IsInt()
  channelId: number;

  @IsInt({ each: true })
  tagIds: number[];

  @IsInt({ each: true })
  hsmIds: number[];

  @IsEnum(MailingStatus)
  status: MailingStatus;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(() => new Date())
  scheduledAt: Date;
}
