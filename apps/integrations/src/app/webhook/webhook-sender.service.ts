import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, retry, timer } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { SendWebhooksDto } from './dto/send-webhooks.dto';

@Injectable()
export class WebhookSenderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async send(projectId: number, payload: SendWebhooksDto) {
    const webhooks = await this.prismaService.webhook.findMany({
      where: {
        projectId,
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
