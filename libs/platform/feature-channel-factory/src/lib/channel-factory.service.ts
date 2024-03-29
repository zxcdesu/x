import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  ChannelService,
  CreateChannelDto,
  HandleChannelDto,
  UpdateChannelDto,
} from '@zxcdesu/data-access-channel';
import { ThirdPartyApiFactoryService } from '@zxcdesu/feature-third-party-api-factory';

@Injectable()
export class ChannelFactoryService {
  constructor(
    private readonly channelService: ChannelService,
    private readonly thirdPartyApiFactoryService: ThirdPartyApiFactoryService,
  ) {}

  async create(projectId: number, payload: CreateChannelDto) {
    Object.assign(
      payload,
      await this.thirdPartyApiFactoryService
        .factory(payload)
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
        await this.thirdPartyApiFactoryService
          .factory(channel)
          .factoryChannel()
          .update(channel),
      );
    }
    return this.channelService.update(projectId, id, payload);
  }

  async remove(projectId: number, id: number) {
    const channel = await this.channelService.remove(projectId, id);
    await this.thirdPartyApiFactoryService
      .factory(channel)
      .factoryChannel()
      .remove(channel);
    return channel;
  }

  async handle(payload: HandleChannelDto) {
    throw new NotImplementedException({
      payload,
    });
  }
}
