import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { BotDto } from './dto/bot.dto';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotRmq extends RmqService {
  private readonly exchange = 'bots';

  create(projectId: number, payload: CreateBotDto) {
    return this.request<BotDto>({
      exchange: this.exchange,
      routingKey: 'createBot',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<BotDto>({
      exchange: this.exchange,
      routingKey: 'findOneBot',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<BotDto[]>({
      exchange: this.exchange,
      routingKey: 'findAllBots',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateBotDto) {
    return this.request<BotDto>({
      exchange: this.exchange,
      routingKey: 'updateBot',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<BotDto>({
      exchange: this.exchange,
      routingKey: 'removeBot',
      payload: {
        projectId,
        id,
      },
    });
  }
}
