import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BotRmq } from '@zxcdesu/data-access-bot';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { BotObject } from './dto/bot.object';
import { CreateBotArgs } from './dto/create-bot.args';
import { UpdateBotArgs } from './dto/update-bot.args';

@Resolver()
export class BotResolver {
  constructor(private readonly rmq: BotRmq<BotObject>) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => BotObject)
  createBot(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreateBotArgs,
  ): Promise<BotObject> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => BotObject)
  botById(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<BotObject> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [BotObject])
  bots(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<BotObject[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => BotObject)
  updateBot(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateBotArgs,
  ): Promise<BotObject> {
    return this.rmq.update(auth.project.id, payload.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => BotObject)
  removeBot(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<BotObject> {
    return this.rmq.remove(auth.project.id, id);
  }
}
