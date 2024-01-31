import { ArgsType, Field } from '@nestjs/graphql';
import { PaymentProvider } from './payment-provider.enum';

@ArgsType()
export class CreatePaymentDto {
  @Field(() => PaymentProvider)
  provider: PaymentProvider;

  @Field(() => Number)
  value: number;
}
