import { Module } from '@nestjs/common';
import { DataAccessChannelModule } from '@zxcdesu/data-access-channel';
import { FeatureThirdPartyApiRepositoryModule } from '@zxcdesu/feature-third-party-api-repository';
import { ChannelManager } from './channel.manager';

@Module({
  imports: [DataAccessChannelModule, FeatureThirdPartyApiRepositoryModule],
  providers: [ChannelManager],
  exports: [ChannelManager],
})
export class FeatureChannelManagerModule {}
