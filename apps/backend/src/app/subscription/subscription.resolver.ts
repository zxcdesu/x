import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createSubscription',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'billing',
      routingKey: 'createSubscription',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneSubscription',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'billing',
      routingKey: 'findOneSubscription',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllSubscriptions',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'billing',
      routingKey: 'findAllSubscriptions',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateSubscription',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'billing',
      routingKey: 'updateSubscription',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeSubscription',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'billing',
      routingKey: 'removeSubscription',
    });
  }
}
