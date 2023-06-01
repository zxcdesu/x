import { Module } from '@nestjs/common';
import { IntegrationController } from './integration/integration.controller';
import { IntegrationService } from './integration/integration.service';

@Module({
  imports: [],
  controllers: [IntegrationController],
  providers: [IntegrationService],
})
export class AppModule {}
