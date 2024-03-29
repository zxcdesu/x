import { Injectable } from '@nestjs/common';
import { MessageStatus, Prisma, PrismaService } from '@zxcdesu/prisma-platform';
import { randomUUID } from 'crypto';
import { CreateMessageDto, UpdateMessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Не вызывать напрямую!
   */
  create(projectId: number, chatId: number, payload: CreateMessageDto) {
    return this.prismaService.message.create({
      data: {
        // TODO: Благодаря Object.assign в feature-message-factory externalId и status
        // заполнятся реальными значениями
        externalId: randomUUID(),
        status: MessageStatus.Sent,
        ...payload,
        chat: {
          connect: {
            channel: {
              projectId,
            },
            id: chatId,
          },
        },
        author: {
          create: payload.author,
        },
        content: {
          create: {
            attachments: {
              create: payload.content.attachments,
            },
            buttons: payload.content.buttons as unknown as Prisma.JsonArray,
            text: payload.content.text,
          },
        },
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

  findOne(projectId: number, chatId: number, id: number) {
    return this.prismaService.message.findUniqueOrThrow({
      where: {
        chat: {
          channel: {
            projectId,
          },
          id: chatId,
        },
        id,
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

  findAll(projectId: number, chatId: number) {
    return this.prismaService.message.findMany({
      where: {
        chat: {
          channel: {
            projectId,
          },
          id: chatId,
        },
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

  update(
    projectId: number,
    chatId: number,
    id: number,
    payload: UpdateMessageDto,
  ) {
    return this.prismaService.message.update({
      where: {
        chat: {
          channel: {
            projectId,
          },
        },
        chatId,
        id,
      },
      data: {
        author: payload.author && {
          create: payload.author,
        },
        content: payload.content && {
          create: {
            attachments: {
              create: payload.content.attachments,
            },
            buttons: payload.content.buttons as unknown as Prisma.JsonArray,
            text: payload.content.text,
          },
        },
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

  remove(projectId: number, chatId: number, id: number) {
    return this.prismaService.message.delete({
      where: {
        chat: {
          channel: {
            projectId,
          },
        },
        chatId,
        id,
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
