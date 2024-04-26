import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectRmq<
  T extends Partial<StringifyDate<ProjectDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'createProject',
      queue: 'createProject',
    });
  }

  create(userId: number, payload: CreateProjectDto) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'createProject',
      payload: {
        userId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'findOneProject',
      queue: 'findOneProject',
    });
  }

  findOne(userId: number, id: number) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'findOneProject',
      payload: {
        userId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'findAllProjects',
      queue: 'findAllProjects',
    });
  }

  findAll(userId: number) {
    return this.request<T[]>({
      exchange: 'account',
      routingKey: 'findAllProjects',
      payload: {
        userId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'updateProject',
      queue: 'updateProject',
    });
  }

  update(userId: number, id: number, payload: UpdateProjectDto) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'updateProject',
      payload: {
        userId,
        id,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'removeProject',
      queue: 'removeProject',
    });
  }

  remove(userId: number, id: number) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'removeProject',
      payload: {
        userId,
        id,
      },
    });
  }
}
