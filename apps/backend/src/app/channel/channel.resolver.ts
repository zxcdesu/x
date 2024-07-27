import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChannelRmq } from '@zxcdesu/data-access-channel';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { ChannelObject, CreateChannelArgs, UpdateChannelArgs } from './dto';

@Resolver()
export class ChannelResolver {
  constructor(private readonly channelRmq: ChannelRmq<ChannelObject>) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelObject)
  createChannel(
    @Args('projectId', ParseIntPipe) projectId: number,
    @Args() payload: CreateChannelArgs,
  ): Promise<ChannelObject> {
    return this.channelRmq.create(projectId, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelObject)
  channelById(
    @Args('projectId', ParseIntPipe) projectId: number,
    @Args('id') id: number,
  ): Promise<ChannelObject> {
    return this.channelRmq.findOne(projectId, id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelObject)
  channels(
    @Args('projectId', ParseIntPipe) projectId: number,
  ): Promise<ChannelObject[]> {
    return this.channelRmq.findAll(projectId);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelObject)
  updateChannel(
    @Args('projectId', ParseIntPipe) projectId: number,
    @Args('id') id: number,
    @Args() payload: UpdateChannelArgs,
  ): Promise<ChannelObject> {
    return this.channelRmq.update(projectId, id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChannelObject)
  removeChannel(
    @Args('projectId', ParseIntPipe) projectId: number,
    @Args('id') id: number,
  ): Promise<ChannelObject> {
    return this.channelRmq.remove(projectId, id);
  }
}
