import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './feature-third-party-api-repository.module-definition';
import {
  GatewayUrlProvider,
  GupshupApi,
  InstagramApi,
  TelegramApi,
  ThirdPartyApi,
  ThirdPartyApiCredentials,
  ThirdPartyApiType,
  UnknownThirdPartyApiException,
  ViberApi,
  VkontakteApi,
  WebappApi,
} from './third-party-api';
import { ThirdPartyApiRepositoryOptions } from './third-party-api-repository-options.interface';

@Injectable()
export class ThirdPartyApiRepositoryService
  implements Record<ThirdPartyApiType, typeof ThirdPartyApi<unknown, unknown>>
{
  [ThirdPartyApiType.Gupshup] = GupshupApi;
  [ThirdPartyApiType.Instagram] = InstagramApi;
  [ThirdPartyApiType.Telegram] = TelegramApi;
  [ThirdPartyApiType.Viber] = ViberApi;
  [ThirdPartyApiType.Vkontakte] = VkontakteApi;
  [ThirdPartyApiType.Webapp] = WebappApi;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: ThirdPartyApiRepositoryOptions,
    private readonly httpService: HttpService,
    private readonly gatewayUrlProvider: GatewayUrlProvider,
  ) {}

  factory(credentials: ThirdPartyApiCredentials): ThirdPartyApi {
    if (!this[credentials.type]) {
      throw new UnknownThirdPartyApiException();
    }

    return new this[credentials.type](
      {
        handlers: this.options.handlers,
        credentials,
      },
      this.httpService,
      this.gatewayUrlProvider,
    );
  }
}
