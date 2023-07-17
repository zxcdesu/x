import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MailingResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createMailing',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'mailing',
      routingKey: 'createMailing',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneMailing',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'mailing',
      routingKey: 'findOneMailing',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllMailings',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'mailing',
      routingKey: 'findAllMailings',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateMailing',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'mailing',
      routingKey: 'updateMailing',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeMailing',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'mailing',
      routingKey: 'removeMailing',
    });
  }
}
