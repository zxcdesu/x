import { IsDate, IsInt } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateSubscriptionDto
  implements Prisma.SubscriptionUncheckedCreateInput
{
  @IsInt()
  projectId: number;

  @IsDate()
  expiresAt: Date;
}
