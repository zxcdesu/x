import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagService } from './tag.service';

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'createTag',
    queue: 'createTag',
  })
  @SerializeOptions({
    type: TagDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateTagDto,
  ) {
    return this.tagService.create(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'findOneTag',
    queue: 'findOneTag',
  })
  @SerializeOptions({
    type: TagDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.tagService.findOne(projectId, id);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'findAllTags',
    queue: 'findAllTags',
  })
  @SerializeOptions({
    type: TagDto,
  })
  findAll(@ProjectId() projectId: number) {
    return this.tagService.findAll(projectId);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'updateTag',
    queue: 'updateTag',
  })
  @SerializeOptions({
    type: TagDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateTagDto,
  ) {
    return this.tagService.update(projectId, id, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'removeTag',
    queue: 'removeTag',
  })
  @SerializeOptions({
    type: TagDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.tagService.remove(projectId, id);
  }
}
