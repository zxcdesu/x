import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InviteRmq } from '@zxcdesu/data-access-invite';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateInviteArgs } from './dto/create-invite.args';
import { InviteObject } from './dto/invite.object';

@Resolver()
export class InviteResolver {
  constructor(private readonly rmq: InviteRmq<InviteObject>) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => InviteObject)
  createInvite(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreateInviteArgs,
  ): Promise<InviteObject> {
    return this.rmq.create(auth.project.id, payload);
  }
}
