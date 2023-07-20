import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { BotRmq } from './bot.rmq';

@Resolver()
export class BotResolver {
  constructor(private readonly rmq: BotRmq) {}

  @Mutation(() => Boolean)
  createBot() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneBot() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllBots() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateBot() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeBot() {
    return this.rmq.remove(undefined);
  }
}
