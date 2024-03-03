import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateNotificationSubscriberDto } from './create-notification-subscriber.dto';

export class UpdateNotificationSubscriberDto extends PartialType(
  OmitType(CreateNotificationSubscriberDto, ['provider'] as const),
) {}
