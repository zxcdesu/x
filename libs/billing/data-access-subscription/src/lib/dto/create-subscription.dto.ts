import { Prisma } from '@zxcdesu/prisma-billing';
import { Transform } from 'class-transformer';
import { IsDate, MinDate } from 'class-validator';

export class CreateSubscriptionDto
  implements Omit<Prisma.SubscriptionUncheckedCreateInput, 'projectId'>
{
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @MinDate(() => new Date())
  expiresAt: Date;
}
