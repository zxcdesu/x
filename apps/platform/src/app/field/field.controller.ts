import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateFieldDto,
  FieldDto,
  FieldService,
  UpdateFieldDto,
} from '@zxcdesu/data-access-field';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'createField',
    queue: 'createField',
  })
  @SerializeOptions({
    type: FieldDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateFieldDto,
  ): Promise<FieldDto> {
    return this.fieldService.create(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'findOneField',
    queue: 'findOneField',
  })
  @SerializeOptions({
    type: FieldDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<FieldDto> {
    return this.fieldService.findOne(projectId, id);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'findAllFields',
    queue: 'findAllFields',
  })
  @SerializeOptions({
    type: FieldDto,
  })
  findAll(@ProjectId() projectId: number): Promise<FieldDto[]> {
    return this.fieldService.findAll(projectId);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'updateField',
    queue: 'updateField',
  })
  @SerializeOptions({
    type: FieldDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateFieldDto,
  ): Promise<FieldDto> {
    return this.fieldService.update(projectId, id, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'removeField',
    queue: 'removeField',
  })
  @SerializeOptions({
    type: FieldDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<FieldDto> {
    return this.fieldService.remove(projectId, id);
  }
}
