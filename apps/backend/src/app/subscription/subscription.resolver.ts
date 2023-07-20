import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubscriptionRmq } from './subscription.rmq';

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly rmq: SubscriptionRmq) {}

  @Mutation(() => Boolean)
  createSubscription() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneSubscription() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllSubscriptions() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateSubscription() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeSubscription() {
    return this.rmq.remove(undefined);
  }
}
