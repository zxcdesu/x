import { IsInt, IsString } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateChatDto implements Prisma.ChatUncheckedCreateInput {
  @IsInt()
  projectId: number;

  @IsInt()
  channelId: number;

  @IsInt()
  contactId: number;

  @IsString()
  accountId: string;
}
