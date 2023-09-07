import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { MessageStatus, Prisma } from '../../prisma.service';

export class CreateMessageDto implements Prisma.MessageUncheckedCreateInput {
  @IsInt()
  chatId: number;

  @IsString()
  externalId: string;

  @IsEnum(MessageStatus)
  status: MessageStatus;

  @IsOptional()
  @IsString()
  failedReason?: string;

  // @Type(() => Object)
  // @ValidateNested()
  from?: any;

  // @Type(() => Object)
  // @ValidateNested()
  content?: any;
}
