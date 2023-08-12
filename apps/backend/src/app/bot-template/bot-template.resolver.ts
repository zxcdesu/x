import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BotTemplateRmq } from './bot-template.rmq';
import { BotTemplateDto } from './dto/bot-template.dto';
import { CreateBotTemplateDto } from './dto/create-bot-template.dto';
import { UpdateBotTemplateDto } from './dto/update-bot-template.dto';

@Resolver()
export class BotTemplateResolver {
  constructor(private readonly rmq: BotTemplateRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => BotTemplateDto)
  createBotTemplate(
    @Args() payload: CreateBotTemplateDto,
  ): Promise<BotTemplateDto> {
    return this.rmq.create(payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => BotTemplateDto)
  botTemplateById(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<BotTemplateDto> {
    return this.rmq.findOne(id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => BotTemplateDto)
  botTemplates(): Promise<BotTemplateDto[]> {
    return this.rmq.findAll();
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => BotTemplateDto)
  updateBotTemplate(
    @Args() payload: UpdateBotTemplateDto,
  ): Promise<BotTemplateDto> {
    return this.rmq.update(payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => BotTemplateDto)
  removeBotTemplate(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<BotTemplateDto> {
    return this.rmq.remove(id);
  }
}
