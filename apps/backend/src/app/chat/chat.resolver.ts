import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ChatResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createChat',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'createChat',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneChat',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'findOneChat',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllChats',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'findAllChats',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateChat',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'updateChat',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeChat',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'removeChat',
    });
  }
}
