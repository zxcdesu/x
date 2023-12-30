import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BotTemplateRmq } from './bot-template.rmq';
import { BotTemplateDto } from './dto/bot-template.dto';

@Resolver()
export class BotTemplateResolver {
  constructor(private readonly rmq: BotTemplateRmq) {}

  @UseGuards(BearerAuthGuard)
  @Query(() => BotTemplateDto)
  botTemplateById(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<BotTemplateDto> {
    return this.rmq.findOne(id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [BotTemplateDto])
  botTemplates(): Promise<BotTemplateDto[]> {
    return this.rmq.findAll();
  }
}
