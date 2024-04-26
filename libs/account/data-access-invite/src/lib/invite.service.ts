import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-account';
import { CreateInviteDto } from './dto';

@Injectable()
export class InviteService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(projectId: number, payload: CreateInviteDto) {
    return this.prismaService.invite.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findAll(projectId: number) {
    return this.prismaService.invite.findMany({
      where: {
        projectId,
      },
    });
  }

  findAllByEmail(email: string) {
    return this.prismaService.invite.findMany({
      where: {
        email,
      },
    });
  }
}
