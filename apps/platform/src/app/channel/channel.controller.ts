import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { ChannelEvent, ChannelEventRmq } from '@platform/platform-type';
import { ChannelService } from './channel.service';
import { ChannelDto } from './dto/channel.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @RabbitRPC({
    routingKey: 'createChannel',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  create(@RabbitPayload() payload: CreateChannelDto) {
    return this.channelService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneChannel',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  findOne(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.channelService.findOne(projectId, id);
  }

  @RabbitRPC({
    routingKey: 'findAllChannels',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.channelService.findAll(projectId);
  }

  @RabbitRPC({
    routingKey: 'updateChannel',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  update(@RabbitPayload() payload: UpdateChannelDto) {
    return this.channelService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeChannel',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.channelService.remove(projectId, id);
  }

  @ChannelEventRmq.subscribeEvent()
  handleEvent(@RabbitPayload() event: ChannelEvent) {
    return this.channelService.handleEvent(event);
  }
}
