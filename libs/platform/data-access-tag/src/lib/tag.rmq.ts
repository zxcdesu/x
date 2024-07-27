import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { CreateTagDto, TagDto, UpdateTagDto } from './dto';

@Injectable()
export class TagRmq<T extends Partial<TagDto>> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createTag',
      queue: 'createTag',
    });
  }

  create(projectId: number, payload: CreateTagDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createTag',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneTag',
      queue: 'findOneTag',
    });
  }

  findOne(projectId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneTag',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findAllTags',
      queue: 'findAllTags',
    });
  }

  findAll(projectId: number): Promise<T[]> {
    return this.request<T[]>({
      exchange: 'platform',
      routingKey: 'findAllTags',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'updateTag',
      queue: 'updateTag',
    });
  }

  update(projectId: number, id: number, payload: UpdateTagDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'updateTag',
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
      routingKey: 'removeTag',
      queue: 'removeTag',
    });
  }

  remove(projectId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeTag',
      payload: {
        projectId,
        id,
      },
    });
  }
}
