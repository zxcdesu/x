import { NotImplementedException } from '@nestjs/common';
import {
  ChannelPayload,
  HandleChannelPayload,
  RemoveChannelPayload,
  UpsertChannelPayload,
} from '../../interfaces';
import { BaseChannelManager } from '../base-channel.manager';

export class InstagramChannelManager extends BaseChannelManager {
  override upsert(payload: UpsertChannelPayload): Promise<ChannelPayload> {
    throw new NotImplementedException({
      payload,
    });
  }

  override remove(payload: RemoveChannelPayload): Promise<void> {
    throw new NotImplementedException({
      payload,
    });
  }

  override handle(
    payload: HandleChannelPayload<unknown>,
    handle: (payload: unknown) => Promise<void>,
  ): Promise<void> {
    handle(payload);
    throw new NotImplementedException({
      payload,
    });
  }
}
