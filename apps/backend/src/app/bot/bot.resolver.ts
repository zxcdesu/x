import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class BotResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createBot',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'bot',
      routingKey: 'createBot',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneBot',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'bot',
      routingKey: 'findOneBot',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllBots',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'bot',
      routingKey: 'findAllBots',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateBot',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'bot',
      routingKey: 'updateBot',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeBot',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'bot',
      routingKey: 'removeBot',
    });
  }
}
