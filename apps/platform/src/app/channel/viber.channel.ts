import { NotImplementedException } from '@nestjs/common';
import { ChannelEvent } from '@platform/platform-type';
import { CreateChatDto } from '../chat/dto/create-chat.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { Chat, Prisma } from '../prisma.service';
import { AbstractChannel } from './abstract.channel';

export class ViberChannel extends AbstractChannel {
  async initialize(): Promise<Partial<Prisma.ChannelUncheckedUpdateInput>> {
    throw new NotImplementedException();
  }

  async handleEvent(event: ChannelEvent<unknown, unknown>): Promise<void> {
    throw new NotImplementedException();
  }

  async createChat(
    chat: CreateChatDto,
  ): Promise<Prisma.ChatUncheckedCreateInput> {
    throw new NotImplementedException();
  }

  async createMessage(
    chat: Chat,
    message: CreateMessageDto,
  ): Promise<Prisma.MessageUncheckedCreateInput> {
    throw new NotImplementedException();
  }

  async updateMessage(
    chat: Chat,
    externalId: string,
    message: unknown,
  ): Promise<unknown> {
    throw new NotImplementedException();
  }

  async removeMessage(chat: Chat, externalId: string): Promise<unknown> {
    throw new NotImplementedException();
  }
}
