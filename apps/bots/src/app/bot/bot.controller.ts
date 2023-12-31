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
    routingKey: 'createBot',
    exchange: 'bots',
  })
  @SerializeOptions({
    type: BotDto,
  })
  create(@RabbitPayload() payload: CreateBotDto) {
    return this.botService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneBot',
    exchange: 'bots',
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
    routingKey: 'findAllBots',
    exchange: 'bots',
  })
  @SerializeOptions({
    type: BotDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.botService.findAll(projectId);
  }

  @RabbitRPC({
    routingKey: 'updateBot',
    exchange: 'bots',
  })
  @SerializeOptions({
    type: BotDto,
  })
  update(@RabbitPayload() payload: UpdateBotDto) {
    return this.botService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeBot',
    exchange: 'bots',
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
