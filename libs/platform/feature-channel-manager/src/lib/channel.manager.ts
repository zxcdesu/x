import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  ChannelService,
  CreateChannelDto,
  HandleChannelDto,
  UpdateChannelDto,
} from '@zxcdesu/data-access-channel';
import { ThirdPartyApiRepository } from '@zxcdesu/feature-third-party-api-repository';

@Injectable()
export class ChannelManager {
  constructor(
    private readonly channelService: ChannelService,
    private readonly thirdPartyApiRepository: ThirdPartyApiRepository,
  ) {}

  async create(projectId: number, payload: CreateChannelDto) {
    Object.assign(
      payload,
      await this.thirdPartyApiRepository
        .get(payload)
        .factoryChannel()
        .create(payload),
    );
    return this.channelService.create(projectId, payload);
  }

  async update(projectId: number, id: number, payload: UpdateChannelDto) {
    const channel = await this.channelService.findOne(projectId, id);
    if (
      typeof payload.externalId !== 'undefined' ||
      typeof payload.token !== 'undefined'
    ) {
      Object.assign(
        payload,
        await this.thirdPartyApiRepository
          .get(channel)
          .factoryChannel()
          .update(channel),
      );
    }
    return this.channelService.update(projectId, id, payload);
  }

  async remove(projectId: number, id: number) {
    const channel = await this.channelService.remove(projectId, id);
    await this.thirdPartyApiRepository
      .get(channel)
      .factoryChannel()
      .remove(channel);
    return channel;
  }

  async handle(
    projectId: number | undefined,
    id: number,
    payload: HandleChannelDto,
  ) {
    const channel = await this.channelService.findOneOrNull(projectId, id);
    if (channel) {
      return this.thirdPartyApiRepository
        .get(channel)
        .factoryChannel()
        .handle(payload, async (payload) => {
          throw new NotImplementedException({
            payload,
          });
        });
    }
  }
}
