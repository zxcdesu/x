import { Exclude } from 'class-transformer';
import { Subscriber, SubscriberProvider } from '../../prisma.service';

export class SubscriberDto implements Subscriber {
  id: number;

  userId: number;

  @Exclude()
  externalId: string | null;

  provider: SubscriberProvider;
}
