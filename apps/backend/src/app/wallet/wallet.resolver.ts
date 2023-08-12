import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletDto } from './dto/project.dto';
import { UpdateWalletDto } from './dto/update-project.dto';
import { WalletRmq } from './wallet.rmq';

@Resolver()
export class WalletResolver {
  constructor(private readonly rmq: WalletRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => WalletDto)
  createWallet(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateWalletDto,
  ): Promise<WalletDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => WalletDto)
  walletById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<WalletDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => WalletDto)
  wallets(@BearerAuthDecorator() auth: BearerAuth): Promise<WalletDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => WalletDto)
  updateWallet(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateWalletDto,
  ): Promise<WalletDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => WalletDto)
  removeWallet(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<WalletDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
