import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

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

  findAll(projectId: number) {
    return this.prismaService.webhook.findMany({
      where: {
        projectId,
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
