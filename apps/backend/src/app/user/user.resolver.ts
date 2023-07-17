import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';

@Resolver()
export class UserResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean)
  async createUser() {
    const { error, payload } = await this.amqpConnection.request<{
      error: any;
      payload: any;
    }>({
      exchange: 'auth',
      routingKey: 'createUser',
    });
    if (error) {
      throw new ApolloError(error.message, undefined, error);
    }
    return payload;
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
