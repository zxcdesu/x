import { NotImplementedException } from '@nestjs/common';
import {
  ChannelPayload,
  CreateChannelPayload,
  HandleChannelPayload,
  RemoveChannelPayload,
  UpdateChannelPayload,
} from '../../interfaces';
import { BaseChannelManager } from '../base-channel.manager';

export class WebappChannelManager extends BaseChannelManager {
  override create(
    payload: CreateChannelPayload<unknown>,
  ): Promise<ChannelPayload> {
    throw new NotImplementedException({
      payload,
    });
  }

  override update(
    payload: UpdateChannelPayload<unknown>,
  ): Promise<ChannelPayload> {
    throw new NotImplementedException({
      payload,
    });
  }

  override remove(
    payload: RemoveChannelPayload<unknown>,
  ): Promise<ChannelPayload> {
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
