import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebhookPayload } from '@zxcdesu/platform-type';
import { plainToInstance } from 'class-transformer';
import { ChatDto } from '../chat/dto/chat.dto';
import { CreateChatDto } from '../chat/dto/create-chat.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { MessageDto } from '../message/dto/message.dto';
import { UpdateMessageDto } from '../message/dto/update-message.dto';
import {
  Channel,
  Chat,
  ContactStatus,
  MessageStatus,
  Prisma,
  PrismaService,
} from '../prisma.service';

export abstract class AbstractChannel<Q = unknown, B = unknown> {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    protected readonly channel: Channel,
    protected readonly amqpConnection: AmqpConnection,
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,
    protected readonly prismaService: PrismaService,
  ) {}

  abstract create(): Promise<Partial<Prisma.ChannelUncheckedUpdateInput>>;

  abstract handleWebhook(event: WebhookPayload<Q, B>): Promise<void>;

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
    message: UpdateMessageDto,
  ): Promise<Prisma.MessageUncheckedUpdateInput>;

  abstract removeMessage(chat: Chat, externalId: string): Promise<void>;

  /**
   * Сохранение и публикация полученного **внешнего** сообщения и чата
   */
  protected async saveAndPublish(
    accountId: string,
    name: string,
    message: {
      externalId: string;
      content: Prisma.ContentUncheckedCreateNestedManyWithoutMessageInput;
      status: MessageStatus;
      author: Prisma.AuthorUncheckedCreateNestedOneWithoutMessageInput;
    },
  ) {
    const chat = await this.saveChat(accountId, name);
    const messageDto = plainToInstance(
      MessageDto,
      await this.saveMessage(chat.id, message),
    );

    const chatDto = plainToInstance(
      ChatDto,
      Object.assign(chat, {
        messages: [messageDto],
      }),
    );

    await Promise.all([
      this.publishChat(chatDto),
      this.publishMessage(chatDto, messageDto),
    ]);
  }

  protected async publishChat(chat: ChatDto) {
    await Promise.all([
      this.amqpConnection.publish('backend', 'receiveChat', {
        projectId: this.channel.projectId,
        chat,
      }),
      this.amqpConnection.publish('integrations', 'sendWebhooks', {
        projectId: this.channel.projectId,
        channelId: this.channel.id,
        type: 'ChatEvent',
        value: chat,
      }),
    ]);
  }

  protected async publishMessage(chat: ChatDto, message: MessageDto) {
    await Promise.all([
      this.amqpConnection.publish('backend', 'receiveMessage', {
        projectId: this.channel.projectId,
        chatId: chat.id,
        message,
      }),
      this.amqpConnection.publish('integrations', 'sendWebhooks', {
        projectId: this.channel.projectId,
        channelId: this.channel.id,
        chatId: chat.id,
        type: 'MessageEvent',
        value: message,
      }),
    ]);
  }

  private async saveChat(accountId: string, name: string) {
    return this.prismaService.chat.upsert({
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
      },
    });
  }

  private async saveMessage(
    chatId: number,
    message: {
      externalId: string;
      content: Prisma.ContentUncheckedCreateNestedManyWithoutMessageInput;
      status: MessageStatus;
      author: Prisma.AuthorUncheckedCreateNestedOneWithoutMessageInput;
    },
  ) {
    return this.prismaService.message.upsert({
      where: {
        chatId_externalId: {
          chatId,
          externalId: message.externalId,
        },
      },
      create: {
        chat: {
          connect: {
            id: chatId,
          },
        },
        externalId: message.externalId,
        content: message.content,
        status: message.status,
        author: message.author,
      },
      update: {
        content: message.content,
        updatedAt: new Date(),
      },
      include: {
        author: true,
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
    });
  }
}
