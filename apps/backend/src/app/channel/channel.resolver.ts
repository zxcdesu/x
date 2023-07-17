import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ChannelResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createChannel',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'createChannel',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneChannel',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'findOneChannel',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllChannels',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'findAllChannels',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateChannel',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'updateChannel',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeChannel',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'removeChannel',
    });
  }
}
