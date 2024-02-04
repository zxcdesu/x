import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { BotTemplateService } from './bot-template.service';
import { BotTemplateDto } from './dto/bot-template.dto';
import { CreateBotTemplateDto } from './dto/create-bot-template.dto';
import { UpdateBotTemplate } from './dto/update-bot-template.dto';

@Controller()
export class BotTemplateController {
  constructor(private readonly botTemplateService: BotTemplateService) {}

  @RabbitRPC({
    exchange: 'bots',
    routingKey: 'createBotTemplate',
    queue: 'createBotTemplate',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  create(@RabbitPayload() payload: CreateBotTemplateDto) {
    return this.botTemplateService.create(payload);
  }

  @RabbitRPC({
    exchange: 'bots',
    routingKey: 'findOneBotTemplate',
    queue: 'findOneBotTemplate',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  findOne(@RabbitPayload('id', ParseIntPipe) id: number) {
    return this.botTemplateService.findOne(id);
  }

  @RabbitRPC({
    exchange: 'bots',
    routingKey: 'findAllBotTemplates',
    queue: 'findAllBotTemplates',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  findAll() {
    return this.botTemplateService.findAll();
  }

  @RabbitRPC({
    exchange: 'bots',
    routingKey: 'updateBotTemplate',
    queue: 'updateBotTemplate',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  update(@RabbitPayload() payload: UpdateBotTemplate) {
    return this.botTemplateService.update(payload);
  }

  @RabbitRPC({
    exchange: 'bots',
    routingKey: 'removeBotTemplate',
    queue: 'removeBotTemplate',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  remove(@RabbitPayload('id', ParseIntPipe) id: number) {
    return this.botTemplateService.remove(id);
  }
}
