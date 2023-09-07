import { Exclude, Type } from 'class-transformer';
import { Message, MessageStatus } from '../../prisma.service';
import { ContentDto } from './content.dto';
import { FromDto } from './from.dto';

export class MessageDto implements Message {
  id: number;

  @Exclude()
  chatId: number;

  @Exclude()
  externalId: string;

  status: MessageStatus;

  failedReason: string;

  @Type(() => FromDto)
  from: FromDto;

  @Type(() => ContentDto)
  content: ContentDto[];

  createdAt: Date;

  updatedAt: Date;
}
