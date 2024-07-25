import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountRmq } from '@zxcdesu/data-access-account';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { AccountObject, CreateAccountArgs, UpdateAccountArgs } from './dto';

@Resolver()
export class AccountResolver {
  constructor(private readonly accountRmq: AccountRmq<AccountObject>) {}

  @Mutation(() => AccountObject)
  createAccount(@Args() payload: CreateAccountArgs): Promise<AccountObject> {
    return this.accountRmq.create(payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => AccountObject)
  account(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<AccountObject> {
    return this.accountRmq.findOne(auth.id);
  }

  // @UseGuards(BearerAuthGuard)
  // @Query(() => AccountObject)
  // accountById(
  //   @BearerAuthDecorator() auth: Required<BearerAuth>,
  // ): Promise<AccountObject> {
  //   return this.accountRmq.findOne(auth.id);
  // }

  // @UseGuards(BearerAuthGuard)
  // @Query(() => [AccountObject])
  // accounts(): Promise<AccountObject[]> {
  //   return this.accountRmq.findAll();
  // }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => AccountObject)
  updateAccount(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateAccountArgs,
  ): Promise<AccountObject> {
    return this.accountRmq.update(auth.id, payload);
  }

  // @UseGuards(BearerAuthGuard)
  // @Mutation(() => AccountObject)
  // removeAccount(
  //   @BearerAuthDecorator() auth: Required<BearerAuth>,
  // ): Promise<AccountObject> {
  //   return this.accountRmq.remove(auth.id);
  // }
}
