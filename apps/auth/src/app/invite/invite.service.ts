import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectUserService } from '../project-user/project-user.service';
import { UserService } from '../user/user.service';
import { CreateInviteDto } from './dto/create-invite.dto';

@Injectable()
export class InviteService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly projectUserService: ProjectUserService,
  ) {}

  async create(payload: CreateInviteDto) {
    const user = await this.userService.findOneByEmail(payload.email);
    if (user) {
      await this.projectUserService.create(payload.projectId, user.id);
    } else {
      await this.prismaService.invite.create({
        data: payload,
      });
    }
  }

  findAll(email: string) {
    return this.prismaService.invite.findMany({
      where: {
        email,
      },
    });
  }
}
