import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { UserId } from '@zxcdesu/util-user';
import { History } from '../prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryDto } from './dto/history.dto';
import { HistoryService } from './history.service';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @RmqService.subscribe({
    exchange: 'history',
    routingKey: 'createHistory',
    queue: 'createHistory',
  })
  @SerializeOptions({
    type: HistoryDto,
  })
  create(@RabbitPayload() payload: CreateHistoryDto): Promise<History> {
    return this.historyService.create(payload);
  }

  @RmqService.rpc({
    exchange: 'history',
    routingKey: 'findAllHistories',
    queue: 'findAllHistories',
  })
  @SerializeOptions({
    type: HistoryDto,
  })
  findAll(
    @ProjectId() projectId: number,
    @UserId() userId: number,
  ): Promise<History[]> {
    return this.historyService.findAll(projectId, userId);
  }
}
