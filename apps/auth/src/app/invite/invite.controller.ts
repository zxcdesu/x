import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { CreateInviteDto, InviteDto } from './invite.dto';
import { InviteService } from './invite.service';

@Controller()
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @RabbitRPC({
    routingKey: 'createInvite',
  })
  @SerializeOptions({
    type: InviteDto,
  })
  create(@RabbitPayload() payload: CreateInviteDto): Promise<InviteDto> {
    return this.inviteService.create(payload);
  }
}
