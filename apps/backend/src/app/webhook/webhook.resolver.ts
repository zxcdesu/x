import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { WebhookDto } from './dto/webhook.dto';
import { WebhookRmq } from './webhook.rmq';

@Resolver()
export class WebhookResolver {
  constructor(private readonly rmq: WebhookRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => WebhookDto)
  createWebhook(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateWebhookDto,
  ): Promise<WebhookDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => WebhookDto)
  webhookById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<WebhookDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => WebhookDto)
  webhooks(@BearerAuthDecorator() auth: BearerAuth): Promise<WebhookDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => WebhookDto)
  updateWebhook(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateWebhookDto,
  ): Promise<WebhookDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => WebhookDto)
  removeWebhook(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<WebhookDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
