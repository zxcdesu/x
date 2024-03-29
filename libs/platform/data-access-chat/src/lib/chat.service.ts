import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-platform';
import { CreateChatDto, UpdateChatDto } from './dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateChatDto) {
    return this.prismaService.chat.create({
      data: {
        externalId: payload.externalId,
        channel: {
          connect: {
            projectId,
            id: payload.channelId,
          },
        },
        contact: {
          connect: {
            projectId,
            id: payload.contactId,
          },
        },
      },
      include: {
        contact: {
          include: {
            assignedTo: true,
            fields: {
              include: {
                field: true,
              },
            },
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

  findOne(projectId: number, id: number) {
    return this.prismaService.chat.findUniqueOrThrow({
      where: {
        channel: {
          projectId,
        },
        id,
      },
      include: {
        contact: {
          include: {
            assignedTo: true,
            fields: {
              include: {
                field: true,
              },
            },
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
        channel: {
          projectId,
        },
      },
      include: {
        contact: {
          include: {
            assignedTo: true,
            fields: {
              include: {
                field: true,
              },
            },
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

  update(projectId: number, id: number, payload: UpdateChatDto) {
    return this.prismaService.chat.update({
      where: {
        channel: {
          projectId,
        },
        id,
      },
      data: {
        externalId: payload.externalId,
        channel: payload.channelId
          ? {
              connect: {
                projectId,
                id: payload.channelId,
              },
            }
          : undefined,
        contact: payload.contactId
          ? {
              connect: {
                projectId,
                id: payload.contactId,
              },
            }
          : undefined,
      },
      include: {
        contact: {
          include: {
            assignedTo: true,
            fields: {
              include: {
                field: true,
              },
            },
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
        channel: {
          projectId,
        },
        id,
      },
      include: {
        contact: {
          include: {
            assignedTo: true,
            fields: {
              include: {
                field: true,
              },
            },
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
