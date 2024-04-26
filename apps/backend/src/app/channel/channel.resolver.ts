import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChannelRmq } from '@zxcdesu/data-access-channel';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ChannelObject } from './dto/channel.object';
import { CreateChannelArgs } from './dto/create-channel.args';
import { UpdateChannelArgs } from './dto/update-channel.args';

@Resolver()
export class ChannelResolver {
  constructor(private readonly rmq: ChannelRmq<ChannelObject>) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelObject)
  createChannel(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreateChannelArgs,
  ): Promise<ChannelObject> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ChannelObject)
  channelById(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ChannelObject> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ChannelObject])
  channels(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<ChannelObject[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelObject)
  updateChannel(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateChannelArgs,
  ): Promise<ChannelObject> {
    return this.rmq.update(auth.project.id, payload.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelObject)
  removeChannel(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ChannelObject> {
    return this.rmq.remove(auth.project.id, id);
  }
}
