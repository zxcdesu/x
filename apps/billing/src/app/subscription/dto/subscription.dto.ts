import { Exclude } from 'class-transformer';
import { Subscription } from '../../prisma.service';

export class SubscriptionDto implements Subscription {
  @Exclude()
  projectId: number;

  expiresAt: Date;
}
