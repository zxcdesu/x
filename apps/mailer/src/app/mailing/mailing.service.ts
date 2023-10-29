import { BadRequestException, Injectable } from '@nestjs/common';
import { MailingStatus, PrismaService } from '../prisma.service';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Injectable()
export class MailingService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateMailingDto) {
    switch (payload.status) {
      case MailingStatus.Disabled:
      case MailingStatus.Scheduled:
        return this.prismaService.mailing.create({
          data: payload,
        });

      default:
        throw new BadRequestException();
    }
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.mailing.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
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

  async update(payload: UpdateMailingDto) {
    const mailing = await this.findOne(payload.projectId, payload.id);
    switch (mailing.status) {
      case MailingStatus.Disabled:
      case MailingStatus.Scheduled:
        return this.prismaService.mailing.update({
          where: {
            projectId_id: {
              projectId: payload.projectId,
              id: payload.id,
            },
          },
          data: payload,
        });

      default:
        throw new BadRequestException();
    }
  }

  async remove(projectId: number, id: number) {
    const mailing = await this.prismaService.mailing.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });

    if (mailing?.status === MailingStatus.Active) {
      // TODO: stop mailing
    }

    return mailing;
  }
}
