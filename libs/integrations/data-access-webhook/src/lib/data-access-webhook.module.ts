import { Module } from '@nestjs/common';
import { PrismaIntegrationsModule } from '@zxcdesu/prisma-integrations';
import { WebhookService } from './webhook.service';

@Module({
  imports: [PrismaIntegrationsModule],
  providers: [WebhookService],
  exports: [WebhookService],
})
export class DataAccessWebhookModule {}
