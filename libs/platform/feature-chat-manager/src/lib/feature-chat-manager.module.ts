import { Module } from '@nestjs/common';
import { DataAccessChannelModule } from '@zxcdesu/data-access-channel';
import { DataAccessChatModule } from '@zxcdesu/data-access-chat';
import { FeatureThirdPartyApiRepositoryModule } from '@zxcdesu/feature-third-party-api-repository';
import { ChatManager } from './chat.manager';

@Module({
  imports: [
    DataAccessChannelModule,
    DataAccessChatModule,
    FeatureThirdPartyApiRepositoryModule,
  ],
  providers: [ChatManager],
  exports: [ChatManager],
})
export class FeatureChatManagerModule {}
