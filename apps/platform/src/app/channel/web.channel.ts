import { NotImplementedException } from '@nestjs/common';
import { CreateChatDto } from '../chat/dto/create-chat.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { UpdateMessageDto } from '../message/dto/update-message.dto';
import { Chat, Prisma } from '../prisma.service';
import { AbstractChannel } from './abstract.channel';
import { HandleChannelDto } from './dto/handle-channel.dto';

export class WebChannel extends AbstractChannel {
  async create(): Promise<Partial<Prisma.ChannelUncheckedUpdateInput>> {
    throw new NotImplementedException();
  }

  async handleWebhook(payload: HandleChannelDto<unknown>): Promise<void> {
    throw new NotImplementedException({
      payload,
    });
  }

  async createChat(
    chat: CreateChatDto,
  ): Promise<Prisma.ChatUncheckedCreateInput> {
    throw new NotImplementedException({
      chat,
    });
  }

  async createMessage(
    chat: Chat,
    message: CreateMessageDto,
  ): Promise<Prisma.MessageUncheckedCreateInput> {
    throw new NotImplementedException({
      chat,
      message,
    });
  }

  async updateMessage(
    chat: Chat,
    externalId: string,
    message: UpdateMessageDto,
  ): Promise<Prisma.MessageUncheckedUpdateInput> {
    throw new NotImplementedException({
      chat,
      externalId,
      message,
    });
  }

  async removeMessage(chat: Chat, externalId: string): Promise<void> {
    throw new NotImplementedException({
      chat,
      externalId,
    });
  }
}
