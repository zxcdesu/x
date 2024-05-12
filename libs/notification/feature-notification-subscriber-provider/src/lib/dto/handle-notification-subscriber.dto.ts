import { NotificationSubscriberProvider } from '@zxcdesu/prisma-notification';
import { IsDefined, IsEnum } from 'class-validator';

export class HandleNotificationSubscriberDto<T = unknown> {
  @IsEnum(NotificationSubscriberProvider)
  provider: NotificationSubscriberProvider;

  @IsDefined()
  value: T;
}
