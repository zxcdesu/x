import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { CreateHsmDto } from './dto/create-hsm.dto';
import { HsmDto } from './dto/hsm.dto';
import { UpdateHsmDto } from './dto/update-hsm.dto';

@Injectable()
export class HsmRmq extends RmqService {
  create(projectId: number, payload: CreateHsmDto) {
    return this.request<HsmDto>({
      exchange: 'platform',
      routingKey: 'createHsm',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<HsmDto>({
      exchange: 'platform',
      routingKey: 'findOneHsm',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<HsmDto[]>({
      exchange: 'platform',
      routingKey: 'findAllHsm',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateHsmDto) {
    return this.request<HsmDto>({
      exchange: 'platform',
      routingKey: 'updateHsm',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<HsmDto>({
      exchange: 'platform',
      routingKey: 'removeHsm',
      payload: {
        projectId,
        id,
      },
    });
  }
}
