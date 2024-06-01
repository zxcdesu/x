import { Module } from '@nestjs/common';
import { DataAccessChannelModule } from '@zxcdesu/data-access-channel';
import { DataAccessChatModule } from '@zxcdesu/data-access-chat';
import { DataAccessMessageModule } from '@zxcdesu/data-access-message';
import { MessageManager } from './message.manager';

@Module({
  imports: [
    DataAccessChannelModule,
    DataAccessChatModule,
    DataAccessMessageModule,
  ],
  providers: [MessageManager],
  exports: [MessageManager],
})
export class FeatureMessageManagerModule {}
