import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';

@Resolver()
export class UserResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean)
  createUser() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'createUser',
    });
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => Boolean)
  findOneUser(@BearerAuthDecorator() auth: BearerAuth) {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'findOneUser',
      payload: {
        id: auth.id,
      },
    });
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => Boolean)
  findAllUsers(@BearerAuthDecorator() auth: BearerAuth) {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'findAllUsers',
      payload: {
        id: auth.id,
      },
    });
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => Boolean)
  updateUser(@BearerAuthDecorator() auth: BearerAuth) {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'updateUser',
      payload: {
        id: auth.id,
      },
    });
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => Boolean)
  removeUser(@BearerAuthDecorator() auth: BearerAuth) {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'removeUser',
      payload: {
        id: auth.id,
      },
    });
  }
}
