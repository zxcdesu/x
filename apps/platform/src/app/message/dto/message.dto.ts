import { Exclude, Type } from 'class-transformer';
import { Message, MessageStatus } from '../../prisma.service';
import { ContentDto } from './content.dto';
import { AuthorDto } from './author.dto';

export class MessageDto implements Message {
  id: number;

  @Exclude()
  chatId: number;

  @Exclude()
  externalId: string;

  status: MessageStatus;

  failedReason: string;

  @Type(() => AuthorDto)
  author: AuthorDto;

  @Type(() => ContentDto)
  content: ContentDto[];

  createdAt: Date;

  updatedAt: Date;
}
