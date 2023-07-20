import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { BotTemplateRmq } from './bot-template.rmq';

@Resolver()
export class BotTemplateResolver {
  constructor(private readonly rmq: BotTemplateRmq) {}

  @Mutation(() => Boolean)
  createBotTemplate() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneBotTemplate() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllBotTemplates() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateBotTemplate() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeBotTemplate() {
    return this.rmq.remove(undefined);
  }
}
