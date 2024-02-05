import { Subscription } from '@zxcdesu/prisma-billing';
import { Exclude } from 'class-transformer';

export class SubscriptionDto implements Subscription {
  @Exclude()
  projectId: number;

  expiresAt: Date;
}
