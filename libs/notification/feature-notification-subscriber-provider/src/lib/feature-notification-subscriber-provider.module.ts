import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaNotificationsModule } from '@zxcdesu/prisma-notification';
import { ConfigurableModuleClass } from './feature-notification-subscriber-provider.module-definition';
import { NotificationSubscriberRepository } from './notification-subscriber.repository';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; NotificationSubscriberService/1.0; +https://en.wikipedia.org/wiki/Webhook)',
      },
    }),
    PrismaNotificationsModule,
  ],
  providers: [NotificationSubscriberRepository],
  exports: [NotificationSubscriberRepository],
})
export class FeatureNotificationSubscriberProviderModule extends ConfigurableModuleClass {}
