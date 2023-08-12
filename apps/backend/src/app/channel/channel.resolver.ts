import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ChannelRmq } from './channel.rmq';
import { ChannelDto } from './dto/channel.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Resolver()
export class ChannelResolver {
  constructor(private readonly rmq: ChannelRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelDto)
  createChannel(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateChannelDto,
  ): Promise<ChannelDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ChannelDto)
  channelById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ChannelDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ChannelDto)
  channels(@BearerAuthDecorator() auth: BearerAuth): Promise<ChannelDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelDto)
  updateChannel(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateChannelDto,
  ): Promise<ChannelDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelDto)
  removeChannel(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ChannelDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
