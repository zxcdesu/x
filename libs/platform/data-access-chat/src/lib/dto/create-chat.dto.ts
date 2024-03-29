import { Prisma } from '@zxcdesu/prisma-platform';
import { IsInt, IsString } from 'class-validator';

export class CreateChatDto implements Prisma.ChatUncheckedCreateInput {
  @IsInt()
  channelId: number;

  @IsInt()
  contactId: number;

  @IsString()
  externalId: string;
}
