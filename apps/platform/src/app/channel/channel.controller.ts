import { Controller } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  create() {
    return this.channelService.create();
  }

  findOne() {
    return this.channelService.findOne();
  }

  findAll() {
    return this.channelService.findAll();
  }

  update() {
    return this.channelService.update();
  }

  remove() {
    return this.channelService.remove();
  }
}
