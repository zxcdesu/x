import { NotImplementedException } from '@nestjs/common';
import { ChannelEvent } from '@platform/platform-type';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CreateChatDto } from '../chat/dto/create-chat.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { ChannelStatus, Chat, Prisma } from '../prisma.service';
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

  async handleEvent(event: ChannelEvent<unknown, unknown>): Promise<void> {
    console.log(this.channel, event);
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
