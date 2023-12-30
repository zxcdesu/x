import { Injectable } from '@nestjs/common';
import { ChannelRepository } from '../channel/channel.repository';
import { PrismaService } from '../prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly channelRepository: ChannelRepository,
  ) {}

  async create(payload: CreateChatDto) {
    return this.prismaService.chat.create({
      data: await this.channelRepository
        .get(
          await this.prismaService.channel.findUniqueOrThrow({
            where: {
              projectId_id: {
                projectId: payload.projectId,
                id: payload.channelId,
              },
            },
          }),
        )
        .createChat(payload),
      include: {
        contact: {
          include: {
            assignedTo: true,
            customFields: true,
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
        messages: {
          include: {
            author: true,
            content: {
              include: {
                attachments: true,
              },
              take: 1,
              orderBy: {
                id: 'desc',
              },
            },
          },
          orderBy: {
            id: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.chat.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
      include: {
        contact: {
          include: {
            assignedTo: true,
            customFields: true,
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
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
          orderBy: {
            id: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  findAll(projectId: number) {
    return this.prismaService.chat.findMany({
      where: {
        projectId,
      },
      include: {
        contact: {
          include: {
            assignedTo: true,
            customFields: true,
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
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
          orderBy: {
            id: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  update(payload: UpdateChatDto) {
    return this.prismaService.chat.update({
      where: {
        projectId_id: {
          projectId: payload.projectId,
          id: payload.id,
        },
      },
      data: payload,
      include: {
        contact: {
          include: {
            assignedTo: true,
            customFields: true,
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
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
          orderBy: {
            id: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.prismaService.chat.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
      include: {
        contact: {
          include: {
            assignedTo: true,
            customFields: true,
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
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
          orderBy: {
            id: 'desc',
          },
          take: 1,
        },
      },
    });
  }
}
