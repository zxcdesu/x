import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateAssignedToDto } from '../contact/dto/create-assigned-to.dto';
import { ChatDto } from './dto/chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatRmq extends RmqService {
  create(projectId: number, payload: CreateChatDto) {
    return this.request<ChatDto>({
      exchange: 'platform',
      routingKey: 'createChat',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<ChatDto>({
      exchange: 'platform',
      routingKey: 'findOneChat',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, assignedTo: CreateAssignedToDto) {
    return this.request<ChatDto[]>({
      exchange: 'platform',
      routingKey: 'findAllChats',
      payload: {
        projectId,
        assignedTo,
      },
    });
  }

  update(projectId: number, payload: UpdateChatDto) {
    return this.request<ChatDto>({
      exchange: 'platform',
      routingKey: 'updateChat',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<ChatDto>({
      exchange: 'platform',
      routingKey: 'removeChat',
      payload: {
        projectId,
        id,
      },
    });
  }
}
