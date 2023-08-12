import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { MailingDto } from './dto/mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';
import { MailingRmq } from './mailing.rmq';

@Resolver()
export class MailingResolver {
  constructor(private readonly rmq: MailingRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => MailingDto)
  createMailing(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateMailingDto,
  ): Promise<MailingDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => MailingDto)
  mailingById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<MailingDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => MailingDto)
  mailings(@BearerAuthDecorator() auth: BearerAuth): Promise<MailingDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => MailingDto)
  updateMailing(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateMailingDto,
  ): Promise<MailingDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => MailingDto)
  removeMailing(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<MailingDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
