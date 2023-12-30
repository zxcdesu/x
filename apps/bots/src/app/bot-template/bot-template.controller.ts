import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { BotTemplateService } from './bot-template.service';
import { BotTemplateDto } from './dto/bot-template.dto';
import { CreateBotTemplateDto } from './dto/create-bot-template.dto';
import { UpdateBotTemplate } from './dto/update-bot-template.dto';

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
  create(@RabbitPayload() payload: CreateBotTemplateDto) {
    return this.botTemplateService.create(payload);
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
  update(@RabbitPayload() payload: UpdateBotTemplate) {
    return this.botTemplateService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeBotTemplate',
    exchange: 'bots',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  remove(@RabbitPayload('id', ParseIntPipe) id: number) {
    return this.botTemplateService.remove(id);
  }
}
