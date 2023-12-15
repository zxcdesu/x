import { NotImplementedException } from '@nestjs/common';
import { ChannelEvent, TelegramEvent } from '@platform/platform-type';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CreateChatDto } from '../chat/dto/create-chat.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { UpdateMessageDto } from '../message/dto/update-message.dto';
import {
  AuthorType,
  ChannelStatus,
  Chat,
  MessageStatus,
  Prisma,
} from '../prisma.service';
import { AbstractChannel } from './abstract.channel';

export class TelegramChannel extends AbstractChannel {
  create(): Promise<Prisma.ChannelUncheckedUpdateInput> {
    return lastValueFrom(
      this.httpService
        .post(`https://api.telegram.org/bot${this.channel.token}/setWebhook`, {
          url: [
            this.configService.get<string>('GATEWAY_URL'),
            this.channel.id.toString(),
          ].join('/'),
        })
        .pipe(
          map(() => {
            return {
              status: ChannelStatus.Connected,
            };
          }),
          catchError(async (error) => {
            this.logger.error({
              channel: this.channel,
              error,
            });
            return {
              status: ChannelStatus.Failed,
              failedReason:
                error?.response?.data?.description ?? error?.message,
            };
          }),
        ),
    );
  }

  async handleEvent(
    event: ChannelEvent<unknown, TelegramEvent>,
  ): Promise<void> {
    const message = event.body.edited_message ?? event.body.message;
    if (message) {
      await this.receiveMessage(
        await this.receiveChat(
          message.chat.id.toString(),
          message.chat.username,
        ),
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
  }

  async createChat(
    chat: CreateChatDto,
  ): Promise<Prisma.ChatUncheckedCreateInput> {
    return chat;
  }

  async createMessage(
    chat: Chat,
    message: CreateMessageDto,
  ): Promise<Prisma.MessageUncheckedCreateInput> {
    return lastValueFrom(
      this.httpService
        .post(
          `https://api.telegram.org/bot${this.channel.token}/messages.sendMessage`,
          {
            random_id: Math.random(),
            peer: chat.accountId,
            message: message.content.text,
          },
        )
        .pipe(
          map(({ data }) => {
            console.log(data);

            return {
              status: MessageStatus.Delivered,
              chatId: chat.id,
              externalId: 'unknown',
            };
          }),
          catchError(async (error) => {
            this.logger.error({
              channel: this.channel,
              error,
            });
            return {
              chatId: chat.id,
              externalId: 'unknown',
              status: MessageStatus.Failed,
              failedReason: error?.response?.data?.description,
            };
          }),
        ),
    );
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
