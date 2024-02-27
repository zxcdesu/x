import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateInviteArgs } from './dto/create-invite.args';
import { InviteRmq } from './invite.rmq';

@Resolver()
export class InviteResolver {
  constructor(private readonly rmq: InviteRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => Boolean)
  createInvite(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreateInviteArgs,
  ): Promise<boolean> {
    return this.rmq.invite(auth.project.id, payload);
  }
}
