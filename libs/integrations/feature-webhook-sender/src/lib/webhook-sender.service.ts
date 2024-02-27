import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WebhookService } from '@zxcdesu/data-access-webhook';
import { lastValueFrom, retry, timer } from 'rxjs';
import { SendWebhooksDto } from './dto';

@Injectable()
export class WebhookSenderService {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly httpService: HttpService,
  ) {}

  async send(projectId: number, payload: SendWebhooksDto) {
    const webhooks = await this.webhookService.findAll(projectId, payload.type);
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
