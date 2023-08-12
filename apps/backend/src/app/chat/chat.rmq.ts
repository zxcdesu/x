import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { ChatDto } from './dto/chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatRmq extends RmqService {
  private readonly exchange = 'platform';

  create(projectId: number, payload: CreateChatDto) {
    return this.request<ChatDto>({
      exchange: this.exchange,
      routingKey: 'createChat',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<ChatDto>({
      exchange: this.exchange,
      routingKey: 'findOneChat',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<ChatDto[]>({
      exchange: this.exchange,
      routingKey: 'findAllChats',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateChatDto) {
    return this.request<ChatDto>({
      exchange: this.exchange,
      routingKey: 'updateChat',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<ChatDto>({
      exchange: this.exchange,
      routingKey: 'removeChat',
      payload: {
        projectId,
        id,
      },
    });
  }
}
