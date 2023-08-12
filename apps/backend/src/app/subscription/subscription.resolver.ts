import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionRmq } from './subscription.rmq';

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly rmq: SubscriptionRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => SubscriptionDto)
  createSubscription(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => SubscriptionDto)
  subscriptionById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<SubscriptionDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => SubscriptionDto)
  subscriptions(
    @BearerAuthDecorator() auth: BearerAuth,
  ): Promise<SubscriptionDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => SubscriptionDto)
  updateSubscription(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => SubscriptionDto)
  removeSubscription(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<SubscriptionDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
