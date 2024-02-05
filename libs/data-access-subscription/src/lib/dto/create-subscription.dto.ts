import { Prisma } from '@zxcdesu/prisma-billing';
import { IsDate } from 'class-validator';

export class CreateSubscriptionDto
  implements Omit<Prisma.SubscriptionUncheckedCreateInput, 'projectId'>
{
  @IsDate()
  expiresAt: Date;
}
