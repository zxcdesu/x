import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from '../../feature-third-party-api-repository.module-definition';
import { ThirdPartyApiRepositoryOptions } from '../../third-party-api-repository-options.interface';
import { UrlHelper } from '../helpers';

@Injectable()
export class GatewayUrlProvider {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: ThirdPartyApiRepositoryOptions,
  ) {}

  get(channelId: number): string {
    return UrlHelper.ensureTrailingSlash(this.options.gatewayUrl).concat(
      channelId.toString(),
    );
  }
}
