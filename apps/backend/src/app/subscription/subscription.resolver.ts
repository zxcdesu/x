import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { SubscriptionDto } from './dto/subscription.dto';
import { SubscriptionRmq } from './subscription.rmq';

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly rmq: SubscriptionRmq) {}

  @UseGuards(BearerAuthGuard)
  @Query(() => SubscriptionDto)
  subscription(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<SubscriptionDto> {
    return this.rmq.findOne(auth.project.id);
  }
}
