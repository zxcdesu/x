import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@zxcdesu/prisma-account';
import { hash } from 'argon2';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    payload: CreateUserDto,
    invites?: Prisma.ProjectUserUncheckedCreateWithoutUserInput[],
  ) {
    return this.prismaService.user.create({
      data: {
        ...payload,
        password: await hash(payload.password),
        projects: invites && {
          createMany: {
            data: invites.map(({ projectId, roles }) => ({
              projectId,
              roles,
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

  findOneOrDefaultByEmail(email: string) {
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
