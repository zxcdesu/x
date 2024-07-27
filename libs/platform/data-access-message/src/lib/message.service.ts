import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-platform';
import { MessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(
    projectId: number,
    userId: number,
    chatId: number,
  ): Promise<MessageDto[]> {
    return <Promise<any[]>>this.prismaService.message.findMany({
      where: {
        chat: {
          contact: {
            projectId,
            assignee: {
              id: userId,
            },
          },
          id: chatId,
        },
      },
      include: {
        author: true,
        media: true,
      },
    });
  }
}
