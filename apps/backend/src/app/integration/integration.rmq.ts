import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateIntegrationArgs } from './dto/create-integration.args';
import { IntegrationObject } from './dto/integration.object';
import { UpdateIntegrationArgs } from './dto/update-integration.args';

@Injectable()
export class IntegrationRmq extends RmqService {
  create(projectId: number, payload: CreateIntegrationArgs) {
    return this.request<IntegrationObject>({
      exchange: 'integrations',
      routingKey: 'createIntegration',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<IntegrationObject>({
      exchange: 'integrations',
      routingKey: 'findOneIntegration',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number) {
    return this.request<IntegrationObject[]>({
      exchange: 'integrations',
      routingKey: 'findAllIntegrations',
      payload: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateIntegrationArgs) {
    return this.request<IntegrationObject>({
      exchange: 'integrations',
      routingKey: 'updateIntegration',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<IntegrationObject>({
      exchange: 'integrations',
      routingKey: 'removeIntegration',
      payload: {
        projectId,
        id,
      },
    });
  }
}
