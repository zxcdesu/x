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

  async create(projectId: number, payload: CreateMessageDto) {
    const chat = await this.prismaService.chat.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id: payload.chatId,
        },
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
        },
      },
    });
  }

  async findAll(projectId: number, chatId: number) {
    const { messages } = await this.prismaService.chat.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id: chatId,
        },
      },
      select: {
        messages: {
          include: {
            author: true,
            content: {
              include: {
                attachments: true,
              },
            },
          },
        },
      },
    });

    return messages;
  }

  async update(projectId: number, payload: UpdateMessageDto) {
    const chat = await this.prismaService.chat.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id: payload.chatId,
        },
      },
      include: {
        messages: {
          where: {
            id: payload.id,
          },
          include: {
            author: true,
            content: {
              include: {
                attachments: true,
              },
            },
          },
        },

        channel: true,
      },
    });

    return this.prismaService.message.update({
      where: {
        id: payload.id,
      },
      data: await this.channelRepository
        .get(chat.channel)
        .updateMessage(chat, chat.messages[0].externalId, payload),
    });
  }

  async remove(projectId: number, chatId: number, id: number) {
    const chat = await this.prismaService.chat.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId: projectId,
          id: chatId,
        },
      },
      include: {
        messages: {
          where: {
            id,
          },
          include: {
            author: true,
            content: {
              include: {
                attachments: true,
              },
            },
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
        id,
      },
    });
  }
}
