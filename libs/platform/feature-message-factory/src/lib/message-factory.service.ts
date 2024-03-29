import { Injectable } from '@nestjs/common';
import { ChannelService } from '@zxcdesu/data-access-channel';
import { ChatService } from '@zxcdesu/data-access-chat';
import {
  CreateMessageDto,
  MessageService,
  UpdateMessageDto,
} from '@zxcdesu/data-access-message';
import { ThirdPartyApiFactoryService } from '@zxcdesu/feature-third-party-api-factory';
import { PrismaService } from '@zxcdesu/prisma-platform';

@Injectable()
export class MessageFactoryService {
  constructor(
    private readonly channelService: ChannelService,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly thirdPartyApiFactoryService: ThirdPartyApiFactoryService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(projectId: number, chatId: number, payload: CreateMessageDto) {
    const chat = await this.chatService.findOne(projectId, chatId);
    Object.assign(
      payload,
      await this.thirdPartyApiFactoryService
        .factory(await this.channelService.findOne(projectId, chat.channelId))
        .factoryMessage()
        .create(payload),
    );
    return this.messageService.create(projectId, chatId, payload);
  }

  async update(
    projectId: number,
    chatId: number,
    id: number,
    payload: UpdateMessageDto,
  ) {
    const chat = await this.chatService.findOne(projectId, chatId);
    Object.assign(
      payload,
      await this.thirdPartyApiFactoryService
        .factory(await this.channelService.findOne(projectId, chat.channelId))
        .factoryMessage()
        .update(
          await this.messageService.update(projectId, chatId, id, payload),
        ),
    );
    return this.messageService.update(projectId, chatId, id, payload);
  }

  async remove(projectId: number, chatId: number, id: number) {
    const chat = await this.chatService.findOne(projectId, chatId);
    await this.thirdPartyApiFactoryService
      .factory(await this.channelService.findOne(projectId, chat.channelId))
      .factoryMessage()
      .remove(await this.messageService.findOne(projectId, chatId, id));
    return this.messageService.remove(projectId, chatId, id);
  }
}
