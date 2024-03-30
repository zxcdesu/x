import { Injectable } from '@nestjs/common';
import { ChannelService } from '@zxcdesu/data-access-channel';
import { ChatService } from '@zxcdesu/data-access-chat';
import {
  CreateMessageDto,
  MessageService,
  UpdateMessageDto,
} from '@zxcdesu/data-access-message';
import { ThirdPartyApiRepository } from '@zxcdesu/feature-third-party-api-repository';

@Injectable()
export class MessageManager {
  constructor(
    private readonly channelService: ChannelService,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly thirdPartyApiRepository: ThirdPartyApiRepository,
  ) {}

  async create(projectId: number, chatId: number, payload: CreateMessageDto) {
    const chat = await this.chatService.findOne(projectId, chatId);
    Object.assign(
      payload,
      await this.thirdPartyApiRepository
        .getOrThrow(
          await this.channelService.findOne(projectId, chat.channelId),
        )
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
    const [message, chat] = await Promise.all([
      this.messageService.findOne(projectId, chatId, id),
      this.chatService.findOne(projectId, chatId),
    ]);
    if (payload.content) {
      Object.assign(
        payload,
        await this.thirdPartyApiRepository
          .getOrThrow(
            await this.channelService.findOne(projectId, chat.channelId),
          )
          .factoryMessage()
          .update({
            externalId: message.externalId,
            content: payload.content,
          }),
      );
    }
    return this.messageService.update(projectId, chatId, id, payload);
  }

  async remove(projectId: number, chatId: number, id: number) {
    const [message, chat] = await Promise.all([
      this.messageService.findOne(projectId, chatId, id),
      this.chatService.findOne(projectId, chatId),
    ]);
    await this.thirdPartyApiRepository
      .getOrThrow(await this.channelService.findOne(projectId, chat.channelId))
      .factoryMessage()
      .remove(message);
    return this.messageService.remove(projectId, chatId, id);
  }
}
