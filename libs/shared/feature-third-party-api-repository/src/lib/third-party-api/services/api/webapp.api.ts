import { NotImplementedException } from '@nestjs/common';
import { Content } from '../../interfaces';
import { ThirdPartyApi } from './interfaces';

export class WebappApi extends ThirdPartyApi {
  override init(subscribe = true): Promise<void> {
    throw new NotImplementedException();
  }

  override destroy(): Promise<void> {
    throw new NotImplementedException();
  }

  override sendMessage(externalId: string, content: Content): Promise<string> {
    throw new NotImplementedException();
  }

  override optIn(externalId: string): Promise<void> {
    throw new NotImplementedException();
  }

  override optOut(externalId: string): Promise<void> {
    throw new NotImplementedException();
  }

  override handleEvent(event: unknown): Promise<void> {
    throw new NotImplementedException();
  }
}
