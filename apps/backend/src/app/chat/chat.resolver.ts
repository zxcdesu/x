import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { AssigneeType } from '../contact/dto/assignee-type.enum';
import { PubSubService } from '../pubsub.service';
import { ChatRmq } from './chat.rmq';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Resolver()
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly rmq: ChatRmq,
    private readonly pubSubService: PubSubService,
  ) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChatDto)
  createChat(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreateChatDto,
  ): Promise<ChatDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ChatDto)
  chatById(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ChatDto> {
    return this.chatService.findOneAndCheck(auth, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ChatDto])
  chats(@BearerAuthDecorator() auth: Required<BearerAuth>): Promise<ChatDto[]> {
    return this.rmq.findAll(auth.project.id, {
      id: auth.id,
      type: AssigneeType.User,
    });
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChatDto)
  async updateChat(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateChatDto,
  ): Promise<ChatDto> {
    await this.chatService.findOneAndCheck(auth, payload.id);
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChatDto)
  async removeChat(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ChatDto> {
    await this.chatService.findOneAndCheck(auth, id);
    return this.rmq.remove(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Subscription(() => ChatDto)
  chatReceived(@BearerAuthDecorator() auth: Required<BearerAuth>) {
    return this.pubSubService.asyncIterator([
      PubSubService.chatReceived(auth.project.id),
      PubSubService.chatReceived(auth.project.id, {
        id: auth.id,
        type: AssigneeType.User,
      }),
    ]);
  }
}
