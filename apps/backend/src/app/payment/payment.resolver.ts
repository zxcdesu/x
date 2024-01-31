import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentDto } from './dto/payment.dto';
import { PaymentRmq } from './payment.rmq';

@Resolver()
export class PaymentResolver {
  constructor(private readonly rmq: PaymentRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => PaymentDto)
  createPayment(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreatePaymentDto,
  ): Promise<PaymentDto> {
    return this.rmq.create(auth.project.id, payload);
  }
}
