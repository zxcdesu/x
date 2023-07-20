import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { WalletRmq } from './wallet.rmq';

@Resolver()
export class WalletResolver {
  constructor(private readonly rmq: WalletRmq) {}

  @Mutation(() => Boolean)
  createWallet() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneWallet() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllWallets() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateWallet() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeWallet() {
    return this.rmq.remove(undefined);
  }
}
