import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { WalletObject } from './dto/wallet.object';
import { WalletRmq } from './wallet.rmq';

@Resolver()
export class WalletResolver {
  constructor(private readonly rmq: WalletRmq) {}

  @UseGuards(BearerAuthGuard)
  @Query(() => WalletObject)
  wallet(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<WalletObject> {
    return this.rmq.findOne(auth.project.id);
  }
}
