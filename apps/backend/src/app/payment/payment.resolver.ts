import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreatePaymentArgs } from './dto/create-payment.args';
import { PaymentUrlObject } from './dto/payment-url.object';
import { PaymentRmq } from './payment.rmq';

@Resolver()
export class PaymentResolver {
  constructor(private readonly rmq: PaymentRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => PaymentUrlObject)
  createPayment(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreatePaymentArgs,
  ): Promise<PaymentUrlObject> {
    return this.rmq.create(auth.project.id, payload);
  }
}
