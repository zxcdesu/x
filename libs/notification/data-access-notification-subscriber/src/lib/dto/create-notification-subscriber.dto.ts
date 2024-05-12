import {
  NotificationSubscriberProvider,
  Prisma,
} from '@zxcdesu/prisma-notification';
import { IsEnum } from 'class-validator';

export class CreateNotificationSubscriberDto
  implements Omit<Prisma.NotificationSubscriberUncheckedCreateInput, 'userId'>
{
  @IsEnum(NotificationSubscriberProvider)
  provider: NotificationSubscriberProvider;
}
