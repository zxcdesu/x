import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import {
  CreateHistoryDto,
  HistoryDto,
  HistoryService,
} from '@zxcdesu/data-access-history';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { UserId } from '@zxcdesu/util-user';

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
  create(@RabbitPayload() payload: CreateHistoryDto): Promise<HistoryDto> {
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
  ): Promise<HistoryDto[]> {
    return this.historyService.findAll(projectId, userId);
  }
}
