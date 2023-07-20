import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateUserDto, UpdateUserDto, User } from './user.dto';
import { UserRmq } from './user.rmq';

@Resolver()
export class UserResolver {
  constructor(private readonly rmq: UserRmq) {}

  @Mutation(() => User)
  createUser(@Args() dto: CreateUserDto) {
    return this.rmq.create(dto);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => User)
  findOneUser(@BearerAuthDecorator() auth: BearerAuth) {
    return this.rmq.findOne(auth.id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [User])
  findAllUsers(@BearerAuthDecorator() auth: BearerAuth) {
    return this.rmq.findAll();
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => User)
  updateUser(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() dto: UpdateUserDto,
  ) {
    return this.rmq.update({ id: auth.id, ...dto });
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => User)
  removeUser(@BearerAuthDecorator() auth: BearerAuth) {
    return this.rmq.remove(auth.id);
  }
}
