import { Injectable } from '@nestjs/common';
import { ChannelService } from '@zxcdesu/data-access-channel';
import {
  ChatService,
  CreateChatDto,
  UpdateChatDto,
} from '@zxcdesu/data-access-chat';
import { ThirdPartyApiRepositoryService } from '@zxcdesu/feature-third-party-api-repository';

@Injectable()
export class ChatManager {
  constructor(
    private readonly channelService: ChannelService,
    private readonly chatService: ChatService,
    private readonly thirdPartyApiRepositoryService: ThirdPartyApiRepositoryService,
  ) {}

  async create(projectId: number, payload: CreateChatDto) {
    // Object.assign(
    //   payload,
    //   await this.thirdPartyApiRepositoryService
    //     .getOrThrow(
    //       await this.channelService.findOne(projectId, payload.channelId),
    //     )
    //     .factoryChat()
    //     .upsert(payload),
    // );
    return this.chatService.create(projectId, payload);
  }

  async update(projectId: number, id: number, payload: UpdateChatDto) {
    const chat = await this.chatService.update(projectId, id, payload);
    // if (payload.externalId || payload.channelId) {
    //   await this.thirdPartyApiRepositoryService
    //     .getOrThrow(
    //       await this.channelService.findOne(projectId, chat.channelId),
    //     )
    //     .factoryChat()
    //     .upsert(chat);
    // }
    return chat;
  }

  async remove(projectId: number, id: number) {
    const chat = await this.chatService.remove(projectId, id);
    // await this.thirdPartyApiRepositoryService
    //   .getOrThrow(await this.channelService.findOne(projectId, chat.channelId))
    //   .factoryChat()
    //   .remove(chat);
    return chat;
  }
}
