import { Exclude } from 'class-transformer';
import { Subscriber } from '../../prisma.service';

export class SubscriberDto implements Subscriber {
  userId: number;

  @Exclude()
  externalId: string | null;

  // TODO: типы событий
}
