import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class BotTemplateResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createBotTemplate',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'bot',
      routingKey: 'createBotTemplate',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneBotTemplate',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'bot',
      routingKey: 'findOneBotTemplate',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllBotTemplates',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'bot',
      routingKey: 'findAllBotTemplates',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateBotTemplate',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'bot',
      routingKey: 'updateBotTemplate',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeBotTemplate',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'bot',
      routingKey: 'removeBotTemplate',
    });
  }
}
