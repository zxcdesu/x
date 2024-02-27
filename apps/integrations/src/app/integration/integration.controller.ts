import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateIntegrationDto,
  IntegrationDto,
  IntegrationService,
  UpdateIntegrationDto,
} from '@zxcdesu/data-access-integration';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @RmqService.rpc({
    exchange: 'integrations',
    routingKey: 'createIntegration',
    queue: 'createIntegration',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateIntegrationDto,
  ): Promise<IntegrationDto> {
    return this.integrationService.create(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'integrations',
    routingKey: 'findOneIntegration',
    queue: 'findOneIntegration',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<IntegrationDto> {
    return this.integrationService.findOne(projectId, id);
  }

  @RmqService.rpc({
    exchange: 'integrations',
    routingKey: 'findAllIntegrations',
    queue: 'findAllIntegrations',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  findAll(@ProjectId() projectId: number): Promise<IntegrationDto[]> {
    return this.integrationService.findAll(projectId);
  }

  @RmqService.rpc({
    exchange: 'integrations',
    routingKey: 'updateIntegration',
    queue: 'updateIntegration',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateIntegrationDto,
  ): Promise<IntegrationDto> {
    return this.integrationService.update(projectId, id, payload);
  }

  @RmqService.rpc({
    exchange: 'integrations',
    routingKey: 'removeIntegration',
    queue: 'removeIntegration',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<IntegrationDto> {
    return this.integrationService.remove(projectId, id);
  }
}
