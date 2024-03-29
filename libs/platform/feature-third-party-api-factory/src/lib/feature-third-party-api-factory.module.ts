import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ThirdPartyApiFactoryService } from './third-party-api-factory.service';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; PlatformService/1.0; +https://en.wikipedia.org/wiki/Webhook)',
      },
    }),
  ],
  providers: [ThirdPartyApiFactoryService],
  exports: [ThirdPartyApiFactoryService],
})
export class FeatureThirdPartyApiFactoryModule {}
