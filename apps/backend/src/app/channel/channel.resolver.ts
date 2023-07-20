import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChannelRmq } from './channel.rmq';

@Resolver()
export class ChannelResolver {
  constructor(private readonly rmq: ChannelRmq) {}

  @Mutation(() => Boolean)
  createChannel() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneChannel() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllChannels() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateChannel() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeChannel() {
    return this.rmq.remove(undefined);
  }
}
