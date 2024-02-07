import { Exclude } from 'class-transformer';
import { Prisma } from '../../prisma.service';

export class PaymentDto {
  url: string;

  @Exclude()
  update: Prisma.PaymentUncheckedUpdateInput;
}
