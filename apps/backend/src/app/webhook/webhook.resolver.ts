import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { WebhookRmq } from './webhook.rmq';

@Resolver()
export class WebhookResolver {
  constructor(private readonly rmq: WebhookRmq) {}

  @Mutation(() => Boolean)
  createWebhook() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneWebhook() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllWebhooks() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateWebhook() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeWebhook() {
    return this.rmq.remove(undefined);
  }
}
