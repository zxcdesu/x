import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ProjectResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createProject',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'createProject',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneProject',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'findOneProject',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllProjects',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'findAllProjects',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateProject',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'updateProject',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeProject',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'auth',
      routingKey: 'removeProject',
    });
  }
}
