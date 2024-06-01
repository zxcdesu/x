import { Module } from '@nestjs/common';
import { DataAccessChannelModule } from '@zxcdesu/data-access-channel';
import { DataAccessChatModule } from '@zxcdesu/data-access-chat';
import { ChatManager } from './chat.manager';

@Module({
  imports: [DataAccessChannelModule, DataAccessChatModule],
  providers: [ChatManager],
  exports: [ChatManager],
})
export class FeatureChatManagerModule {}
