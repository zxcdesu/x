import { Injectable } from '@nestjs/common';
import { InviteService } from '@zxcdesu/data-access-invite';
import { PrismaService } from '@zxcdesu/prisma-auth';
import { hash } from 'argon2';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly inviteService: InviteService,
  ) {}

  async create(payload: CreateUserDto) {
    const invites = await this.inviteService.findAllByEmail(payload.email);
    return this.prismaService.user.create({
      data: {
        ...payload,
        password: await hash(payload.password),
        projects: {
          createMany: {
            data: invites.map(({ projectId }) => ({
              projectId,
            })),
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  findOneOrNullByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  update(id: number, payload: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
