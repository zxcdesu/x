import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  ChannelDto,
  ChannelService,
  CreateChannelDto,
  HandleChannelDto,
  UpdateChannelDto,
} from '@zxcdesu/data-access-channel';
import { ChannelFactoryService } from '@zxcdesu/feature-channel-factory';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
    private readonly channelFactoryService: ChannelFactoryService,
  ) {}

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'createChannel',
    queue: 'createChannel',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  async create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateChannelDto,
  ) {
    return this.channelFactoryService.create(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'findOneChannel',
    queue: 'findOneChannel',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.channelService.findOne(projectId, id);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'findAllChannels',
    queue: 'findAllChannels',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  findAll(@ProjectId() projectId: number) {
    return this.channelService.findAll(projectId);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'updateChannel',
    queue: 'updateChannel',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateChannelDto,
  ) {
    return this.channelFactoryService.update(projectId, id, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'removeChannel',
    queue: 'removeChannel',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.channelFactoryService.remove(projectId, id);
  }

  @RmqService.subscribe({
    exchange: 'platform',
    routingKey: 'handleChannel',
    queue: 'handleChannel',
  })
  handle(@RabbitPayload() payload: HandleChannelDto) {
    return this.channelFactoryService.handle(payload);
  }
}
