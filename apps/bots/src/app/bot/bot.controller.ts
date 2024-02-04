import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { BotService } from './bot.service';
import { BotDto } from './dto/bot.dto';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Controller()
export class BotController {
  constructor(private readonly botService: BotService) {}

  @RabbitRPC({
    exchange: 'bots',
    routingKey: 'createBot',
    queue: 'bots.createBot',
  })
  @SerializeOptions({
    type: BotDto,
  })
  create(@RabbitPayload() payload: CreateBotDto) {
    return this.botService.create(payload);
  }

  @RabbitRPC({
    exchange: 'bots',
    routingKey: 'findOneBot',
    queue: 'bots.findOneBot',
  })
  @SerializeOptions({
    type: BotDto,
  })
  findOne(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.botService.findOne(projectId, id);
  }

  @RabbitRPC({
    exchange: 'bots',
    routingKey: 'findAllBots',
    queue: 'bots.findAllBots',
  })
  @SerializeOptions({
    type: BotDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.botService.findAll(projectId);
  }

  @RabbitRPC({
    exchange: 'bots',
    routingKey: 'updateBot',
    queue: 'bots.updateBot',
  })
  @SerializeOptions({
    type: BotDto,
  })
  update(@RabbitPayload() payload: UpdateBotDto) {
    return this.botService.update(payload);
  }

  @RabbitRPC({
    exchange: 'bots',
    routingKey: 'removeBot',
    queue: 'bots.removeBot',
  })
  @SerializeOptions({
    type: BotDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.botService.remove(projectId, id);
  }
}
