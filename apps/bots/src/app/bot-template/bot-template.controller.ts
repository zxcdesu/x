import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { BotTemplateService } from './bot-template.service';
import { BotTemplateDto } from './dto/bot-template.dto';

@Controller()
export class BotTemplateController {
  constructor(private readonly botTemplateService: BotTemplateService) {}

  @RabbitRPC({
    routingKey: 'createBotTemplate',
    exchange: 'bots',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  create() {
    return this.botTemplateService.create();
  }

  @RabbitRPC({
    routingKey: 'findOneBotTemplate',
    exchange: 'bots',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  findOne(@RabbitPayload('id', ParseIntPipe) id: number) {
    return this.botTemplateService.findOne(id);
  }

  @RabbitRPC({
    routingKey: 'findAllBotTemplates',
    exchange: 'bots',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  findAll() {
    return this.botTemplateService.findAll();
  }

  @RabbitRPC({
    routingKey: 'updateBotTemplate',
    exchange: 'bots',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  update() {
    return this.botTemplateService.update();
  }

  @RabbitRPC({
    routingKey: 'removeBotTemplate',
    exchange: 'bots',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  remove() {
    return this.botTemplateService.remove();
  }
}
