import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { IntegrationDto } from './dto/integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';

@Injectable()
export class IntegrationRmq extends RmqService {
  create(projectId: number, payload: CreateIntegrationDto) {
    return this.request<IntegrationDto>({
      exchange: 'integrations',
      routingKey: 'createIntegration',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<IntegrationDto>({
      exchange: 'integrations',
      routingKey: 'findOneIntegration',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<IntegrationDto[]>({
      exchange: 'integrations',
      routingKey: 'findAllIntegrations',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateIntegrationDto) {
    return this.request<IntegrationDto>({
      exchange: 'integrations',
      routingKey: 'updateIntegration',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<IntegrationDto>({
      exchange: 'integrations',
      routingKey: 'removeIntegration',
      payload: {
        projectId,
        id,
      },
    });
  }
}
