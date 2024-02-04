import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Mailing, MailingStatus, PrismaService } from '../prisma.service';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Injectable()
export class MailingService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async create(payload: CreateMailingDto) {
    return this.start(
      await this.prismaService.mailing.create({
        data: payload,
      }),
    );
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
        return this.start(
          await this.prismaService.mailing.update({
            where: {
              projectId_id: {
                projectId: payload.projectId,
                id: payload.id,
              },
            },
            data: payload,
          }),
        );

      default:
        throw new BadRequestException();
    }
  }

  async remove(projectId: number, id: number) {
    return this.stop(
      await this.prismaService.mailing.delete({
        where: {
          projectId_id: {
            projectId,
            id,
          },
        },
      }),
    );
  }

  private async start(mailing: Mailing) {
    await this.amqpConnection.publish('mailer.worker', 'start', mailing);
    return mailing;
  }

  private async stop(mailing: Mailing) {
    await this.amqpConnection.publish('mailer.worker', 'stop', mailing);
    return mailing;
  }
}
