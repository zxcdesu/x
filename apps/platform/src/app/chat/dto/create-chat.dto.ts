import { IsInt, IsString } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateChatDto implements Prisma.ChatUncheckedCreateInput {
  @IsInt()
  channelId: number;

  @IsInt()
  contactId: number;

  @IsString()
  externalId: string;
}
