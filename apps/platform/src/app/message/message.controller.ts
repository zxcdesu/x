import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @RabbitRPC({
    routingKey: 'createMessage',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: MessageDto,
  })
  create(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.create(projectId, createMessageDto);
  }

  @RabbitRPC({
    routingKey: 'findAllMessages',
    exchange: 'platform',
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
    routingKey: 'updateMessage',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: MessageDto,
  })
  update(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(projectId, updateMessageDto);
  }

  @RabbitRPC({
    routingKey: 'removeMessage',
    exchange: 'platform',
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
