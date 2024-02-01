import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { SubscriberDto } from './dto/subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscriberRmq } from './subscriber.rmq';

@Resolver()
export class SubscriberResolver {
  constructor(private readonly rmq: SubscriberRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => SubscriberDto)
  createSubscriber(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateSubscriberDto,
  ): Promise<SubscriberDto> {
    return this.rmq.create(auth.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => SubscriberDto)
  subscriber(@BearerAuthDecorator() auth: BearerAuth): Promise<SubscriberDto> {
    return this.rmq.findOne(auth.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => SubscriberDto)
  updateSubscriber(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateSubscriberDto,
  ): Promise<SubscriberDto> {
    return this.rmq.update(auth.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => SubscriberDto)
  removeSubscriber(
    @BearerAuthDecorator() auth: BearerAuth,
  ): Promise<SubscriberDto> {
    return this.rmq.remove(auth.id);
  }
}
