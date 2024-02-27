import { Injectable } from '@nestjs/common';
import { PrismaService, WebhookType } from '@zxcdesu/prisma-integrations';
import { CreateWebhookDto, UpdateWebhookDto } from './dto';

@Injectable()
export class WebhookService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateWebhookDto) {
    return this.prismaService.webhook.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.webhook.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, type?: WebhookType) {
    return this.prismaService.webhook.findMany({
      where: {
        projectId,
        type,
      },
    });
  }

  update(projectId: number, id: number, payload: UpdateWebhookDto) {
    return this.prismaService.webhook.update({
      where: {
        projectId,
        id,
      },
      data: payload,
    });
  }

  remove(projectId: number, id: number) {
    return this.prismaService.webhook.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
