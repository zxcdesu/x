import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-account';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateUserDto): Promise<UserDto> {
    return this.prismaService.user.create({
      data: payload,
    });
  }

  findOne(id: number): Promise<UserDto> {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  findAll(ids?: number[]): Promise<UserDto[]> {
    return this.prismaService.user.findMany({
      where: ids && {
        id: {
          in: ids,
        },
      },
    });
  }

  update(id: number, payload: UpdateUserDto): Promise<UserDto> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  remove(id: number): Promise<UserDto> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
