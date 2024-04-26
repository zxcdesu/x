import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateNotificationSubscriberDto } from './dto/create-notification-subscriber.dto';
import { NotificationSubscriberDto } from './dto/notification-subscriber.dto';
import { UpdateNotificationSubscriberDto } from './dto/update-notification-subscriber.dto';
import { SubscriberRmq } from './subscriber.rmq';

@Resolver()
export class SubscriberResolver {
  constructor(private readonly rmq: SubscriberRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => NotificationSubscriberDto)
  createSubscriber(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateNotificationSubscriberDto,
  ): Promise<NotificationSubscriberDto> {
    return this.rmq.create(auth.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => NotificationSubscriberDto)
  subscriber(
    @BearerAuthDecorator() auth: BearerAuth,
  ): Promise<NotificationSubscriberDto> {
    return this.rmq.findOne(auth.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => NotificationSubscriberDto)
  updateSubscriber(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateNotificationSubscriberDto,
  ): Promise<NotificationSubscriberDto> {
    return this.rmq.update(auth.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => NotificationSubscriberDto)
  removeSubscriber(
    @BearerAuthDecorator() auth: BearerAuth,
  ): Promise<NotificationSubscriberDto> {
    return this.rmq.remove(auth.id);
  }
}
