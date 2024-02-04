import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'createMessage',
    queue: 'createMessage',
  })
  @SerializeOptions({
    type: MessageDto,
  })
  create(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload() payload: CreateMessageDto,
  ) {
    return this.messageService.create(projectId, payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'findAllMessages',
    queue: 'findAllMessages',
  })
  @SerializeOptions({
    type: MessageDto,
  })
  findAll(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('chatId', ParseIntPipe) chatId: number,
  ) {
    return this.messageService.findAll(projectId, chatId);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'updateMessage',
    queue: 'updateMessage',
  })
  @SerializeOptions({
    type: MessageDto,
  })
  update(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload() payload: UpdateMessageDto,
  ) {
    return this.messageService.update(projectId, payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'removeMessage',
    queue: 'removeMessage',
  })
  @SerializeOptions({
    type: MessageDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('chatId', ParseIntPipe) chatId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.messageService.remove(projectId, chatId, id);
  }
}
