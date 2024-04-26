import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRmq } from '@zxcdesu/data-access-user';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateUserArgs } from './dto/create-user.args';
import { UpdateUserArgs } from './dto/update-user.args';
import { UserObject } from './dto/user.object';

@Resolver()
export class UserResolver {
  constructor(private readonly rmq: UserRmq<UserObject>) {}

  @Mutation(() => UserObject)
  createUser(@Args() payload: CreateUserArgs): Promise<UserObject> {
    return this.rmq.create(payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => UserObject)
  user(@BearerAuthDecorator() auth: BearerAuth): Promise<UserObject> {
    return this.rmq.findOne(auth.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => UserObject)
  updateUser(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateUserArgs,
  ): Promise<UserObject> {
    return this.rmq.update(auth.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => UserObject)
  removeUser(@BearerAuthDecorator() auth: BearerAuth): Promise<UserObject> {
    return this.rmq.remove(auth.id);
  }
}
