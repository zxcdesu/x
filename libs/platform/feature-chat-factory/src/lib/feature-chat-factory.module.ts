import { Module } from '@nestjs/common';
import { DataAccessChannelModule } from '@zxcdesu/data-access-channel';
import { DataAccessChatModule } from '@zxcdesu/data-access-chat';
import { FeatureThirdPartyApiFactoryModule } from '@zxcdesu/feature-third-party-api-factory';
import { ChatFactoryService } from './chat-factory.service';

@Module({
  imports: [
    DataAccessChannelModule,
    DataAccessChatModule,
    FeatureThirdPartyApiFactoryModule,
  ],
  providers: [ChatFactoryService],
  exports: [ChatFactoryService],
})
export class FeatureChatFactoryModule {}
