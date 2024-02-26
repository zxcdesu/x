import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

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
    return this.messageService.create(projectId, chatId, payload);
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
    return this.messageService.update(projectId, chatId, id, payload);
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
    return this.messageService.remove(projectId, chatId, id);
  }
}
