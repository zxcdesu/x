import { Module } from '@nestjs/common';
import { DataAccessChannelModule } from '@zxcdesu/data-access-channel';
import { ChannelManager } from './channel.manager';

@Module({
  imports: [DataAccessChannelModule],
  providers: [ChannelManager],
  exports: [ChannelManager],
})
export class FeatureChannelManagerModule {}
