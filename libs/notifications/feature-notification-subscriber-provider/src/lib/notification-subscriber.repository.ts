import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import {
  NotificationSubscriberProvider,
  PrismaService,
} from '@zxcdesu/prisma-notifications';
import { AbstractNotificationSubscriber } from './abstract.notification-subscriber';
import { MODULE_OPTIONS_TOKEN } from './feature-notification-subscriber-provider.module-definition';
import { NotificationSubscriberProviderOptions } from './notification-subscriber-provider-options.interface';
import { TelegramNotificationSubscriber } from './telegram.notification-subscriber';

@Injectable()
export class NotificationSubscriberRepository
  implements
    Record<
      NotificationSubscriberProvider,
      typeof AbstractNotificationSubscriber<unknown>
    >
{
  [NotificationSubscriberProvider.Telegram] = TelegramNotificationSubscriber;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: NotificationSubscriberProviderOptions,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  get(
    provider: NotificationSubscriberProvider,
  ): AbstractNotificationSubscriber {
    return new this[provider](
      this.options,
      this.httpService,
      this.prismaService,
    );
  }
}
