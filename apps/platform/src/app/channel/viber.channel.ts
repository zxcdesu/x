import { NotImplementedException } from '@nestjs/common';
import { ChannelEvent } from '@zxcdesu/platform-type';
import { CreateChatDto } from '../chat/dto/create-chat.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { UpdateMessageDto } from '../message/dto/update-message.dto';
import { Chat, Prisma } from '../prisma.service';
import { AbstractChannel } from './abstract.channel';

export class ViberChannel extends AbstractChannel {
  async create(): Promise<Partial<Prisma.ChannelUncheckedUpdateInput>> {
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
    message: UpdateMessageDto,
  ): Promise<Prisma.MessageUncheckedCreateInput> {
    throw new NotImplementedException();
  }

  async removeMessage(chat: Chat, externalId: string): Promise<void> {
    throw new NotImplementedException();
  }
}
