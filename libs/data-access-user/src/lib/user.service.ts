import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-auth';
import { hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateUserDto) {
    const invites = await this.prismaService.invite.findMany({
      where: {
        email: payload.email,
      },
    });

    return this.prismaService.user.create({
      data: {
        ...payload,
        password: await hash(payload.password, 10),
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

  findOneByEmail(email: string) {
    return this.prismaService.user.findUniqueOrThrow({
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
