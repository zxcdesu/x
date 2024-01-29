import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, retry, timer } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { ReceiveWebhookDto } from './dto/receive-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@Injectable()
export class WebhookService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

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

  async send(payload: ReceiveWebhookDto) {
    const webhooks = await this.prismaService.webhook.findMany({
      where: {
        projectId: payload.projectId,
        type: payload.type,
      },
    });

    await Promise.allSettled(
      webhooks.map((webhook) => {
        return lastValueFrom(
          this.httpService.post(webhook.url, payload.value).pipe(
            retry({
              count: 5,
              delay(_, retryCount) {
                return timer(1000 * retryCount);
              },
            }),
          ),
        );
      }),
    );
  }
}
