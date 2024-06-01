import { OnChat, OnHsm, OnMessage } from './third-party-api/interfaces';

export interface ThirdPartyApiRepositoryOptions {
  gatewayUrl: string;
  handlers: (OnChat | OnHsm | OnMessage)[];
}
