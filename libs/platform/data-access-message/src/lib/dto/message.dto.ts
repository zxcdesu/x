import { Message, MessageStatus } from '@zxcdesu/prisma-platform';
import { Exclude } from 'class-transformer';
import { AuthorDto } from './author.dto';
import { ButtonDto } from './button.dto';
import { MediaDto } from './media.dto';

export class MessageDto implements Omit<Message, 'buttons'> {
  id: number;

  @Exclude()
  chatId: number;

  @Exclude()
  externalId: string;

  text: string | null;

  buttons: ButtonDto[];

  media: MediaDto[];

  status: MessageStatus;

  failedReason: string | null;

  author: AuthorDto;

  createdAt: Date;

  updatedAt: Date;
}
