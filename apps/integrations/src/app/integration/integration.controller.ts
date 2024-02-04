import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import {
  Controller,
  ParseIntPipe,
  ParseUUIDPipe,
  SerializeOptions,
} from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { IntegrationDto } from './dto/integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { IntegrationService } from './integration.service';

@Controller()
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'createIntegration',
    queue: 'integrations.createIntegration',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  create(@RabbitPayload() payload: CreateIntegrationDto) {
    return this.integrationService.create(payload);
  }

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'findOneIntegration',
    queue: 'integrations.findOneIntegration',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  findOne(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseUUIDPipe) id: string,
  ) {
    return this.integrationService.findOne(projectId, id);
  }

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'findAllIntegrations',
    queue: 'integrations.findAllIntegrations',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.integrationService.findAll(projectId);
  }

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'updateIntegration',
    queue: 'integrations.updateIntegration',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  update(@RabbitPayload() payload: UpdateIntegrationDto) {
    return this.integrationService.update(payload);
  }

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'removeIntegration',
    queue: 'integrations.removeIntegration',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseUUIDPipe) id: string,
  ) {
    return this.integrationService.remove(projectId, id);
  }
}
