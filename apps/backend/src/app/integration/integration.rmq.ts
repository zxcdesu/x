import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
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
        projectId,
        ...payload,
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

  findAll(projectId: number) {
    return this.request<IntegrationDto[]>({
      exchange: 'integrations',
      routingKey: 'findAllIntegrations',
      payload: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateIntegrationDto) {
    return this.request<IntegrationDto>({
      exchange: 'integrations',
      routingKey: 'updateIntegration',
      payload: {
        projectId,
        ...payload,
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
