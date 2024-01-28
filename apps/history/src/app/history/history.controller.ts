import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryDto } from './dto/history.dto';
import { HistoryService } from './history.service';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @RabbitRPC({
    routingKey: 'createHistory',
    exchange: 'history',
  })
  @SerializeOptions({
    type: HistoryDto,
  })
  create(@RabbitPayload() payload: CreateHistoryDto) {
    return this.historyService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findAllHistories',
    exchange: 'history',
  })
  @SerializeOptions({
    type: HistoryDto,
  })
  findAll(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('userId', ParseIntPipe) userId: number,
  ) {
    return this.historyService.findAll(projectId, userId);
  }
}
