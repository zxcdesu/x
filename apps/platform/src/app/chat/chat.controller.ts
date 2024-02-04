import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { FindAllChatsDto } from './dto/find-all-chats.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'createChat',
    queue: 'platform.createChat',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  create(@RabbitPayload() payload: CreateChatDto) {
    return this.chatService.create(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'findOneChat',
    queue: 'platform.findOneChat',
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
    exchange: 'platform',
    routingKey: 'findAllChats',
    queue: 'platform.findAllChats',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  findAll(@RabbitPayload() payload: FindAllChatsDto) {
    return this.chatService.findAll(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'updateChat',
    queue: 'platform.updateChat',
  })
  @SerializeOptions({
    type: ChatDto,
  })
  update(@RabbitPayload() payload: UpdateChatDto) {
    return this.chatService.update(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'removeChat',
    queue: 'platform.removeChat',
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
