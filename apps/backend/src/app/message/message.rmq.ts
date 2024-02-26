import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { AuthorDto } from './dto/author.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageRmq extends RmqService {
  private readonly exchange = 'platform';

  create(projectId: number, author: AuthorDto, payload: CreateMessageDto) {
    return this.request<MessageDto>({
      exchange: this.exchange,
      routingKey: 'createMessage',
      payload: {
        projectId,
        author,
        ...payload,
      },
    });
  }

  findAll(projectId: number, chatId: number) {
    return this.request<MessageDto[]>({
      exchange: this.exchange,
      routingKey: 'findAllMessages',
      payload: {
        projectId,
        chatId,
      },
    });
  }

  update(projectId: number, payload: UpdateMessageDto) {
    return this.request<MessageDto>({
      exchange: this.exchange,
      routingKey: 'updateMessage',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, chatId: number, id: number) {
    return this.request<MessageDto>({
      exchange: this.exchange,
      routingKey: 'removeMessage',
      payload: {
        projectId,
        chatId,
        id,
      },
    });
  }
}
