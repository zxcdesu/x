import { Injectable } from '@nestjs/common';
import { ChannelRepository } from '../channel/channel.repository';
import { PrismaService } from '../prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly channelRepository: ChannelRepository,
  ) {}

  async create(projectId: number, chatId: number, payload: CreateMessageDto) {
    const chat = await this.prismaService.chat.findUniqueOrThrow({
      where: {
        channel: {
          projectId,
        },
        id: chatId,
      },
      include: {
        channel: true,
      },
    });

    return this.prismaService.message.create({
      data: Object.assign(
        {
          author: {
            create: payload.author,
          },
        },
        await this.channelRepository
          .get(chat.channel)
          .createMessage(chat, payload),
      ),
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

  async findAll(projectId: number, chatId: number) {
    const { messages } = await this.prismaService.chat.findUniqueOrThrow({
      where: {
        channel: {
          projectId,
        },
        id: chatId,
      },
      select: {
        messages: {
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
        },
      },
    });

    return messages;
  }

  async update(
    projectId: number,
    chatId: number,
    id: number,
    payload: UpdateMessageDto,
  ) {
    const chat = await this.prismaService.chat.findUniqueOrThrow({
      where: {
        channel: {
          projectId,
        },
        id: chatId,
      },
      include: {
        messages: {
          where: {
            id,
          },
        },
        channel: true,
      },
    });

    return this.prismaService.message.update({
      where: {
        id: chat.messages[0].id,
      },
      data: await this.channelRepository
        .get(chat.channel)
        .updateMessage(chat, chat.messages[0].externalId, payload),
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

  async remove(projectId: number, chatId: number, id: number) {
    const chat = await this.prismaService.chat.findUniqueOrThrow({
      where: {
        channel: {
          projectId,
        },
        id: chatId,
      },
      include: {
        messages: {
          where: {
            id,
          },
        },
        channel: true,
      },
    });

    await this.channelRepository
      .get(chat.channel)
      .removeMessage(chat, chat.messages[0].externalId);

    return this.prismaService.message.delete({
      where: {
        id: chat.messages[0].id,
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
