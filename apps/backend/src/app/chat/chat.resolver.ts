import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ChatRmq } from '@zxcdesu/data-access-chat';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { AssigneeType } from '../contact/dto/assignee-type.enum';
import { PubSubService } from '../pubsub.service';
import { ChatService } from './chat.service';
import { ChatObject } from './dto/chat.object';
import { CreateChatArgs } from './dto/create-chat.args';
import { UpdateChatArgs } from './dto/update-chat.args';

@Resolver()
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly rmq: ChatRmq<ChatObject>,
    private readonly pubSubService: PubSubService,
  ) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChatObject)
  createChat(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreateChatArgs,
  ): Promise<ChatObject> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ChatObject)
  chatById(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ChatObject> {
    return this.chatService.findOneAndCheck(auth, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ChatObject])
  chats(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<ChatObject[]> {
    return this.rmq.findAll(auth.project.id, {
      id: auth.id,
      type: AssigneeType.User,
    });
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChatObject)
  async updateChat(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateChatArgs,
  ): Promise<ChatObject> {
    await this.chatService.findOneAndCheck(auth, payload.id);
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ChatObject)
  async removeChat(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ChatObject> {
    await this.chatService.findOneAndCheck(auth, id);
    return this.rmq.remove(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Subscription(() => ChatObject)
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
