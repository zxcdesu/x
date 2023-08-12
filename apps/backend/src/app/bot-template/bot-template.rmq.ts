import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { BotTemplateDto } from './dto/bot-template.dto';
import { CreateBotTemplateDto } from './dto/create-bot-template.dto';
import { UpdateBotTemplateDto } from './dto/update-bot-template.dto';

@Injectable()
export class BotTemplateRmq extends RmqService {
  private readonly exchange = 'bots';

  create(payload: CreateBotTemplateDto) {
    return this.request<BotTemplateDto>({
      exchange: this.exchange,
      routingKey: 'createBotTemplate',
      payload,
    });
  }

  findOne(id: number) {
    return this.request<BotTemplateDto>({
      exchange: this.exchange,
      routingKey: 'findOneBotTemplate',
      payload: {
        id,
      },
    });
  }

  findAll(ids?: number[]) {
    return this.request<BotTemplateDto[]>({
      exchange: this.exchange,
      routingKey: 'findAllBotTemplates',
      payload: {
        ids,
      },
    });
  }

  update(payload: UpdateBotTemplateDto) {
    return this.request<BotTemplateDto>({
      exchange: this.exchange,
      routingKey: 'updateBotTemplate',
      payload,
    });
  }

  remove(id: number) {
    return this.request<BotTemplateDto>({
      exchange: this.exchange,
      routingKey: 'removeBotTemplate',
      payload: {
        id,
      },
    });
  }
}
