import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { RoleUserDto } from './dto';

@Injectable()
export class RoleUserRmq<T extends Partial<RoleUserDto>> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createRoleUser',
      queue: 'createRoleUser',
    });
  }

  create(projectId: number, userId: number, roleId: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createRoleUser',
      payload: {
        projectId,
        userId,
        roleId,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findAllRoleUsers',
      queue: 'findAllRoleUsers',
    });
  }

  findAll(projectId: number, userId?: number, roleId?: number): Promise<T[]> {
    return this.request<T[]>({
      exchange: 'platform',
      routingKey: 'findAllRoleUsers',
      payload: {
        projectId,
        userId,
        roleId,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'removeRoleUser',
      queue: 'removeRoleUser',
    });
  }

  remove(projectId: number, userId: number, roleId: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeRoleUser',
      payload: {
        projectId,
        userId,
        roleId,
      },
    });
  }
}
