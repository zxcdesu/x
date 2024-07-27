import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RoleRmq<T extends Partial<RoleDto>> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createRole',
      queue: 'createRole',
    });
  }

  create(projectId: number, payload: CreateRoleDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createRole',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneRole',
      queue: 'findOneRole',
    });
  }

  findOne(projectId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneRole',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findAllRoles',
      queue: 'findAllRoles',
    });
  }

  findAll(projectId: number): Promise<T[]> {
    return this.request<T[]>({
      exchange: 'platform',
      routingKey: 'findAllRoles',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'updateRole',
      queue: 'updateRole',
    });
  }

  update(projectId: number, id: number, payload: UpdateRoleDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'updateRole',
      payload: {
        projectId,
        id,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'removeRole',
      queue: 'removeRole',
    });
  }

  remove(projectId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeRole',
      payload: {
        projectId,
        id,
      },
    });
  }
}
