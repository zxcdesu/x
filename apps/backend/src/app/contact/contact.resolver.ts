import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ContactResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createContact',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'createContact',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneContact',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'findOneContact',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllContacts',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'findAllContacts',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateContact',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'updateContact',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeContact',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'platform',
      routingKey: 'removeContact',
    });
  }
}
