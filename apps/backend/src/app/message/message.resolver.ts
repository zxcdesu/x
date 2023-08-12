import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRmq } from './message.rmq';

@Resolver()
export class MessageResolver {
  constructor(private readonly rmq: MessageRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => MessageDto)
  createMessage(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateMessageDto,
  ): Promise<MessageDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => MessageDto)
  messageById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<MessageDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => MessageDto)
  messages(@BearerAuthDecorator() auth: BearerAuth): Promise<MessageDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => MessageDto)
  updateMessage(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateMessageDto,
  ): Promise<MessageDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => MessageDto)
  removeMessage(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<MessageDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
