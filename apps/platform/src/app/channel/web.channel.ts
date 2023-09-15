import { NotImplementedException } from '@nestjs/common';
import { ChannelEvent } from '@platform/platform-type';
import { CreateChatDto } from '../chat/dto/create-chat.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { Chat, Prisma } from '../prisma.service';
import { AbstractChannel } from './abstract.channel';

export class WebChannel extends AbstractChannel {
  async init(): Promise<Partial<Prisma.ChannelUncheckedUpdateInput>> {
    throw new NotImplementedException();
  }

  async handleEvent(event: ChannelEvent<unknown, unknown>): Promise<void> {
    throw new NotImplementedException();
  }

  async initChat(
    chat: CreateChatDto,
  ): Promise<Prisma.ChatUncheckedCreateInput> {
    return chat;
  }

  async sendMessage(
    chat: Chat,
    message: CreateMessageDto,
  ): Promise<Prisma.MessageUncheckedCreateInput> {
    throw new NotImplementedException();
  }
}
