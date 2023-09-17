import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatRmq, MessageRmq } from '@platform/platform-type';
import { Channel, ChannelType, PrismaService } from '../prisma.service';
import { AbstractChannel } from './abstract.channel';
import { GupshupChannel } from './gupshup.channel';
import { InstagramChannel } from './instagram.channel';
import { TelegramChannel } from './telegram.channel';
import { ViberChannel } from './viber.channel';
import { VkontakteChannel } from './vkontakte.channel';
import { WebChannel } from './web.channel';

@Injectable()
export class ChannelRepository
  implements Record<ChannelType, typeof AbstractChannel<any, any>>
{
  [ChannelType.Gupshup] = GupshupChannel;
  [ChannelType.Instagram] = InstagramChannel;
  [ChannelType.Telegram] = TelegramChannel;
  [ChannelType.Viber] = ViberChannel;
  [ChannelType.Vkontakte] = VkontakteChannel;
  [ChannelType.Web] = WebChannel;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
    private readonly chatRmq: ChatRmq,
    private readonly messageRmq: MessageRmq,
  ) {}

  get(channel: Channel): AbstractChannel {
    return new this[channel.type](
      channel,
      this.configService,
      this.httpService,
      this.prismaService,
      this.chatRmq,
      this.messageRmq,
    );
  }
}
