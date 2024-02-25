import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { BotService } from './bot.service';
import { BotDto } from './dto/bot.dto';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Controller()
export class BotController {
  constructor(private readonly botService: BotService) {}

  @RmqService.rpc({
    exchange: 'bots',
    routingKey: 'createBot',
    queue: 'createBot',
  })
  @SerializeOptions({
    type: BotDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateBotDto,
  ) {
    return this.botService.create(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'bots',
    routingKey: 'findOneBot',
    queue: 'findOneBot',
  })
  @SerializeOptions({
    type: BotDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.botService.findOne(projectId, id);
  }

  @RmqService.rpc({
    exchange: 'bots',
    routingKey: 'findAllBots',
    queue: 'findAllBots',
  })
  @SerializeOptions({
    type: BotDto,
  })
  findAll(@ProjectId() projectId: number) {
    return this.botService.findAll(projectId);
  }

  @RmqService.rpc({
    exchange: 'bots',
    routingKey: 'updateBot',
    queue: 'updateBot',
  })
  @SerializeOptions({
    type: BotDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateBotDto,
  ) {
    return this.botService.update(projectId, id, payload);
  }

  @RmqService.rpc({
    exchange: 'bots',
    routingKey: 'removeBot',
    queue: 'removeBot',
  })
  @SerializeOptions({
    type: BotDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.botService.remove(projectId, id);
  }
}
