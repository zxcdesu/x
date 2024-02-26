import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService, SubscriberProvider } from '../prisma.service';
import { AbstractSubscriber } from './abstract.subscriber';
import { TelegramSubscriber } from './telegram.payment';

@Injectable()
export class SubscriberRepository
  implements Record<SubscriberProvider, typeof AbstractSubscriber<unknown>>
{
  [SubscriberProvider.Telegram] = TelegramSubscriber;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  get(provider: SubscriberProvider): AbstractSubscriber {
    return new this[provider](
      this.configService,
      this.httpService,
      this.prismaService,
    );
  }
}
