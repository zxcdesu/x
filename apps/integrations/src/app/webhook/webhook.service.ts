import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@Injectable()
export class WebhookService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateWebhookDto) {
    return this.prismaService.webhook.create({
      data: payload,
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.webhook.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }

  findAll(projectId: number) {
    return this.prismaService.webhook.findMany({
      where: {
        projectId,
      },
    });
  }

  update(payload: UpdateWebhookDto) {
    return this.prismaService.webhook.update({
      where: {
        projectId_id: {
          projectId: payload.projectId,
          id: payload.id,
        },
      },
      data: payload,
    });
  }

  remove(projectId: number, id: number) {
    return this.prismaService.webhook.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }
}
