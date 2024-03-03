import { Module } from '@nestjs/common';
import { PrismaNotificationsModule } from '@zxcdesu/prisma-notifications';
import { NotificationSubscriberService } from './notification-subscriber.service';

@Module({
  imports: [PrismaNotificationsModule],
  providers: [NotificationSubscriberService],
  exports: [NotificationSubscriberService],
})
export class DataAccessNotificationSubscriberModule {}
