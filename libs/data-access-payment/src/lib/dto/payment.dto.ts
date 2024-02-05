import { Prisma } from '@zxcdesu/prisma-billing';
import { Exclude } from 'class-transformer';

export class PaymentDto {
  url: string;

  @Exclude()
  update: Prisma.PaymentUncheckedUpdateInput;
}
