import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class WalletResolver {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Mutation(() => Boolean, {
    name: 'createWallet',
  })
  create() {
    return this.amqpConnection.request({
      exchange: 'billing',
      routingKey: 'createWallet',
    });
  }

  @Query(() => Boolean, {
    name: 'findOneWallet',
  })
  findOne() {
    return this.amqpConnection.request({
      exchange: 'billing',
      routingKey: 'findOneWallet',
    });
  }

  @Query(() => Boolean, {
    name: 'findAllWallets',
  })
  findAll() {
    return this.amqpConnection.request({
      exchange: 'billing',
      routingKey: 'findAllWallets',
    });
  }

  @Mutation(() => Boolean, {
    name: 'updateWallet',
  })
  update() {
    return this.amqpConnection.request({
      exchange: 'billing',
      routingKey: 'updateWallet',
    });
  }

  @Mutation(() => Boolean, {
    name: 'removeWallet',
  })
  remove() {
    return this.amqpConnection.request({
      exchange: 'billing',
      routingKey: 'removeWallet',
    });
  }
}
