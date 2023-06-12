import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createUser',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'createUser',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneUser',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'findOneUser',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllUsers',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'findAllUsers',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateUser',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'updateUser',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeUser',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'removeUser',
    });
  }
}
