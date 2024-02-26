import { NotImplementedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
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
import { HandleChannelDto } from './dto/handle-channel.dto';

export class TelegramChannel extends AbstractChannel {
  create(): Promise<Prisma.ChannelUncheckedUpdateInput> {
    return lastValueFrom(
      this.httpService
        .post(`https://api.telegram.org/bot${this.channel.token}/setWebhook`, {
          url: [
            this.configService.getOrThrow<string>('GATEWAY_URL'),
            this.channel.id.toString(),
          ].join('/'),
        })
        .pipe(
          map(() => {
            return {
              status: ChannelStatus.Active,
            };
          }),
          catchError((error) => {
            this.logger.error({
              channel: this.channel,
              error,
            });
            return Promise.resolve({
              status: ChannelStatus.Failed,
              failedReason:
                error?.response?.data?.description ?? error?.message,
            });
          }),
        ),
    );
  }

  async handleWebhook(
    payload: HandleChannelDto<{
      message?: {
        message_id: number;
        chat: {
          id: number;
          first_name: string;
          username: string;
        };
        date: number;
        text: string;
      };
      edited_message?: {
        message_id: number;
        chat: {
          id: number;
          first_name: string;
          username: string;
        };
        date: number;
        edit_date: number;
        text: string;
      };
    }>,
  ): Promise<void> {
    const message = payload.value.edited_message ?? payload.value.message;
    if (message) {
      await this.saveAndPublish(
        message.chat.id.toString(),
        message.chat.username,
        {
          externalId: message.message_id.toString(),
          content: {
            create: {
              text: message.text,
            },
          },
          status: MessageStatus.Delivered,
          author: {
            create: {
              type: AuthorType.Contact,
            },
          },
        },
      );
    }
  }

  createChat(chat: CreateChatDto): Promise<Prisma.ChatUncheckedCreateInput> {
    return Promise.resolve(chat);
  }

  createMessage(
    chat: Chat,
    message: CreateMessageDto,
  ): Promise<Prisma.MessageUncheckedCreateInput> {
    return lastValueFrom(
      this.httpService
        .post(`https://api.telegram.org/bot${this.channel.token}/sendMessage`, {
          chat_id: Number.parseInt(chat.externalId),
          text: message.content.text,
        })
        .pipe(
          map(({ data }) => {
            return {
              status: MessageStatus.Delivered,
              chatId: chat.id,
              externalId: data.result.message_id.toString(),
              content: {
                create: {
                  text: message.content.text,
                },
              },
            };
          }),
          catchError((error): Promise<Prisma.MessageUncheckedCreateInput> => {
            this.logger.error({
              channel: this.channel,
              chat,
              error,
            });
            return Promise.resolve({
              chatId: chat.id,
              externalId: randomUUID(),
              status: MessageStatus.Failed,
              failedReason:
                error?.response?.data?.description ?? error?.message,
              content: {
                create: {
                  text: message.content.text,
                },
              },
            });
          }),
        ),
    );
  }

  async updateMessage(
    chat: Chat,
    externalId: string,
    message: UpdateMessageDto,
  ): Promise<Prisma.MessageUncheckedCreateInput> {
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
