import { Module } from '@nestjs/common';
import { FeatureNotificationSubscriberProviderModule } from '@zxcdesu/feature-notification-subscriber-provider';
import { NotificationSenderService } from './notification-sender.service';

@Module({
  controllers: [FeatureNotificationSubscriberProviderModule],
  providers: [NotificationSenderService],
  exports: [NotificationSenderService],
})
export class FeatureNotificationSenderModule {}
