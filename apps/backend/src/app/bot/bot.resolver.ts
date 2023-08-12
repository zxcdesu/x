import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { BotRmq } from './bot.rmq';
import { BotDto } from './dto/bot.dto';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Resolver()
export class BotResolver {
  constructor(private readonly rmq: BotRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => BotDto)
  createBot(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateBotDto,
  ): Promise<BotDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => BotDto)
  botById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<BotDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => BotDto)
  bots(@BearerAuthDecorator() auth: BearerAuth): Promise<BotDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => BotDto)
  updateBot(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateBotDto,
  ): Promise<BotDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => BotDto)
  removeBot(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<BotDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
