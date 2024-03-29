import { Module } from '@nestjs/common';
import { DataAccessChannelModule } from '@zxcdesu/data-access-channel';
import { DataAccessChatModule } from '@zxcdesu/data-access-chat';
import { DataAccessMessageModule } from '@zxcdesu/data-access-message';
import { FeatureThirdPartyApiFactoryModule } from '@zxcdesu/feature-third-party-api-factory';
import { MessageFactoryService } from './message-factory.service';

@Module({
  imports: [
    DataAccessChannelModule,
    DataAccessChatModule,
    DataAccessMessageModule,
    FeatureThirdPartyApiFactoryModule,
  ],
  providers: [MessageFactoryService],
  exports: [MessageFactoryService],
})
export class FeatureMessageFactoryModule {}
