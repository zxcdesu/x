import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { BotTemplateService } from './bot-template.service';
import { BotTemplateDto } from './dto/bot-template.dto';
import { CreateBotTemplateDto } from './dto/create-bot-template.dto';
import { UpdateBotTemplate } from './dto/update-bot-template.dto';

@Controller()
export class BotTemplateController {
  constructor(private readonly botTemplateService: BotTemplateService) {}

  @RmqService.rpc({
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

  @RmqService.rpc({
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

  @RmqService.rpc({
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

  @RmqService.rpc({
    exchange: 'bots',
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
