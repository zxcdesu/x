import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ChatService } from '../chat/chat.service';
import { PubSubService } from '../pubsub.service';
import { AuthorType } from './dto/author-type.enum';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRmq } from './message.rmq';

@Resolver()
export class MessageResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly rmq: MessageRmq,
    private readonly pubSubService: PubSubService,
  ) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => MessageDto)
  async createMessage(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateMessageDto,
  ): Promise<MessageDto> {
    await this.chatService.findOneAndCheck(auth, payload.chatId);
    return this.rmq.create(
      auth.project.id,
      {
        id: auth.id,
        type: AuthorType.User,
      },
      payload,
    );
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [MessageDto])
  async messages(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('chatId', { type: () => Int }) chatId: number,
  ): Promise<MessageDto[]> {
    await this.chatService.findOneAndCheck(auth, chatId);
    return this.rmq.findAll(auth.project.id, chatId);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => MessageDto)
  async updateMessage(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateMessageDto,
  ): Promise<MessageDto> {
    await this.chatService.findOneAndCheck(auth, payload.chatId);
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => MessageDto)
  async removeMessage(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('chatId', { type: () => Int }) chatId: number,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<MessageDto> {
    await this.chatService.findOneAndCheck(auth, chatId);
    return this.rmq.remove(auth.project.id, chatId, id);
  }

  @UseGuards(BearerAuthGuard)
  @Subscription(() => MessageDto)
  async messageReceived(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('chatId', { type: () => Int }) chatId: number,
  ) {
    await this.chatService.findOneAndCheck(auth, chatId);
    return this.pubSubService.asyncIterator(
      PubSubService.messageReceived(auth.project.id, chatId),
    );
  }
}
