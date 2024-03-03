import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { NotificationSubscriberDto } from '@zxcdesu/data-access-notification-subscriber';
import { PrismaService } from '@zxcdesu/prisma-notifications';
import { HandleNotificationSubscriberDto, NotifyDto } from './dto';
import { NotificationSubscriberProviderOptions } from './notification-subscriber-provider-options.interface';

export abstract class AbstractNotificationSubscriber<T = unknown> {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    protected readonly options: NotificationSubscriberProviderOptions,
    protected readonly httpService: HttpService,
    protected readonly prismaService: PrismaService,
  ) {}

  abstract notify(
    subscriber: NotificationSubscriberDto,
    payload: NotifyDto,
  ): Promise<void>;

  abstract handleWebhook(
    payload: HandleNotificationSubscriberDto<T>,
  ): Promise<void>;
}
