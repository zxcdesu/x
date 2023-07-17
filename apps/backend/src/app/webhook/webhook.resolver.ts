import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class WebhookResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createWebhook',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'integrations',
      routingKey: 'createWebhook',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneWebhook',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'integrations',
      routingKey: 'findOneWebhook',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllWebhooks',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'integrations',
      routingKey: 'findAllWebhooks',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateWebhook',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'integrations',
      routingKey: 'updateWebhook',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeWebhook',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'integrations',
      routingKey: 'removeWebhook',
    });
  }
}
