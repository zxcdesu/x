import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectRmq<T extends Partial<ProjectDto>> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createProject',
      queue: 'createProject',
    });
  }

  create(userId: number, payload: CreateProjectDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createProject',
      payload: {
        userId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneProject',
      queue: 'findOneProject',
    });
  }

  findOne(userId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneProject',
      payload: {
        userId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findAllProjects',
      queue: 'findAllProjects',
    });
  }

  findAll(userId: number): Promise<T[]> {
    return this.request<T[]>({
      exchange: 'platform',
      routingKey: 'findAllProjects',
      payload: {
        userId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'updateProject',
      queue: 'updateProject',
    });
  }

  update(userId: number, id: number, payload: UpdateProjectDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
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
      exchange: 'platform',
      routingKey: 'removeProject',
      queue: 'removeProject',
    });
  }

  remove(userId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeProject',
      payload: {
        userId,
        id,
      },
    });
  }
}
