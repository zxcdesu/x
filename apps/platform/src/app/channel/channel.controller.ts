import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { WebhookPayload } from '@zxcdesu/platform-type';
import { ChannelService } from './channel.service';
import { ChannelDto } from './dto/channel.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'createChannel',
    queue: 'createChannel',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  create(@RabbitPayload() payload: CreateChannelDto) {
    return this.channelService.create(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'findOneChannel',
    queue: 'findOneChannel',
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
    exchange: 'platform',
    routingKey: 'findAllChannels',
    queue: 'findAllChannels',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.channelService.findAll(projectId);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'updateChannel',
    queue: 'updateChannel',
  })
  @SerializeOptions({
    type: ChannelDto,
  })
  update(@RabbitPayload() payload: UpdateChannelDto) {
    return this.channelService.update(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'removeChannel',
    queue: 'removeChannel',
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

  @RabbitSubscribe({
    exchange: 'platform',
    routingKey: 'handleWebhook',
    queue: 'handleWebhook',
  })
  handleWebhook(@RabbitPayload() event: WebhookPayload) {
    return this.channelService.handleWebhook(event);
  }
}
