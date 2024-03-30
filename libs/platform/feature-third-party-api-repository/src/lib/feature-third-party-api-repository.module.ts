import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ThirdPartyApiRepository } from './third-party-api.repository';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; PlatformService/1.0; +https://en.wikipedia.org/wiki/Webhook)',
      },
    }),
  ],
  providers: [ThirdPartyApiRepository],
  exports: [ThirdPartyApiRepository],
})
export class FeatureThirdPartyApiRepositoryModule {}
