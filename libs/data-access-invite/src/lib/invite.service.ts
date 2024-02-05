import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-auth';
import { CreateInviteDto } from './dto';

@Injectable()
export class InviteService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(projectId: number, payload: CreateInviteDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (user) {
      await this.prismaService.projectUser.create({
        data: {
          projectId,
          userId: user.id,
        },
      });
    } else {
      await this.prismaService.invite.create({
        data: {
          email: payload.email,
          projectId,
        },
      });
    }

    return true;
  }
}
