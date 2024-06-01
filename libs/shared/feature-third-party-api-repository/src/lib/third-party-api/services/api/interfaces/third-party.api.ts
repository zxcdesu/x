import { HttpService } from '@nestjs/axios';
import { ThirdPartyApiRepositoryOptions } from '../../../../third-party-api-repository-options.interface';
import { Content, ThirdPartyApiCredentials } from '../../../interfaces';
import { GatewayUrlProvider } from '../../gateway-url.provider';

export abstract class ThirdPartyApi<T = unknown, E = unknown> {
  constructor(
    protected readonly options: Pick<
      ThirdPartyApiRepositoryOptions,
      'handlers'
    > & {
      credentials: ThirdPartyApiCredentials<T>;
    },
    protected readonly httpService: HttpService,
    protected readonly gatewayUrlProvider: GatewayUrlProvider,
  ) {}

  abstract init(subscribe?: boolean): Promise<void>;

  abstract destroy(): Promise<void>;

  abstract sendMessage(externalId: string, content: Content): Promise<string>;

  abstract optIn(externalId: string): Promise<void>;

  abstract optOut(externalId: string): Promise<void>;

  abstract handleEvent(event: E): Promise<void>;
}
