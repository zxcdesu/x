import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { TokenDto } from '../auth/dto/token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserRmq } from './user.rmq';

@Resolver()
export class UserResolver {
  constructor(private readonly rmq: UserRmq) {}

  @Mutation(() => UserDto)
  createUser(@Args() payload: CreateUserDto): Promise<UserDto> {
    return this.rmq.create(payload);
  }

  @Mutation(() => TokenDto)
  signIn(@Args() payload: SignInUserDto): Promise<TokenDto> {
    return this.rmq.signIn(payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => UserDto)
  user(@BearerAuthDecorator() auth: BearerAuth): Promise<UserDto> {
    return this.rmq.findOne(auth.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => UserDto)
  updateUser(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateUserDto,
  ): Promise<UserDto> {
    return this.rmq.update({
      ...payload,
      id: auth.id,
    });
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => UserDto)
  removeUser(@BearerAuthDecorator() auth: BearerAuth): Promise<UserDto> {
    return this.rmq.remove(auth.id);
  }
}
