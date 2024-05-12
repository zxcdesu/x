import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DataAccessWebhookModule } from '@zxcdesu/data-access-webhook';
import { WebhookSenderService } from './webhook-sender.service';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; WebhookSenderService/1.0; +https://en.wikipedia.org/wiki/Webhook)',
      },
    }),
    DataAccessWebhookModule,
  ],
  providers: [WebhookSenderService],
  exports: [WebhookSenderService],
})
export class FeatureWebhookSenderModule {}
