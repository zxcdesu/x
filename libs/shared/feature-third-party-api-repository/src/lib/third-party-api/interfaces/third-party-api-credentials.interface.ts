import { ThirdPartyApiType } from '../enums/third-party-api-type.enum';

export interface ThirdPartyApiCredentials<T = unknown> {
  id: number;
  type: ThirdPartyApiType;
  externalId: string;
  token: T;
}
