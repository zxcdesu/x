import { IsDate } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateSubscriptionDto
  implements Omit<Prisma.SubscriptionUncheckedCreateInput, 'projectId'>
{
  @IsDate()
  expiresAt: Date;
}
