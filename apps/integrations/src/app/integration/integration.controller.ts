import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import {
  Controller,
  ParseIntPipe,
  ParseUUIDPipe,
  SerializeOptions,
} from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { IntegrationDto } from './dto/integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { IntegrationService } from './integration.service';

@Controller()
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @RabbitRPC({
    routingKey: 'createIntegration',
    exchange: 'integrations',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  create(@RabbitPayload() payload: CreateIntegrationDto) {
    return this.integrationService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneIntegration',
    exchange: 'integrations',
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
    routingKey: 'findAllIntegrations',
    exchange: 'integrations',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.integrationService.findAll(projectId);
  }

  @RabbitRPC({
    routingKey: 'updateIntegration',
    exchange: 'integrations',
  })
  @SerializeOptions({
    type: IntegrationDto,
  })
  update(@RabbitPayload() payload: UpdateIntegrationDto) {
    return this.integrationService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeIntegration',
    exchange: 'integrations',
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
