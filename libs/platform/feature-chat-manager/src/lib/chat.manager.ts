import { Injectable } from '@nestjs/common';
import { ChannelService } from '@zxcdesu/data-access-channel';
import {
  ChatService,
  CreateChatDto,
  UpdateChatDto,
} from '@zxcdesu/data-access-chat';
import { ThirdPartyApiRepository } from '@zxcdesu/feature-third-party-api-repository';

@Injectable()
export class ChatManager {
  constructor(
    private readonly channelService: ChannelService,
    private readonly chatService: ChatService,
    private readonly thirdPartyApiRepository: ThirdPartyApiRepository,
  ) {}

  async create(projectId: number, payload: CreateChatDto) {
    Object.assign(
      payload,
      await this.thirdPartyApiRepository
        .get(await this.channelService.findOne(projectId, payload.channelId))
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
      await this.thirdPartyApiRepository
        .get(await this.channelService.findOne(projectId, chat.channelId))
        .factoryChat()
        .update(chat);
    }
    return chat;
  }

  async remove(projectId: number, id: number) {
    const chat = await this.chatService.remove(projectId, id);
    await this.thirdPartyApiRepository
      .get(await this.channelService.findOne(projectId, chat.channelId))
      .factoryChat()
      .remove(chat);
    return chat;
  }
}
