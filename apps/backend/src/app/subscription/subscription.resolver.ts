import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { SubscriptionObject } from './dto/subscription.object';
import { SubscriptionRmq } from './subscription.rmq';

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly rmq: SubscriptionRmq) {}

  @UseGuards(BearerAuthGuard)
  @Query(() => SubscriptionObject)
  subscription(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<SubscriptionObject> {
    return this.rmq.findOne(auth.project.id);
  }
}
