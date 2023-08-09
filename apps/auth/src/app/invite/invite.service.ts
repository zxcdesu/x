import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateInviteDto } from './dto/create-invite.dto';

@Injectable()
export class InviteService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateInviteDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (user) {
      await this.prismaService.projectUser.create({
        data: {
          projectId: payload.projectId,
          userId: user.id,
        },
      });
    } else {
      await this.prismaService.invite.create({
        data: payload,
      });
    }
  }
}
