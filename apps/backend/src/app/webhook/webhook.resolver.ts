import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateWebhookArgs } from './dto/create-webhook.args';
import { UpdateWebhookArgs } from './dto/update-webhook.args';
import { WebhookObject } from './dto/webhook.object';
import { WebhookRmq } from './webhook.rmq';

@Resolver()
export class WebhookResolver {
  constructor(private readonly rmq: WebhookRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => WebhookObject)
  createWebhook(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreateWebhookArgs,
  ): Promise<WebhookObject> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => WebhookObject)
  webhookById(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<WebhookObject> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [WebhookObject])
  webhooks(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<WebhookObject[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => WebhookObject)
  updateWebhook(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateWebhookArgs,
  ): Promise<WebhookObject> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => WebhookObject)
  removeWebhook(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<WebhookObject> {
    return this.rmq.remove(auth.project.id, id);
  }
}
