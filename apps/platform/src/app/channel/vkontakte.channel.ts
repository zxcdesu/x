import { ChannelEvent } from '@platform/platform-type';
import { Channel, Prisma } from '../prisma.service';
import { AbstractChannel } from './abstract.channel';
import { NotImplementedException } from '@nestjs/common';

export class VkontakteChannel extends AbstractChannel {
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
