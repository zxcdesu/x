import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagRmq extends RmqService {
  create(projectId: number, payload: CreateTagDto) {
    return this.request<TagDto>({
      exchange: 'platform',
      routingKey: 'createTag',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<TagDto>({
      exchange: 'platform',
      routingKey: 'findOneTag',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<TagDto[]>({
      exchange: 'platform',
      routingKey: 'findAllTags',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateTagDto) {
    return this.request<TagDto>({
      exchange: 'platform',
      routingKey: 'updateTag',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<TagDto>({
      exchange: 'platform',
      routingKey: 'removeTag',
      payload: {
        projectId,
        id,
      },
    });
  }
}
