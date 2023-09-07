import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { CreateHsmDto } from './dto/create-hsm.dto';
import { HsmDto } from './dto/hsm.dto';
import { UpdateHsmDto } from './dto/update-hsm.dto';
import { HsmService } from './hsm.service';

@Controller()
export class HsmController {
  constructor(private readonly hsmService: HsmService) {}

  @RabbitRPC({
    routingKey: 'createHsm',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: HsmDto,
  })
  create(@RabbitPayload() payload: CreateHsmDto) {
    return this.hsmService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneHsm',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: HsmDto,
  })
  findOne(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.hsmService.findOne(projectId, id);
  }

  @RabbitRPC({
    routingKey: 'findAllHsms',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: HsmDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.hsmService.findAll(projectId);
  }

  @RabbitRPC({
    routingKey: 'updateHsm',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: HsmDto,
  })
  update(@RabbitPayload() payload: UpdateHsmDto) {
    return this.hsmService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeHsm',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: HsmDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.hsmService.remove(projectId, id);
  }
}
