import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { ChannelDto } from './dto/channel.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelRmq extends RmqService {
  create(projectId: number, payload: CreateChannelDto) {
    return this.request<ChannelDto>({
      exchange: 'platform',
      routingKey: 'createChannel',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<ChannelDto>({
      exchange: 'platform',
      routingKey: 'findOneChannel',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<ChannelDto[]>({
      exchange: 'platform',
      routingKey: 'findAllChannels',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateChannelDto) {
    return this.request<ChannelDto>({
      exchange: 'platform',
      routingKey: 'updateChannel',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<ChannelDto>({
      exchange: 'platform',
      routingKey: 'removeChannel',
      payload: {
        projectId,
        id,
      },
    });
  }
}
