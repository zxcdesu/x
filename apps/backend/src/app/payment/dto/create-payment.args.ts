import { ArgsType, Field } from '@nestjs/graphql';
import type { CreatePaymentDto } from '@zxcdesu/data-access-payment';
import { PaymentProvider } from './payment-provider.enum';

@ArgsType()
export class CreatePaymentArgs implements CreatePaymentDto {
  @Field(() => PaymentProvider)
  provider: PaymentProvider;

  @Field(() => Number)
  amount: number;
}
