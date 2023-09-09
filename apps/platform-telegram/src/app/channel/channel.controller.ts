import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { CreateChannel } from '@platform/platform-type';
import { ChannelService } from './channel.service';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @RabbitRPC({
    routingKey: 'createChannel',
    exchange: 'platform-telegram',
  })
  create(@RabbitPayload() payload: CreateChannel<string>) {
    return this.channelService.create(payload);
  }
}
