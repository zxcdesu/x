import { Injectable } from '@nestjs/common';
import { ChannelService } from '@zxcdesu/data-access-channel';
import {
  ChatService,
  CreateChatDto,
  UpdateChatDto,
} from '@zxcdesu/data-access-chat';
import { ThirdPartyApiFactoryService } from '@zxcdesu/feature-third-party-api-factory';

@Injectable()
export class ChatFactoryService {
  constructor(
    private readonly channelService: ChannelService,
    private readonly chatService: ChatService,
    private readonly thirdPartyApiFactoryService: ThirdPartyApiFactoryService,
  ) {}

  async create(projectId: number, payload: CreateChatDto) {
    Object.assign(
      payload,
      await this.thirdPartyApiFactoryService
        .factory(
          await this.channelService.findOne(projectId, payload.channelId),
        )
        .factoryChat()
        .create(payload),
    );
    return this.chatService.create(projectId, payload);
  }

  async update(projectId: number, id: number, payload: UpdateChatDto) {
    const chat = await this.chatService.update(projectId, id, payload);
    if (
      typeof payload.externalId !== 'undefined' ||
      typeof payload.channelId !== 'undefined'
    ) {
      await this.thirdPartyApiFactoryService
        .factory(await this.channelService.findOne(projectId, chat.channelId))
        .factoryChat()
        .update(chat);
    }
    return chat;
  }

  async remove(projectId: number, id: number) {
    const chat = await this.chatService.remove(projectId, id);
    await this.thirdPartyApiFactoryService
      .factory(await this.channelService.findOne(projectId, chat.channelId))
      .factoryChat()
      .remove(chat);
    return chat;
  }
}
