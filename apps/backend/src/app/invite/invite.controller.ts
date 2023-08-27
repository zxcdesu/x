import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InviteRmq } from './invite.rmq';

@Resolver()
export class InviteResolver {
  constructor(private readonly rmq: InviteRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => Boolean)
  async createInvite(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateInviteDto,
  ): Promise<boolean> {
    return this.rmq.create(auth.project.id, payload);
  }
}
