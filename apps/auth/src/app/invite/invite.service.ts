import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectUserService } from '../project-user/project-user.service';
import { UserService } from '../user/user.service';
import { CreateInviteDto } from './dto/create-invite.dto';

@Injectable()
export class InviteService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly projectUserService: ProjectUserService,
  ) {}

  async create(payload: CreateInviteDto): Promise<boolean> {
    const user = await this.userService.findOneByEmail(payload.email);
    if (user) {
      await this.projectUserService.create(payload.projectId, user.id);
    } else {
      await this.prismaService.invite.create({
        data: payload,
      });
    }
    return true;
  }

  findAllByEmail(email: string) {
    return this.prismaService.invite.findMany({
      where: {
        email,
      },
    });
  }
}
