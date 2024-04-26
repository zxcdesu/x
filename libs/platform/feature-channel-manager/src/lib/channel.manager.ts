import { Injectable } from '@nestjs/common';
import {
  ChannelDto,
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
    const channel = await this.channelService.create(projectId, payload);
    Object.assign(
      payload,
      await this.thirdPartyApiRepository
        .getOrThrow(channel)
        .factoryChannel()
        .upsert({
          id: channel.id,
        }),
    );
    return this.channelService.update(projectId, channel.id, payload);
  }

  async update(projectId: number, id: number, payload: UpdateChannelDto) {
    const channel = await this.channelService.findOne(projectId, id);
    Object.assign(
      payload,
      await this.thirdPartyApiRepository
        .getOrThrow(channel)
        .factoryChannel()
        .upsert({
          id: channel.id,
        }),
    );
    return this.channelService.update(projectId, id, payload);
  }

  async remove(projectId: number, id: number) {
    const channel = await this.channelService.remove(projectId, id);
    await this.thirdPartyApiRepository
      .getOrThrow(channel)
      .factoryChannel()
      .remove(channel);
    return channel;
  }

  async handle(
    projectId: number | undefined,
    id: number,
    payload: HandleChannelDto,
    handle: (payload: unknown, channel: ChannelDto) => Promise<void>,
  ) {
    const channel = await this.channelService.findOneOrDefault(projectId, id);
    if (channel) {
      return this.thirdPartyApiRepository
        .getOrThrow(channel)
        .factoryChannel()
        .handle(payload, (payload) => handle(payload, channel));
    }
  }
}
