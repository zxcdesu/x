import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BotTemplateRmq } from '@zxcdesu/data-access-bot-template';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BotTemplateObject } from './dto/bot-template.object';

@Resolver()
export class BotTemplateResolver {
  constructor(private readonly rmq: BotTemplateRmq<BotTemplateObject>) {}

  @UseGuards(BearerAuthGuard)
  @Query(() => BotTemplateObject)
  botTemplateById(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<BotTemplateObject> {
    return this.rmq.findOne(id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [BotTemplateObject])
  botTemplates(): Promise<BotTemplateObject[]> {
    return this.rmq.findAll();
  }
}
