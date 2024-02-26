import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentUrlDto } from './dto/payment-url.dto';
import { PaymentRmq } from './payment.rmq';

@Resolver()
export class PaymentResolver {
  constructor(private readonly rmq: PaymentRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => PaymentUrlDto)
  createPayment(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreatePaymentDto,
  ): Promise<PaymentUrlDto> {
    return this.rmq.create(auth.project.id, payload);
  }
}
