import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRmq } from '@zxcdesu/data-access-user';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateUserArgs, UpdateUserArgs, UserObject } from './dto';

@Resolver()
export class userResolver {
  constructor(private readonly userRmq: UserRmq<UserObject>) {}

  @Mutation(() => UserObject)
  createUser(@Args() payload: CreateUserArgs): Promise<UserObject> {
    return this.userRmq.create(payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => UserObject)
  user(@BearerAuthDecorator() auth: Required<BearerAuth>): Promise<UserObject> {
    return this.userRmq.findOne(auth.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => UserObject)
  updateUser(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateUserArgs,
  ): Promise<UserObject> {
    return this.userRmq.update(auth.id, payload);
  }
}
