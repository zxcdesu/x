import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @RabbitRPC({
    routingKey: 'createChat',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  create(@RabbitPayload() payload: CreateChatDto) {
    return this.chatService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneChat',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  findOne(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.chatService.findOne(projectId, id);
  }

  @RabbitRPC({
    routingKey: 'findAllChats',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.chatService.findAll(projectId);
  }

  @RabbitRPC({
    routingKey: 'updateChat',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  update(@RabbitPayload() payload: UpdateChatDto) {
    return this.chatService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeChat',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.chatService.remove(projectId, id);
  }
}
