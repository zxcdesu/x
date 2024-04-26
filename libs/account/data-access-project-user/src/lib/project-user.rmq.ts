import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { ProjectUserDto, UpdateProjectUserDto } from './dto';

@Injectable()
export class ProjectUserRmq<
  T extends Partial<StringifyDate<ProjectUserDto>>,
> extends RmqFactory {
  static findOne() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'findOneProjectUser',
      queue: 'findOneProjectUser',
    });
  }

  findOne(projectId: number, userId: number) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'findOneProjectUser',
      payload: {
        projectId,
        userId,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'findAllProjectUsers',
      queue: 'findAllProjectUsers',
    });
  }

  findAll(projectId: number) {
    return this.request<T[]>({
      exchange: 'account',
      routingKey: 'findAllProjectUsers',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'updateProjectUser',
      queue: 'updateProjectUser',
    });
  }

  update(projectId: number, userId: number, payload: UpdateProjectUserDto) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'updateProjectUser',
      payload: {
        projectId,
        userId,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'removeProjectUser',
      queue: 'removeProjectUser',
    });
  }

  remove(projectId: number, userId: number) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'removeProjectUser',
      payload: {
        projectId,
        userId,
      },
    });
  }
}
