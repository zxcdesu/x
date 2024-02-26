import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { BotDto } from './dto/bot.dto';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotRmq extends RmqService {
  create(projectId: number, payload: CreateBotDto) {
    return this.request<BotDto>({
      exchange: 'bots',
      routingKey: 'createBot',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<BotDto>({
      exchange: 'bots',
      routingKey: 'findOneBot',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<BotDto[]>({
      exchange: 'bots',
      routingKey: 'findAllBots',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateBotDto) {
    return this.request<BotDto>({
      exchange: 'bots',
      routingKey: 'updateBot',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<BotDto>({
      exchange: 'bots',
      routingKey: 'removeBot',
      payload: {
        projectId,
        id,
      },
    });
  }
}
