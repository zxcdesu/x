import { ArgsType } from '@nestjs/graphql';
import { CreateNotificationSubscriberDto } from './create-notification-subscriber.dto';

@ArgsType()
export class UpdateNotificationSubscriberDto extends CreateNotificationSubscriberDto {}
