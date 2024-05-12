import { Module } from '@nestjs/common';
import { PrismaIntegrationsModule } from '@zxcdesu/prisma-integration';
import { IntegrationService } from './integration.service';

@Module({
  imports: [PrismaIntegrationsModule],
  providers: [IntegrationService],
  exports: [IntegrationService],
})
export class DataAccessIntegrationModule {}
