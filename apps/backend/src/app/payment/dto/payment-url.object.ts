import { Field, ObjectType } from '@nestjs/graphql';
import type { PaymentUrlDto } from '@zxcdesu/feature-payment-provider';

@ObjectType()
export class PaymentUrlObject implements PaymentUrlDto {
  @Field(() => String)
  url: string;
}
