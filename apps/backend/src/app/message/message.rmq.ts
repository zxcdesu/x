import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageRmq extends RmqService {
  private readonly exchange = 'platform';

  create(projectId: number, payload: CreateMessageDto) {
    return this.request<MessageDto>({
      exchange: this.exchange,
      routingKey: 'createMessage',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<MessageDto>({
      exchange: this.exchange,
      routingKey: 'findOneMessage',
      payload: {
        projectId,
        id,
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
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<MessageDto>({
      exchange: this.exchange,
      routingKey: 'removeMessage',
      payload: {
        projectId,
        id,
      },
    });
  }
}
