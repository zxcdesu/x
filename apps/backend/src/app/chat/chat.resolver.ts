import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatRmq } from './chat.rmq';

@Resolver()
export class ChatResolver {
  constructor(private readonly rmq: ChatRmq) {}

  @Mutation(() => Boolean)
  createChat() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneChat() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllChats() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateChat() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeChat() {
    return this.rmq.remove(undefined);
  }
}
