import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateInviteDto } from './dto/create-invite.dto';

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

  findAllByEmail(email: string) {
    return this.prismaService.invite.findMany({
      where: {
        email,
      },
    });
  }
}
