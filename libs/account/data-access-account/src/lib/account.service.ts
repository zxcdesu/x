import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-account';
import { AccountDto, CreateAccountDto, UpdateAccountDto } from './dto';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateAccountDto): Promise<AccountDto> {
    return this.prismaService.account.create({
      data: payload,
    });
  }

  findOne(id: string): Promise<AccountDto> {
    return this.prismaService.account.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  findAll(ids?: string[]): Promise<AccountDto[]> {
    return this.prismaService.account.findMany({
      where: ids && {
        id: {
          in: ids,
        },
      },
    });
  }

  update(id: string, payload: UpdateAccountDto): Promise<AccountDto> {
    return this.prismaService.account.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  remove(id: string): Promise<AccountDto> {
    return this.prismaService.account.delete({
      where: {
        id,
      },
    });
  }
}
