import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateMessageDto,
  MessageDto,
  MessageService,
  UpdateMessageDto,
} from '@zxcdesu/data-access-message';
import { MessageManager } from '@zxcdesu/feature-message-manager';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageManager: MessageManager,
  ) {}

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'createMessage',
    queue: 'createMessage',
  })
  @SerializeOptions({
    type: MessageDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload('chatId', ParseIntPipe) chatId: number,
    @RabbitPayload() payload: CreateMessageDto,
  ) {
    return this.messageManager.create(projectId, chatId, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'findAllMessages',
    queue: 'findAllMessages',
  })
  @SerializeOptions({
    type: MessageDto,
  })
  findAll(
    @ProjectId() projectId: number,
    @RabbitPayload('chatId', ParseIntPipe) chatId: number,
  ) {
    return this.messageService.findAll(projectId, chatId);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'updateMessage',
    queue: 'updateMessage',
  })
  @SerializeOptions({
    type: MessageDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('chatId', ParseIntPipe) chatId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateMessageDto,
  ) {
    return this.messageManager.update(projectId, chatId, id, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'removeMessage',
    queue: 'removeMessage',
  })
  @SerializeOptions({
    type: MessageDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('chatId', ParseIntPipe) chatId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.messageManager.remove(projectId, chatId, id);
  }
}
