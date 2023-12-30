import { Exclude, Type } from 'class-transformer';
import { Message, MessageStatus } from '../../prisma.service';
import { AuthorDto } from './author.dto';
import { ContentDto } from './content.dto';

export class MessageDto implements Message {
  id: number;

  // @Exclude()
  // не скрываем, нужен на backend для подписки на сообщения чата
  chatId: number;

  @Exclude()
  externalId: string;

  status: MessageStatus;

  failedReason: string | null;

  @Type(() => AuthorDto)
  author: AuthorDto;

  @Type(() => ContentDto)
  content: ContentDto[];

  createdAt: Date;

  updatedAt: Date;
}
