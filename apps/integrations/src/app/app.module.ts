import { Module } from '@nestjs/common';
import { PrismaService } from 'apps/integrations/prisma/prisma.service';
import { IntegrationController } from './integration/integration.controller';
import { IntegrationService } from './integration/integration.service';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookService } from './webhook/webhook.service';

@Module({
  imports: [],
  controllers: [IntegrationController, WebhookController],
  providers: [PrismaService, IntegrationService, WebhookService],
})
export class AppModule {}
