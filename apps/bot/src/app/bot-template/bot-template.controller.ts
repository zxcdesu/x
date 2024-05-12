import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  BotTemplateDto,
  BotTemplateService,
  CreateBotTemplateDto,
  UpdateBotTemplate,
} from '@zxcdesu/data-access-bot-template';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class BotTemplateController {
  constructor(private readonly botTemplateService: BotTemplateService) {}

  @RmqService.rpc({
    exchange: 'bot',
    routingKey: 'createBotTemplate',
    queue: 'createBotTemplate',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  create(@RabbitPayload() payload: CreateBotTemplateDto) {
    return this.botTemplateService.create(payload);
  }

  @RmqService.rpc({
    exchange: 'bot',
    routingKey: 'findOneBotTemplate',
    queue: 'findOneBotTemplate',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  findOne(@RabbitPayload('id', ParseIntPipe) id: number) {
    return this.botTemplateService.findOne(id);
  }

  @RmqService.rpc({
    exchange: 'bot',
    routingKey: 'findAllBotTemplates',
    queue: 'findAllBotTemplates',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  findAll() {
    return this.botTemplateService.findAll();
  }

  @RmqService.rpc({
    exchange: 'bot',
    routingKey: 'updateBotTemplate',
    queue: 'updateBotTemplate',
  })
  @SerializeOptions({
    type: BotTemplateDto,
  })
  update(
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateBotTemplate,
  ) {
    return this.botTemplateService.update(id, payload);
  }

  @RmqService.rpc({
    exchange: 'bot',
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
