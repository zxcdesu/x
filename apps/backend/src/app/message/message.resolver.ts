import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MessageResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createMessage',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'createMessage',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneMessage',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'findOneMessage',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllMessages',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'findAllMessages',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateMessage',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'updateMessage',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeMessage',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'removeMessage',
    });
  }
}
