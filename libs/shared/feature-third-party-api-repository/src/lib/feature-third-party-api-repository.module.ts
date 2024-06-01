import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './feature-third-party-api-repository.module-definition';
import { GatewayUrlProvider } from './third-party-api';
import { ThirdPartyApiRepositoryService } from './third-party-api-repository.service';

// TODO: global
@Global()
@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; PlatformService/1.0; +https://en.wikipedia.org/wiki/Webhook)',
      },
    }),
  ],
  providers: [ThirdPartyApiRepositoryService, GatewayUrlProvider],
  exports: [ThirdPartyApiRepositoryService],
})
export class FeatureThirdPartyApiRepositoryModule extends ConfigurableModuleClass {}
