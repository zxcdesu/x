import { NotImplementedException } from '@nestjs/common';
import { ChannelEvent, TelegramEvent } from '@platform/platform-type';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CreateChatDto } from '../chat/dto/create-chat.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import {
  AuthorType,
  ChannelStatus,
  Chat,
  MessageStatus,
  Prisma,
} from '../prisma.service';
import { AbstractChannel } from './abstract.channel';

export class TelegramChannel extends AbstractChannel {
  async init(): Promise<Prisma.ChannelUncheckedUpdateInput> {
    return lastValueFrom(
      this.httpService
        .post(`https://api.telegram.org/bot${this.channel.token}/setWebhook`, {
          url: this.configService
            .get<string>('GATEWAY_URL')
            .concat(`/${this.channel.id.toString()}`),
        })
        .pipe(
          map(() => {
            return {
              status: ChannelStatus.Connected,
            };
          }),
          catchError(async (error) => {
            console.error(this.channel, error);
            return {
              status: ChannelStatus.Failed,
              failedReason: error?.response?.data?.description,
            };
          }),
        ),
    );
  }

  async handleEvent(
    event: ChannelEvent<unknown, TelegramEvent>,
  ): Promise<void> {
    const message = event.body.edited_message ?? event.body.message;
    await this.upsertMessage(
      await this.upsertChat(message.chat.id.toString(), message.chat.username),
      message.message_id.toString(),
      {
        create: {
          text: message.text,
        },
      },
      MessageStatus.Delivered,
      {
        create: {
          type: AuthorType.Contact,
        },
      },
    );
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
