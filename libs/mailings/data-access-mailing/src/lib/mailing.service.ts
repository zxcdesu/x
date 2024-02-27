import { BadRequestException, Injectable } from '@nestjs/common';
import { MailingStatus, PrismaService } from '@zxcdesu/prisma-mailings';
import { CreateMailingDto, UpdateMailingDto } from './dto';

@Injectable()
export class MailingService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateMailingDto) {
    return this.prismaService.mailing.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.mailing.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number) {
    return this.prismaService.mailing.findMany({
      where: {
        projectId,
      },
    });
  }

  async update(projectId: number, id: number, payload: UpdateMailingDto) {
    const mailing = await this.findOne(projectId, id);
    switch (mailing.status) {
      case MailingStatus.Disabled:
      case MailingStatus.Scheduled:
        return this.prismaService.mailing.update({
          where: {
            projectId,
            id,
          },
          data: payload,
        });

      default:
        throw new BadRequestException();
    }
  }

  async remove(projectId: number, id: number) {
    return this.prismaService.mailing.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
