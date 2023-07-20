import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageRmq } from './message.rmq';

@Resolver()
export class MessageResolver {
  constructor(private readonly rmq: MessageRmq) {}

  @Mutation(() => Boolean)
  createMessage() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneMessage() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllMessages() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateMessage() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeMessage() {
    return this.rmq.remove(undefined);
  }
}
