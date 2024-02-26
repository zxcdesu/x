import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

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
    return this.chatService.create(projectId, payload);
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
    return this.chatService.update(projectId, id, payload);
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
    return this.chatService.remove(projectId, id);
  }
}
