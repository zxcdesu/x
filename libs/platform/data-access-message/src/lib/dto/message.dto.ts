import { Message, MessageStatus } from '@zxcdesu/prisma-platform';
import { Exclude, Type } from 'class-transformer';
import { AuthorDto } from './author.dto';
import { ContentDto } from './content.dto';

export class MessageDto implements Message {
  id: number;

  @Exclude()
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
