import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { MailingRmq } from './mailing.rmq';

@Resolver()
export class MailingResolver {
  constructor(private readonly rmq: MailingRmq) {}

  @Mutation(() => Boolean)
  createMailing() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneMailing() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllMailings() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateMailing() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeMailing() {
    return this.rmq.remove(undefined);
  }
}
