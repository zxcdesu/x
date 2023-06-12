import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class IntegrationResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createIntegration',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'integration',
      routingKey: 'createIntegration',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneIntegration',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'integration',
      routingKey: 'findOneIntegration',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllIntegrations',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'integration',
      routingKey: 'findAllIntegrations',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateIntegration',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'integration',
      routingKey: 'updateIntegration',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeIntegration',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'integration',
      routingKey: 'removeIntegration',
    });
  }
}
