import { Module } from '@nestjs/common';
import { IntegrationController } from './integration/integration.controller';
import { IntegrationService } from './integration/integration.service';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookService } from './webhook/webhook.service';

@Module({
  imports: [],
  controllers: [IntegrationController, WebhookController],
  providers: [IntegrationService, WebhookService],
})
export class AppModule {}
