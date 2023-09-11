import { NotImplementedException } from '@nestjs/common';
import { ChannelEvent } from '@platform/platform-type';
import { Channel, Prisma } from '../prisma.service';
import { AbstractChannel } from './abstract.channel';

export class GupshupChannel extends AbstractChannel {
  create(
    channel: Channel,
  ): Promise<Partial<Prisma.ChannelUncheckedUpdateInput>> {
    throw new NotImplementedException();
  }

  event(
    channel: Channel,
    payload: ChannelEvent<unknown, unknown>,
  ): Promise<void> {
    throw new NotImplementedException();
  }
}
