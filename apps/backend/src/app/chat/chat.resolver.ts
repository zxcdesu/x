import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ChatRmq } from './chat.rmq';
import { ChatDto } from './dto/chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Resolver()
export class ChatResolver {
  constructor(private readonly rmq: ChatRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChatDto)
  createChat(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateChatDto,
  ): Promise<ChatDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ChatDto)
  chatById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ChatDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ChatDto])
  chats(@BearerAuthDecorator() auth: BearerAuth): Promise<ChatDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChatDto)
  updateChat(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateChatDto,
  ): Promise<ChatDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChatDto)
  removeChat(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ChatDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
