import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateUserDto,
  FindOneUserDto,
  RemoveUserDto,
  UpdateUserDto,
} from './user.dto';

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

  findOne(payload: FindOneUserDto) {
    return this.prismaService.user.findUniqueOrThrow({
      where: payload,
    });
  }

  update(payload: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id: payload.id,
      },
      data: payload,
    });
  }

  remove(payload: RemoveUserDto) {
    return this.prismaService.user.delete({
      where: payload,
    });
  }
}
