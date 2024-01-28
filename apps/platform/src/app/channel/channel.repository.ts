import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
  implements Record<ChannelType, typeof AbstractChannel<unknown, unknown>>
{
  [ChannelType.Gupshup] = GupshupChannel;
  [ChannelType.Instagram] = InstagramChannel;
  [ChannelType.Telegram] = TelegramChannel;
  [ChannelType.Viber] = ViberChannel;
  [ChannelType.Vkontakte] = VkontakteChannel;
  [ChannelType.Web] = WebChannel;

  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  get(channel: Channel): AbstractChannel {
    return new this[channel.type](
      channel,
      this.amqpConnection,
      this.configService,
      this.httpService,
      this.prismaService,
    );
  }
}
