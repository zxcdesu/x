import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ChannelEvent } from '@platform/platform-type';
import { plainToInstance } from 'class-transformer';
import { ChatDto } from '../chat/dto/chat.dto';
import { CreateChatDto } from '../chat/dto/create-chat.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { MessageDto } from '../message/dto/message.dto';
import {
  Channel,
  Chat,
  ContactStatus,
  MessageStatus,
  Prisma,
  PrismaService,
} from '../prisma.service';

export abstract class AbstractChannel<Q = unknown, B = unknown> {
  constructor(
    protected readonly channel: Channel,
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,
    protected readonly prismaService: PrismaService,
  ) {}

  abstract initialize(): Promise<Partial<Prisma.ChannelUncheckedUpdateInput>>;

  abstract handleEvent(event: ChannelEvent<Q, B>): Promise<void>;

  abstract createChat(
    chat: CreateChatDto,
  ): Promise<Prisma.ChatUncheckedCreateInput>;

  abstract createMessage(
    chat: Chat,
    message: CreateMessageDto,
  ): Promise<Prisma.MessageUncheckedCreateInput>;

  abstract updateMessage(
    chat: Chat,
    externalId: string,
    message: unknown,
  ): Promise<unknown>;

  abstract removeMessage(chat: Chat, externalId: string): Promise<unknown>;

  protected async upsertChat(
    accountId: string,
    name: string,
  ): Promise<ChatDto> {
    const chat = plainToInstance(
      ChatDto,
      await this.prismaService.chat.upsert({
        where: {
          channelId_accountId: {
            channelId: this.channel.id,
            accountId,
          },
        },
        create: {
          projectId: this.channel.projectId,
          channel: {
            connect: {
              id: this.channel.id,
            },
          },
          accountId,
          contact: {
            create: {
              projectId: this.channel.projectId,
              name,
              status: ContactStatus.Pending,
            },
          },
        },
        update: {
          isNew: false,
          unreadCount: {
            increment: 1,
          },
        },
        include: {
          contact: {
            include: {
              assignedTo: true,
              customFields: true,
              tags: true,
            },
          },
          messages: {
            include: {
              content: {
                include: {
                  attachments: true,
                },
                orderBy: {
                  id: 'desc',
                },
                take: 1,
              },
            },
            orderBy: {
              id: 'desc',
            },
            take: 1,
          },
        },
      }),
    );
    // TODO: chat received
    return chat;
  }

  protected async upsertMessage(
    chat: Chat,
    externalId: string,
    content: Prisma.ContentUncheckedCreateNestedManyWithoutMessageInput,
    status: MessageStatus,
    author: Prisma.AuthorUncheckedCreateNestedOneWithoutMessageInput,
  ): Promise<MessageDto> {
    const message = plainToInstance(
      MessageDto,
      await this.prismaService.message.upsert({
        where: {
          chatId_externalId: {
            chatId: chat.id,
            externalId,
          },
        },
        create: {
          chat: {
            connect: {
              id: chat.id,
            },
          },
          externalId,
          content,
          status,
          author,
        },
        update: {
          content,
          updatedAt: new Date(),
        },
        include: {
          content: {
            include: {
              attachments: true,
            },
            orderBy: {
              id: 'desc',
            },
            take: 1,
          },
        },
      }),
    );
    // TODO: message received
    return message;
  }
}
