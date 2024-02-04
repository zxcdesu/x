import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagService } from './tag.service';

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'createTag',
    queue: 'createTag',
  })
  @SerializeOptions({
    type: TagDto,
  })
  create(@RabbitPayload() payload: CreateTagDto) {
    return this.tagService.create(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'findOneTag',
    queue: 'findOneTag',
  })
  @SerializeOptions({
    type: TagDto,
  })
  findOne(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.tagService.findOne(projectId, id);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'findAllTags',
    queue: 'findAllTags',
  })
  @SerializeOptions({
    type: TagDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.tagService.findAll(projectId);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'updateTag',
    queue: 'updateTag',
  })
  @SerializeOptions({
    type: TagDto,
  })
  update(@RabbitPayload() payload: UpdateTagDto) {
    return this.tagService.update(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'removeTag',
    queue: 'removeTag',
  })
  @SerializeOptions({
    type: TagDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.tagService.remove(projectId, id);
  }
}
