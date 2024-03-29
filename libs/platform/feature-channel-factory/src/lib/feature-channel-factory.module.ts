import { Module } from '@nestjs/common';
import { DataAccessChannelModule } from '@zxcdesu/data-access-channel';
import { FeatureThirdPartyApiFactoryModule } from '@zxcdesu/feature-third-party-api-factory';
import { ChannelFactoryService } from './channel-factory.service';

@Module({
  imports: [DataAccessChannelModule, FeatureThirdPartyApiFactoryModule],
  providers: [ChannelFactoryService],
  exports: [ChannelFactoryService],
})
export class FeatureChannelFactoryModule {}
