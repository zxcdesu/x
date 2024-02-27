import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { TokenDto } from '../auth/dto/token.dto';
import { CreateUserArgs } from './dto/create-user.args';
import { SignInUserArgs } from './dto/sign-in-user.args';
import { UpdateUserArgs } from './dto/update-user.args';
import { UserObject } from './dto/user.object';
import { UserRmq } from './user.rmq';

@Resolver()
export class UserResolver {
  constructor(private readonly rmq: UserRmq) {}

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

  @Mutation(() => TokenDto)
  signIn(@Args() payload: SignInUserArgs): Promise<TokenDto> {
    return this.rmq.signIn(payload);
  }
}
