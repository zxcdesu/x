import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  ChatDto,
  ChatService,
  CreateChatDto,
  UpdateChatDto,
} from '@zxcdesu/data-access-chat';
import { ChatFactoryService } from '@zxcdesu/feature-chat-factory';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatFactoryService: ChatFactoryService,
  ) {}

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'createChat',
    queue: 'createChat',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateChatDto,
  ) {
    return this.chatFactoryService.create(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'findOneChat',
    queue: 'findOneChat',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.chatService.findOne(projectId, id);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'findAllChats',
    queue: 'findAllChats',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  findAll(@ProjectId() projectId: number) {
    return this.chatService.findAll(projectId);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'updateChat',
    queue: 'updateChat',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateChatDto,
  ) {
    return this.chatFactoryService.update(projectId, id, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'removeChat',
    queue: 'removeChat',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.chatFactoryService.remove(projectId, id);
  }
}
