import {
  NotificationSubscriber,
  NotificationSubscriberProvider,
} from '@zxcdesu/prisma-notification';
import { Exclude } from 'class-transformer';

export class NotificationSubscriberDto implements NotificationSubscriber {
  id: number;

  userId: number;

  @Exclude()
  externalId: string | null;

  provider: NotificationSubscriberProvider;
}
