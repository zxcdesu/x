import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateHsmDto,
  HsmDto,
  HsmService,
  UpdateHsmDto,
} from '@zxcdesu/data-access-hsm';
import { ProjectId } from '@zxcdesu/data-access-project';

@Controller()
export class HsmController {
  constructor(private readonly hsmService: HsmService) {}

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'createHsm',
  //   queue: 'createHsm',
  // })
  @SerializeOptions({
    type: HsmDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateHsmDto,
  ) {
    return this.hsmService.create(projectId, payload);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'findOneHsm',
  //   queue: 'findOneHsm',
  // })
  @SerializeOptions({
    type: HsmDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.hsmService.findOne(projectId, id);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'findAllHsm',
  //   queue: 'findAllHsm',
  // })
  @SerializeOptions({
    type: HsmDto,
  })
  findAll(@ProjectId() projectId: number) {
    return this.hsmService.findAll(projectId);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'updateHsm',
  //   queue: 'updateHsm',
  // })
  @SerializeOptions({
    type: HsmDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateHsmDto,
  ) {
    return this.hsmService.update(projectId, id, payload);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'removeHsm',
  //   queue: 'removeHsm',
  // })
  @SerializeOptions({
    type: HsmDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.hsmService.remove(projectId, id);
  }
}
